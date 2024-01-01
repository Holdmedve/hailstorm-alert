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

        private static async Task<BagModel> searchCity(string query)
        {
            string apiKey = getWeatherApiKey();
            if (apiKey == null || query == null || query == "")
            {
                return new BagModel{Cities = new List<CityModel>()};
            }

            string searchUri = $"http://api.weatherapi.com/v1/search.json?key={apiKey}&q={query}";
            HttpClient client = new HttpClient();
            using HttpResponseMessage response = await client.GetAsync(searchUri);
            string content = await response.Content.ReadAsStringAsync();

            List<CityModel> cities = JsonSerializer.Deserialize<List<CityModel>>(
                content, 
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }                
            );

            BagModel bag = new BagModel{Cities = cities};
            return bag;
        }

        [Route("weather-dashboard")]
        [HttpGet]
        public  async Task<ActionResult> Index()
        {
            return View(await searchCity(""));
        }

        [Route("city-search")]
        [HttpGet]
        public async Task<ActionResult> CitySearch(string query)
        {
            return Json(await searchCity(query));
        }

        private static string getWeatherApiKey()
        {
            return Environment.GetEnvironmentVariable("WEATHER_API_KEY");
        }
    }

}