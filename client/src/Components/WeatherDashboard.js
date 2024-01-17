import { Fragment } from "react";
import './WeatherDashboard.css';
import CitySearch from "./CitySearch"
import CityWeather from "./CityWeather"



function WeatherDashboard() {
    const handleCityData = (data) => {
        console.log('in parent');
        console.log(data);
    };
    return (
        <Fragment>
            <CitySearch onCityData={handleCityData}/>
            <CityWeather />
        </Fragment>
    );

}

export default WeatherDashboard;