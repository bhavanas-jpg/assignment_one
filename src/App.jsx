import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { useEffect } from "react";
import { getWeatherFetch, getInputValue } from "./redux/weatherState";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      dispatch(getInputValue(`${latitude}, ${longitude}`));
      dispatch(getWeatherFetch());
      dispatch(getInputValue(""));
    });
  }, []);

  return (
    <>
      <div className="container__content"></div>
      <main className="container">
        <Header />
        <SearchBar />
        <WeatherCard />
      </main>
    </>
  );
}

export default App;
