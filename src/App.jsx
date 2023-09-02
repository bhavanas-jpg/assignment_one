import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
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
