import { useState } from "react";
import './CityWeather.css'


function CityWeather(props) {
    console.log('CityWeather:');
    console.log(props.cityData);
    console.log(props.cityData.alerts);

    return (<div>
        <h4 className="city-header">{`${ props.cityData.name }, ${ props.cityData.country }`}</h4>

        {props.cityData.alerts.map((alert, idx) => {
            return (
                <div className="weather-alert" key={idx}>
                    <h4>Weather alert {idx}</h4>
                    <p className="weather-alert-item">Event: {alert.event}</p>
                    <p className="weather-alert-item">Effective: {alert.effective}</p>
                    <p className="weather-alert-item">Expires: {alert.expires}</p>
                    <p className="weather-alert-item">Instruction: {alert.instruction}</p>
                    <p className="weather-alert-item">Areas: {alert.areas}</p>
                    <p className="weather-alert-item">Certainty: {alert.certainty}</p>
                    <p className="weather-alert-item">Description: {alert.description}</p>
                    <p className="weather-alert-item">Severity: {alert.severity}</p>
                </div>
            )
        })}
    </div>)
}

export default CityWeather;