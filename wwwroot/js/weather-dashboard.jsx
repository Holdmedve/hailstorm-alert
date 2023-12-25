console.log('it found this');

class CityComponent extends React.Component
{
    state = { data: this.props.initialData };

    render() {
        return (
            <div className="cityComponent">
                <h1>Hello</h1>
                <CityList data={this.state.data} />
            </div>
        );
    }
}

class CityList extends React.Component
{
    render() {
        var cityNodes = this.props.data.map(function(city) {
            return (
                <City country={city.country} zipcode={city.zipcode} key={city.id}>
                    {city.name}
                </City>
            );
        });
        return <div className="cityList">{cityNodes}</div>;
    }
}

function createRemarkable() {
	var remarkable =
		'undefined' != typeof global && global.Remarkable
			? global.Remarkable
			: window.Remarkable;

	return new remarkable();
}

class City extends React.Component {
	rawMarkup = () => {
		var md = createRemarkable();
		var rawMarkup = md.render(this.props.children.toString());
		return { __html: rawMarkup };
	};

	render() {
		return (
			<div className="city">
				<h2 className="cityCountry">{this.props.country}</h2>
				<h3 className="cityZipcode">{this.props.zipcode}</h3>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
}