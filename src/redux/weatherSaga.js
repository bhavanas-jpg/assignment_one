import { call, put, takeEvery, select } from "redux-saga/effects";
import { getWeatherSuccess, getWeatherFailure } from "./weatherState";

// This generator function is responsible for fetching weather data.
function* workGetWeatherFetch() {
  try {
    const inputText = yield select((state) => state.weathers.inputValue);

     // Use the 'call' effect to make an HTTP request to the WeatherAPI.
    const weatherResponse = yield call(() =>
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=18d6d64ca62a4b8da1260436233108&q=${inputText}`
      )
    );
    
    // Check if the HTTP response is not OK (e.g., 404 or 500).
    if (!weatherResponse.ok) {
      // If not OK, throw an error with a message.
      throw new Error("Sorry, No weather data found.");
    }
     // Parse the response body as JSON.
    const formattedWeather = yield weatherResponse.json();

    yield put(getWeatherSuccess(formattedWeather));
  } catch (error) {
    // If an error occurs during the process, dispatch an error action with a message.
    yield put(getWeatherFailure(error.message));
    // Log the error to the console for debugging purposes.
    console.error("An error occurred while fetching weather:", error);
  }
}

// This generator function sets up a Redux Saga watcher for the action type "weatherForecast/getWeatherFetch".
function* weatherSaga() {
  // Whenever the specified action is dispatched, call the 'workGetWeatherFetch' generator function.
  yield takeEvery("weatherForecast/getWeatherFetch", workGetWeatherFetch);
}

export default weatherSaga;
