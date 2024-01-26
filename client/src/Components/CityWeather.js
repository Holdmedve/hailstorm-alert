import { useState } from "react";
import './CityWeather.css'


function CityWeather(props) {
    console.log('CityWeather:');
    console.log(props.cityData);
    console.log(props.cityData.alerts);

    return (<div>
        <h5 className="city-header">{`${ props.cityData.name }, ${ props.cityData.country }`}</h5>
        <table>
            <thead>
                <tr>
                    <th>Areas</th>
                    <th>Certainty</th>
                    <th>Description</th>
                    <th>Effective</th>
                    <th>Event</th>
                    <th>Expires</th>
                    <th>Instruction</th>
                    <th>Severity</th>
                </tr>
            </thead>
            <tbody>
                {props.cityData.alerts.map((alert, idx) => {
                    return ( 
                        <tr key={ idx }>
                            <td>{alert.areas}</td>
                            <td>{alert.certainty}</td>
                            <td>{alert.desc}</td>
                            <td>{alert.effective}</td>
                            <td>{alert.event}</td>
                            <td>{alert.expires}</td>
                            <td>{alert.instruction}</td>
                            <td>{alert.severity}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>)
}

export default CityWeather;