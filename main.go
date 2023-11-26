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

func asd(c *gin.Context) {
	fmt.Println("asd has been called")
}

func index(c *gin.Context) {
	apiKey, ok := os.LookupEnv("WEATHER_API_KEY")
	if !ok {
		fmt.Println("You forgot to set the api key in the env var")
		return
	}

	resp, err := http.Get("http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=London&aqi=no")
	if err != nil {
		log.Fatal(err)
		return
	}
	defer resp.Body.Close()

	v, err := jason.NewObjectFromReader(resp.Body)
	fmt.Println(v.GetValue("current"))

	temp, uff := v.GetFloat64("current", "temp_c")
	if uff != nil {
		log.Fatal(uff)
	}

	displayTemp := strconv.FormatFloat(temp, 'g', -1, 64)

	c.HTML(http.StatusOK, "index.tmpl", gin.H{"title": "Hello bello", "temp": displayTemp})
}

func main() {
	router := gin.New()
	router.LoadHTMLGlob("templates/*")

	router.GET("/stuff", asd)
	router.GET("/", index)
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
