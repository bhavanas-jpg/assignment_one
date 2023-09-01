import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";
import weatherReducer from "./weatherState.js";
import weatherSaga from './weatherSaga.js';


const saga = createSagaMiddleware();
const store =configureStore({
  reducer:{
  weather: weatherReducer,
  },
  middleware: [saga]
});
saga.run(weatherSaga)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
