import { useState } from "react";


function CityWeather(props) {
    console.log('CityWeather:');
    console.log(props.cityData);
    const cityHeader = `${ props.cityData.name }, ${ props.cityData.country }`;
    return (<div>
        <h5>{cityHeader}</h5>
        <table>
            <tr>
                <th>City</th>
                <th>Country</th>
                <th></th>
            </tr>
        </table>
    </div>)
}

export default CityWeather;