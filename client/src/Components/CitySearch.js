import { useState } from "react";
import './CitySearch.css';
import { baseUrl } from '../weatherApi'


function CitySearch(props) {
    const [timer, setTimer] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const searchCity = query => {
        if (query === "") {
            console.log('searchCity empty query');
            setSuggestions([]);
            return;
        }

        console.log(`queryCities called: ${ query }`);
        fetch(baseUrl() + '/city-search/' + query)
            .then(response => response.json())
            .then(data => {
                console.log('search result');
                console.log(data);
                setSuggestions(data);
            });
    }

    const fetchCityWeather = (cityId, name, country) => {
        console.log(`fetchCityWeather called with cityId: ${ cityId }`);
        const numDays = 3;
        fetch(baseUrl() + '/city-weather/' + cityId + '/' + numDays)
            .then(response => response.json())
            .then(data => {
                console.log('city weather result');
                console.log(data);
                props.onCityData({'name': name, 'country': country});
            });
    }

    const handleInput = (e) => {
        const value = e.target.value;
        console.log(`handleInput called: ${ value }`);
        clearTimeout(timer);
        setTimer(
            setTimeout(() => {
                searchCity(value);
                }, 250
            )
        ); 
    }

    const handleSuggestionClicked = (cityId, name, country) => {
        console.log(`handleSuggestionClicked cityId: ${ cityId }`);
        setSuggestions([]);
        fetchCityWeather(cityId, name, country);
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
                            onClick={() => handleSuggestionClicked(
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