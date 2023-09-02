import React from "react";
import sunnyWeatherImage from "../assets/sunny_weather.gif";

const Header = () => {

  return (
    <header>
      <nav>
        <div className="container">
          <div className="logo__container" >
            <img src={sunnyWeatherImage} className="logo__image" alt="logo-image" />
            <h3 className="logo">WeatherPulse</h3>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

