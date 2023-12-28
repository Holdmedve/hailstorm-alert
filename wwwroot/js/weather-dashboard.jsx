const WeatherDashboard = (props) => {
    const [timer, setTimer] = React.useState(null);
    const [url, setUrl] = React.useState(props.url);
    const [data, setData] = React.useState(props.initialData);

    queryCities = query => {
        console.log("queryCities was called");
        console.log(query);
        fetch(url + '?' + new URLSearchParams({
            query: query
        }))
            .then(response => response.json())
            .then(data => {
                console.log(data); 
                setData(data);    
            })
    }

    handleInputChange = event => {
        console.log("handleInputChange was called");
        const input = event.currentTarget.value;

        clearTimeout(timer);
        setTimer(
            setTimeout(() => {
                console.log("asd");
                queryCities(input);
                }, 1000
            )
        );  
    }

    return (
        <div className="cityComponent">
            <CitySearch onInputChange={handleInputChange} />
            <CityList data={data} />
        </div>
    );
}

const CitySearch = (props) => {
    return <input type="search" id="citySearch" onChange={props.onInputChange}/>
}

const CityList = (props) => {
    const cityNodes = props.data.map(function(city) {
        return (
            <City country={city.country} key={city.id}>
                {city.name}
            </City>
        );
    });
    return <div className="cityList">{cityNodes}</div>;
}

function createRemarkable() {
	const remarkable =
		'undefined' != typeof global && global.Remarkable
			? global.Remarkable
			: window.Remarkable;

	return new remarkable();
}

const City = (props) => {
	rawMarkup = () => {
		const md = createRemarkable();
		const rawMarkup = md.render(props.children.toString());
		return { __html: rawMarkup };
	};

    return (
        <div className="city">
            <h2 className="cityCountry">{props.country}</h2>
            <span dangerouslySetInnerHTML={rawMarkup()} />
        </div>
    );
}