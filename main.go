package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

// indexHandler responds to requests with our greeting.
func indexHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	fmt.Fprint(w, "Hello, World!")

	apiKey, ok := os.LookupEnv("WEATHER_API_KEY")
	if !ok {
		fmt.Println("You forgot to set the api key in the env var")
	}

	resp, err := http.Get("http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=London&aqi=no")
	bodyBytes, err := io.ReadAll(resp.Body)
	fmt.Fprint(w, string(bodyBytes))
	fmt.Fprint(w, err)
}

func main() {
	http.HandleFunc("/", indexHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
