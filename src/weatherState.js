import {createSlice} from "@reduxjs/toolkit";

export const weatherForecastSlice = createSlice({
    name:"weatherForecast",
    initialState:{
        weather:{},
        isLoading: false,
        inputValue:""
    },
    reducers:{
        getWeatherFetch:(state)=>{
            state.isLoading = true;
        },
        getWeatherSuccess: (state, action)=>{
            state.weather = action.payload;
            state.isLoading = false;
        },
        getWeatherFailure:(state)=>{
            state.isLoading = false
        },
        getInputValue:(state, action)=>{
            state.inputValue = action.payload;
        }
    }
})

export const {getWeatherFetch, getWeatherSuccess, getWeatherFailure, getInputValue} = weatherForecastSlice.actions;
export default weatherForecastSlice.reducer