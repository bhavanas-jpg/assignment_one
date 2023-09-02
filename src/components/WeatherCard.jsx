import React from "react";
import { useSelector } from "react-redux";
import { MdOutlineLocationOn } from "react-icons/md";

const WeatherCard = () => {
  const { weather, isLoading, errorMessage } = useSelector(
    (state) => state.weathers
  );

  const { location, current } = weather;
  const { country, name } = location ?? { name: "" };
  const { temp_c, humidity, condition } = current ?? {};
  const { text, icon } = condition ?? {};

  return (
    <>
      {isLoading ? (
        <div className="loading__content">
          <h2>Loading....</h2>
          <img
            src="https://cdn.dribbble.com/users/372537/screenshots/2065624/icons_km_weather.gif"
            width="200"
            height="200"
          />
        </div>
      ) : errorMessage.length === 0 ? (
        name?.length !== 0 && (
          <div className="card">
            <div className="card__text--location">
              <MdOutlineLocationOn className="location__icon" />
              <h2>
                {" "}
                {name} , {country}
              </h2>
            </div>
            <div className="card__body">
              <div>
                <img className="weather__image" src={icon} alt={name} />
                <p className="weather__text">{text}</p>
              </div>
              <div>
                <p className="weather__temp">
                  {temp_c} <span></span>°C
                </p>
                <p className="weather__humidity"> {humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        )
      ) : (
        <p className="error_msg">{errorMessage}</p>
      )}
    </>
  );
};

export default WeatherCard;
