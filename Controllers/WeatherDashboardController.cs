using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ReactDemo.Models;

namespace ReactDemo.Controllers
{
    public class WeatherDashboardController : Controller
    {
        private static readonly IList<CityModel> _cities;

        static WeatherDashboardController()
        {
            _cities = new List<CityModel>{
                new CityModel{
                    Name = "Salzburg",
                    Country = "Austria",
                    Zipcode = "5020"
                },
                new CityModel{
                    Name = "Vienna",
                    Country = "Austria",
                    Zipcode = "1000"
                }
            };
        }

        [Route("weather-dashboard")]
        [HttpGet]
        public ActionResult Index()
        {
            Console.WriteLine("this has been called");
            return View(_cities);
        }

        [Route("cities")]
        public ActionResult Cities()
        {

            return Json(_cities);
        }
    }

}