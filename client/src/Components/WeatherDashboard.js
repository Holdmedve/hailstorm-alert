import { Fragment, useState } from "react";
import './WeatherDashboard.css';
import CitySearch from "./CitySearch"
import CityWeather from "./CityWeather"



function WeatherDashboard() {
    const [cityData, setCityData] = useState({name: "", country: "", alerts: [], currentWeather: {}});
    return (
        <Fragment>
            <CitySearch onCityData={setCityData}/>
            <CityWeather cityData={cityData}/>
        </Fragment>
    );

}

export default WeatherDashboard;