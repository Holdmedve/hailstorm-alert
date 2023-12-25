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
                    Id= "n13kl5n1kl5",
                    Name = "Salzburg",
                    Country = "Austria",
                    Zipcode = "5020"
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