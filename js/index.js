function searchCity(city) {
    console.log(`search has been changed to ${city}`)
    const apiUrl = `${location.href}/city/search?query=${city}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("response not ok");
            }
            return response.text();
        })
        .then(data => {
            if (data === "") {
                console.log("it is empty");
            } else {
                const cities = JSON.parse(data).cities;
                let citySuggestions = document.getElementById("city-suggestions");
                for (const city of cities) {
                    let newOpt = document.createElement('option');
                    newOpt.value = city;
                    citySuggestions.appendChild(newOpt);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayTemperatureForCity(city) {
    const apiUrl = `${location.href}/stuff?city=${city}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("response not ok");
            }
            return response.text();
        })
        .then(temperature => {
            const updatedText = `The temperature in ${city} is ${temperature} C°.`;
            document.getElementById("p1").innerHTML = updatedText;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}