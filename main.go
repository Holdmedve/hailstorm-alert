package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/antonholmquist/jason"
	"github.com/gin-gonic/gin"
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
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	v, err := jason.NewObjectFromReader(resp.Body)
	fmt.Println(v.GetValue("current"))

	temp, uff := v.GetFloat64("current", "temp_c")
	if uff != nil {
		log.Fatal(uff)
	}

	fmt.Printf("type: %T, value:%f", temp, temp)
	displayTemp := strconv.FormatFloat(temp, 'g', -1, 64)
	fmt.Fprint(w, "\nThe temperature in London is: ", displayTemp, "C°")

}

func asd(c *gin.Context) {
	fmt.Println("asd has been called")
}

func dsa(c *gin.Context) {
	fmt.Println("dsa has been called")
}

func main() {
	router := gin.New()
	router.GET("/stuff", asd)
	router.GET("/", dsa)
	http.Handle("/", router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
