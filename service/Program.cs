using System.Text.Json;

namespace WeatherAlert;

class Program {
    public static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddCors( options => {
            options.AddDefaultPolicy(builder => {
                builder.SetIsOriginAllowed(origin => {
                    string host = new Uri(origin).Host;
                    if (host == "localhost" ||
                        host == "weather-alert-404915.oa.r.appspot.com"
                    )
                        return true;                    
                    return false;
                });
            });
        });

        var app = builder.Build();
        app.UseCors();

        app.MapGet("/", () => "Hello World!");
        app.MapGet("/city-search/{query}", Handlers.CitySearch);
        app.MapGet("/city-weather/{cityId}", Handlers.CityWeather);

        var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
        var url = $"http://0.0.0.0:{port}";
        app.Run(url);
    }
} 

