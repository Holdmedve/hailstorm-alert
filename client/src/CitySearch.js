import { useState } from "react";
import './CitySearch.css';


function CitySearch() {
    const [timer, setTimer] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
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

    const cityWeather = (cityId) => {
        console.log(`cityWeather called with cityId: ${ cityId }`);
        const numDays = 3;
        fetch(url + '/city-weather/' + cityId + '/' + numDays)
            .then(response => response.json())
            .then(data => {
                console.log('city weather result');
                console.log(data);
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

    const onSuggestionClicked = (cityId) => {
        console.log(`onSuggestionClicked cityId: ${ cityId }`);
        setSuggestions([]);
        cityWeather(cityId);
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
                    const cityId = suggestion.id;
                    return (
                        <div 
                            key={cityId} 
                            className="suggestion" 
                            onClick={() => onSuggestionClicked(cityId)}
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