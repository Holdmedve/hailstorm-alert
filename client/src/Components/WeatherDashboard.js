import { useState } from "react";
import './WeatherDashboard.css';
import CitySearch from "./CitySearch"


function WeatherDashboard() {
    const handleCityData = (data) => {
        console.log('in parent');
        console.log(data);
    };
    return <CitySearch onCityData={handleCityData}/>
}

export default WeatherDashboard;