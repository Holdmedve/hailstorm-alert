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

        private static async Task<IList<CityModel>> searchCity()
        {
            string apiKey = getWeatherApiKey();
            if (apiKey == null)
            {
                return new List<CityModel>();
            }

            string searchUri = $"http://api.weatherapi.com/v1/search.json?key={apiKey}&q=Lon";
            HttpClient client = new HttpClient();
            using HttpResponseMessage response = await client.GetAsync(searchUri);
            string content = await response.Content.ReadAsStringAsync();
            Console.WriteLine(content);

            List<CityModel> cities = JsonSerializer.Deserialize<List<CityModel>>(
                content, 
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }                
            );

            foreach(CityModel city in cities)
            {
                Console.WriteLine(city.ToString());
            }

            return cities;
        }

        [Route("weather-dashboard")]
        [HttpGet]
        public  async Task<ActionResult> Index()
        {
            Console.WriteLine("this has been called");
            return View(await searchCity());
        }

        // [Route("cities")]
        // public ActionResult Cities()
        // {

        //     return Json(_cities);
        // }

        private static string getWeatherApiKey()
        {
            return Environment.GetEnvironmentVariable("WEATHER_API_KEY");
        }
    }

}