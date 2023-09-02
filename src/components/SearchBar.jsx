import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeatherFetch,
  getInputValue,
  getWeatherFailure,
  getWeatherSuccess,
} from "../weatherState";
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const { inputValue } = useSelector((state) => state.weathers);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getWeatherFetch());
    dispatch(getInputValue(""));
  };

  return (
    <div className="input__container">
      <form onSubmit={submitHandler}>
        <label > 
        <input
          className="text__input"
          type="text"
          placeholder="Type here"
          value={inputValue}
          onChange={(e) => {
            dispatch(getInputValue(e.target.value));
            dispatch(getWeatherFailure(""));
            dispatch(getWeatherSuccess({}));
          }}
          onClick={() => {
            dispatch(getWeatherFailure(""));
            dispatch(getWeatherSuccess({}));
          }}
        />
          <button
          disabled={inputValue.length === 0}
     
          type="search"
        >
            < FaSearch />
        </button>
      
          </label>
       
      
      </form>
    </div>
  );
};

export default SearchBar;
