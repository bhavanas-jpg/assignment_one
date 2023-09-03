import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";
import weatherReducer from "./weatherState.js";
import weatherSaga from './weatherSaga.js';

// Create a Saga middleware instance.
const saga = createSagaMiddleware();
// Configure the Redux store using Redux Toolkit's configureStore function.
const store =configureStore({
  reducer:{
  weathers: weatherReducer, // Add the 'weatherReducer' to the store's reducers.
  },
  middleware: [saga] // Apply the Saga middleware to the store.
});
// Run the weatherSaga generator function using the Saga middleware.
saga.run(weatherSaga)


ReactDOM.createRoot(document.getElementById('root')).render(
  // The Provider from react-redux provides access to the Redux store 
  <Provider store={store}>
    <App />
  </Provider>,
)
