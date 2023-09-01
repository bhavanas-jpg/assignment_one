import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getWeatherFetch,
  getInputValue,
  getWeatherFailure,
  getWeatherSuccess,
} from "./weatherState";
import { MdOutlineLocationOn } from "react-icons/md";

function App() {
  const { weather, inputValue, isLoading, errorMessage } = useSelector(
    (state) => state.weathers
  );

  const dispatch = useDispatch();
  const { location, current } = weather;
  const { country, name } = location ?? { name: "" };
  const { temp_c, humidity, condition } = current ?? {};
  const { text, icon } = condition ?? {};

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getWeatherFetch());
    dispatch(getInputValue(""));
  };

  console.log(weather);

  return (
    <main className="container">
      <h1>Weather Pulse</h1>
      <div className="input__container">
      <form onSubmit={submitHandler}>
        <input
          className="text__input"
          type="text"
          placeholder="Enter name of country, state or city"
          value={inputValue}
          onChange={(e) => dispatch(getInputValue(e.target.value))}
          onClick={() => {
            dispatch(getWeatherFailure(""));
            dispatch(getWeatherSuccess({}));
          }}
        />
        <button
          disabled={inputValue.length === 0}
          className="btn btn-primary"
          type="submit"
        >
         Search
        </button>
      </form>
      </div>
      {isLoading ? (
        <img
          src="https://cdn.dribbble.com/users/372537/screenshots/2065624/icons_km_weather.gif"
          width="200"
          height="200"
        />
      ) : errorMessage.length === 0 ? (
        name?.length !== 0 && (
          <div className="card">
            <div className="card__text--location">
              <MdOutlineLocationOn />
              <h3>
                {" "}
                {name} , {country}
              </h3>
            </div>
            <img className="weather__image" src={icon} alt={name} />
            <p>{text}</p>
            <p>Temperature:{temp_c}°C</p>
            <span>Humidity: {humidity}%</span>
          </div>
        )
      ) : (
        <p>{errorMessage}</p>
      )}
    </main>
  );
}

export default App;
