package main

import (
	"net/http"
	"fmt"
	"os"
)

func main() {
	apiKey, ok := os.LookupEnv("WEATHER_API_KEY")
	if !ok {
		fmt.Println("You forgot to set the api key in the env var")
	}
	resp, err := http.Get("http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=London&aqi=no")
	fmt.Println(resp)
	fmt.Println(err)
}