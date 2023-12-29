using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactDemo.Models;
using System.Text.Json;

namespace ReactDemo.Controllers
{
    public class WeatherDashboardController : Controller
    {
        static WeatherDashboardController()
        {}

        private static async Task<IList<CityModel>> searchCity(string query)
        {
            string apiKey = getWeatherApiKey();
            if (apiKey == null || query == null || query == "")
            {
                return new List<CityModel>();
            }

            Console.WriteLine("AAAA");
            string searchUri = $"http://api.weatherapi.com/v1/search.json?key={apiKey}&q={query}";
            Console.WriteLine("BBBBB");
            HttpClient client = new HttpClient();
            using HttpResponseMessage response = await client.GetAsync(searchUri);
            string content = await response.Content.ReadAsStringAsync();
            // Console.WriteLine(content);

            List<CityModel> cities = JsonSerializer.Deserialize<List<CityModel>>(
                content, 
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }                
            );


            // foreach(CityModel city in cities)
            // {
            //     Console.WriteLine(city.ToString());
            // }

            return cities;
        }

        [Route("weather-dashboard")]
        [HttpGet]
        public  async Task<ActionResult> Index()
        {
            Console.WriteLine("this has been called");
            return View(await searchCity(""));
        }

        [Route("city-search")]
        [HttpGet]
        public async Task<ActionResult> CitySearch(string query)
        {
            Console.WriteLine("city search has been called");
            return Ok(await searchCity(query));
        }

        private static string getWeatherApiKey()
        {
            return Environment.GetEnvironmentVariable("WEATHER_API_KEY");
        }
    }

}