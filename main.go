package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/antonholmquist/jason"
	"github.com/gin-gonic/gin"
)

const WeatherApiRoot = "http://api.weatherapi.com/v1/"

type CitySearch struct {
	Query string `form:"query"`
}

func SearchCity(c *gin.Context) {
	var citySearch CitySearch
	err := c.ShouldBind(&citySearch)
	if err != nil {
		c.String(400, "could not bind to struct")
		return
	}

	apiKey, ok := os.LookupEnv("WEATHER_API_KEY")
	if !ok {
		fmt.Println("You forgot to set the api key in the env var")
		return
	}

	citySearchApi := WeatherApiRoot + "search.json?key=" + apiKey + "&q=" + citySearch.Query
	fmt.Println(citySearchApi)
	resp, err := http.Get(citySearchApi)
	if err != nil {
		c.String(400, "err from weather api")
		return
	}

	defer resp.Body.Close()
	respCities, _ := io.ReadAll(resp.Body)
	var cities []map[string]string
	json.Unmarshal(respCities, &cities)
	fmt.Println("len of body: " + fmt.Sprint(len(cities)))

	if len(cities) == 0 {
		c.String(200, "")
		return
	}

	jsonData := []byte(`{ "cities": [`)
	for idx, city := range cities {
		var sb strings.Builder
		sb.WriteString(`"`)
		sb.WriteString(city["name"])
		sb.WriteString(`"`)
		if idx == len(cities)-1 {
			sb.WriteString(`]}`)
		} else {
			sb.WriteString(`,`)
		}
		jsonData = append(jsonData, []byte(sb.String())...)
	}
	fmt.Println(jsonData)

	c.Data(http.StatusOK, gin.MIMEJSON, jsonData)
}

func index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.tmpl", gin.H{"title": "Hello bello"})
}

type City struct {
	City string `form:"city"`
}

func temperature(c *gin.Context) {
	var city City
	err := c.ShouldBind(&city)
	if err != nil {
		c.String(400, "City does not exist")
		return
	}

	apiKey, ok := os.LookupEnv("WEATHER_API_KEY")
	if !ok {
		fmt.Println("You forgot to set the api key in the env var")
		return
	}

	resp, err := http.Get(WeatherApiRoot + "current.json?key=" + apiKey + "&q=" + city.City + "&aqi=no")
	if err != nil {
		log.Fatal(err)
		return
	}
	defer resp.Body.Close()

	v, err := jason.NewObjectFromReader(resp.Body)

	temp, uff := v.GetFloat64("current", "temp_c")
	if uff != nil {
		log.Fatal(uff)
	}

	displayTemp := strconv.FormatFloat(temp, 'g', -1, 64)

	c.String(200, displayTemp)
}

func main() {
	router := gin.New()
	router.LoadHTMLGlob("templates/*")
	router.Static("/js", "./js")

	router.GET("/stuff", temperature)
	router.GET("/", index)
	router.GET("/city/search", SearchCity)
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
