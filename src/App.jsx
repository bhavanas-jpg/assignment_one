import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherFetch, getInputValue } from "./weatherState";
import { MdOutlineLocationOn } from "react-icons/md";

function App() {
  const weather = useSelector((state) => state.weather.weather);
  const inputValue = useSelector((state) => state.weather.inputValue);
  const loading = useSelector((state) => state.weather.isLoading);
  const errorMessage = useSelector((state) => state.weather.errorMessage);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState(inputValue);

  const { location, current } = weather;
  const { country, name } = location ?? {};
  const { temp_c, humidity, condition } = current ?? {};
  const { text, icon } = condition ?? {};

  console.log(text, "country name");

  // useEffect(() => {

  // }, [dispatch, inputText]);

  console.log(weather);
  console.log(errorMessage);

  const submitHandler = (e, value) => {
    e.preventDefault();
    dispatch(getInputValue(value));
    dispatch(getWeatherFetch());
    setInputText("");
  };

  return (
    <main className="container">
      <h1>Weather Pulse</h1>
      <form onSubmit={(e) => submitHandler(e, inputText)}>
        <input
          className="text__input"
          type="text"
          placeholder="Enter name of country, state or city"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      {loading ? (
        <img
          src="https://cdn.dribbble.com/users/372537/screenshots/2065624/icons_km_weather.gif"
          width="200"
          height="200"
        />
      ) : !errorMessage ? (
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
      ) : (
        <p>{errorMessage}</p>
      )}
    </main>
  );
}

export default App;
