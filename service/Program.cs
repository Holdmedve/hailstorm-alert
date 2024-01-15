using System.Text.Json;

namespace WeatherAlert;

class Program {
    public static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddCors( options => {
            options.AddDefaultPolicy(builder => {
                builder.SetIsOriginAllowed(origin => {
                    return new Uri(origin).Host == "localhost";
                });
            });
        });

        var app = builder.Build();
        app.UseCors();

        app.MapGet("/", () => "Hello World!");
        app.MapGet("/city-search/{query}", Handlers.CitySearch);
        app.MapGet("/city-weather/{cityId}/{numDays}", Handlers.CityWeather);

        app.Run();
    }
} 

