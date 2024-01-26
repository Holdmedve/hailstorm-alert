import { Fragment, useState } from "react";
import './WeatherDashboard.css';
import CitySearch from "./CitySearch"
import CityWeather from "./CityWeather"



function WeatherDashboard() {
    const [cityData, setCityData] = useState({name: "Shire", country: "Middle-Earth", alerts: []});
    return (
        <Fragment>
            <CitySearch onCityData={setCityData}/>
            <CityWeather cityData={cityData}/>
        </Fragment>
    );

}

export default WeatherDashboard;