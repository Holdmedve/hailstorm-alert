package helloworld

import (
  "fmt"
  "net/http"
  "os"
  "github.com/GoogleCloudPlatform/functions-framework-go/functions"
)

func init() {
   functions.HTTP("HelloHTTP", helloHTTP)
}

// helloHTTP is an HTTP Cloud Function with a request parameter.
func helloHTTP(w http.ResponseWriter, r *http.Request) {
	apiKey, ok := os.LookupEnv("WEATHER_API_KEY")
	if !ok {
		fmt.Println("You forgot to set the api key in the env var")
	}
	resp, err := http.Get("http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=London&aqi=no")
	fmt.Println(resp)
	fmt.Println(err)
}