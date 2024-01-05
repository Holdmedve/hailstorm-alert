const WeatherDashboard = (props) => {
    const [timer, setTimer] = React.useState(null);
    const [url, setUrl] = React.useState(props.url);
    const [data, setData] = React.useState(props.initialData);

    const citySearchId = "citySearch";

    queryCities = query => {
        if (query === ""){
            return;
        }

        fetch(url + '?' + new URLSearchParams({
            query: query
        }))
            .then(response => response.json())
            .then(respJson => {
                console.log('search result');
                console.log(respJson.cities);
                setData(respJson.cities);    
            });
    }

    handleInputChange = event => {
        const input = event.currentTarget.value;
        console.log(`search input changed to: ${ input }`);
        clearTimeout(timer);
        setTimer(
            setTimeout(() => {
                queryCities(input);
                }, 500
            )
        );  
    }

    handleOptionSelect = event => {
        const cityId = event.target.getAttribute("data-city-id");
        const cityDisplayText = event.target.text;
        let searchElement = document.getElementById(citySearchId);
        searchElement.value = cityDisplayText;
        setData([]);
        
        // send GET request to backend for city to get alert data
    }


    return (
        <div className="cityComponent">
            <CitySearch 
                onInputChange={handleInputChange} 
                id={citySearchId}
            />
            <CitySuggestionList 
                id="city-list" 
                data={data} 
                onOptionSelect={handleOptionSelect}
            />
        </div>
    );
}

const CitySearch = (props) => {
    return <input 
        type="text" 
        id={props.id}
        onChange={props.onInputChange}
    />
}

const CitySuggestionList = (props) => {
    const cityNodes = props.data.map(function(city) {
        const val = `${city.name}, ${city.country}`;
        return (
            <CitySuggestion key={city.id} cityId={city.id} value={val} onClick={props.onOptionSelect}>
            </CitySuggestion>
        )
        
    });
    return <ul id="myUl">{ cityNodes }</ul>
}

const CitySuggestion = (props) => {

    return (
        <li onClick={props.onClick}>
            <a data-city-id={props.cityId} href={`#${props.value}`} >
                {props.value}
            </a>
        </li>
    );
}
