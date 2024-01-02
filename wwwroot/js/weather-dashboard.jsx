const WeatherDashboard = (props) => {
    const [timer, setTimer] = React.useState(null);
    const [url, setUrl] = React.useState(props.url);
    const [data, setData] = React.useState(props.initialData);

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
        console.log("asd");
        console.log('event:');
        const myEvent = event;
        console.log(myEvent);
        console.log(myEvent.value);
        console.log(myEvent.target);
        console.log(myEvent.target.text);
    }


    return (
        <div className="cityComponent">
            <CitySearch 
                onInputChange={handleInputChange} 
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
        id="citySearch"
        // list="city-list" 
        onChange={props.onInputChange}
    />
}

const CitySuggestionList = (props) => {
    const cityNodes = props.data.map(function(city) {
        console.log(`id is: ${city.id}`);
        const val = `${city.name}, ${city.country}`;
        return (
            <CitySuggestion key={city.id} value={val} onClick={props.onOptionSelect}></CitySuggestion>
        )
        
    });
    // return <datalist key={props.id}>{cityNodes}</datalist>;
    return <ul id="myUl">{ cityNodes }</ul>
}

const CitySuggestion = (props) => {
    return (
        <li onClick={props.onClick}><a href={`#${props.value}`} >{props.value}</a></li>
    );
}
