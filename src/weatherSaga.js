import { call, put, takeEvery, select } from "redux-saga/effects";
import { getWeatherSuccess, getWeatherFailure } from "./weatherState";

function* workGetWeatherFetch() {
  try {
    const inputText = yield select((state) => state.weathers.inputValue);
    const weatherResponse = yield call(() =>
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=18d6d64ca62a4b8da1260436233108&q=${inputText}`
      )
    );

    if (!weatherResponse.ok) {
      throw new Error("Weather API request failed");
    }
    const formattedWeather = yield weatherResponse.json();

    yield put(getWeatherSuccess(formattedWeather));
  } catch (error) {

    yield put(getWeatherFailure(error.message))
    console.error("An error occurred while fetching weather:", error);
  }
}

function* weatherSaga() {
  yield takeEvery("weatherForecast/getWeatherFetch", workGetWeatherFetch);
}

export default weatherSaga;


