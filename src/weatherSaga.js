import {call, put, takeEvery, select} from "redux-saga/effects";
import { getWeatherSuccess } from "./weatherState";


function* workGetWeatherFetch(){
    const inputText= yield select(state => state.weather.inputValue);
    // console.log(inputText , "saga from");
    const weather = yield call(()=> fetch(`http://api.weatherapi.com/v1/forecast.json?key=18d6d64ca62a4b8da1260436233108&q=${inputText}`));
    const formattedWeather = yield weather.json();
    yield put(getWeatherSuccess(formattedWeather))
}


function* weatherSaga(){
    yield takeEvery('weatherForecast/getWeatherFetch', workGetWeatherFetch)
}

export default weatherSaga;