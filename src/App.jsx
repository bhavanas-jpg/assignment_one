import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherFetch, getInputValue } from "./weatherState";

function App() {
  const weather = useSelector((state) => state.weather.weather);
  const inputValue = useSelector((state) => state.weather.inputValue);
  const loading = useSelector((state) => state.weather.isLoading)
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState(inputValue);

  const {location, current} = weather;
  const {country, name} =location ?? {};
  const {temp_c, humidity, condition} = current ?? {};
  const {text, icon} = condition ?? {};

  console.log(text , "country name");

  useEffect(() => {
    dispatch(getWeatherFetch());
  }, [dispatch, inputText]);

  console.log(weather);

  const submitHandler = (e, value) => {
    e.preventDefault();
    dispatch(getInputValue(value));
    setInputText("");
  };

  return (
    <>
      <h1>Weather Forecast</h1>
      <form onSubmit={(e) => submitHandler(e, inputText)}>
        <input
          type="text"
          placeholder="Enter name of country, state or city"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {loading ? <p>Loading</p> : 
      <div>
        <h3>{name}</h3>
        <p>{text}</p>
        <img src={icon} alt={name} />
        <p>Temperature:{temp_c}</p>
        <span>Humidity: {humidity}</span>
        </div>}
    </>
  );
}

export default App;
