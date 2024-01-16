import { useState } from "react";
import './CitySearch.css';


function CitySearch(props) {
    const [timer, setTimer] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [cityData, setCityData] = useState({});
    const [suggestions, setSuggestions] = useState([]);

    const url = "http://localhost:5146";

    const queryCities = query => {
        if (query === "") {
            setSuggestions([]);
            return;
        }

        console.log(`queryCities called: ${ query }`);
        fetch(url + '/city-search/' + query)
            .then(response => response.json())
            .then(data => {
                console.log('search result');
                console.log(data);
                setSuggestions(data);
            });
    }

    const cityWeather = (cityId, name, country) => {
        console.log(`cityWeather called with cityId: ${ cityId }`);
        const numDays = 3;
        fetch(url + '/city-weather/' + cityId + '/' + numDays)
            .then(response => response.json())
            .then(data => {
                console.log('city weather result');
                console.log(data);
                setCityData({'cityId': cityId, 'name': name, 'country': country});
                console.log(cityData);
                props.onCityData(cityData);
                // setSuggestions(data)
            });
    }

    const handleInput = (e) => {
        const value = e.target.value;
        console.log(`onChange called: ${ value }`);
        clearTimeout(timer);
        setTimer(
            setTimeout(() => {
                queryCities(value);
                }, 250
            )
        ); 
    }

    const onSuggestionClicked = (cityId, name, country) => {
        console.log(`onSuggestionClicked cityId: ${ cityId }`);
        setSuggestions([]);
        cityWeather(cityId, name, country);
    }

    const handleBlur = () => {
        console.log('handle blur');
        setTimeout(() => {
            setSuggestions([]);
        }, 100);
    }

    return (
        <div tabIndex={0} className="WeatherDashboard">
            <input
                type="text" 
                className="searchbar"
                id="city-searchbar"
                placeholder="City..."
                onChange={handleInput}
                onFocus={handleInput}
                onBlur={handleBlur}
            />
            <div>
                {suggestions.map((suggestion) => {
                    return (
                        <div 
                            key={suggestion.id} 
                            className="suggestion" 
                            onClick={() => onSuggestionClicked(
                                suggestion.id, suggestion.name, suggestion.country
                            )}
                        >
                            {suggestion.name}, {suggestion.country}
                        </div>
                    )
                })}
            </div>
        </div>        
    );
}

export default CitySearch;