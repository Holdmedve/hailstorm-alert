using System.Text.Json;


namespace WeatherAlert;

public class Handlers {
    public static async Task<IResult> CitySearch(string query) {
        string apiKey = getWeatherApiKey();
        string searchUri = $"{WEATHER_API_ROOT}/search.json?key={apiKey}&q={query}";
        HttpClient client = new HttpClient();
        using HttpResponseMessage response = await client.GetAsync(searchUri);
        string content = await response.Content.ReadAsStringAsync();

        List<CityModel> cities = JsonSerializer.Deserialize<List<CityModel>>(
            content, 
            new JsonSerializerOptions {
                PropertyNameCaseInsensitive = true
            }                
        );

        return Results.Ok(cities);
    }

    public static async Task<IResult> CityWeather(string cityId) {
        string apiKey = getWeatherApiKey();
        string searchUri =$"{WEATHER_API_ROOT}/forecast.json?key={apiKey}&q=id:{cityId}" +
            "&aqi=no&alerts=yes";

        HttpClient client = new HttpClient();
        using HttpResponseMessage response = await client.GetAsync(searchUri);
        string content = await response.Content.ReadAsStringAsync();

        CityWeather cityWeather;
        cityWeather = JsonSerializer.Deserialize<CityWeather>(
            content, 
            new JsonSerializerOptions{
                PropertyNameCaseInsensitive = true
            }                
        );

        return Results.Ok(cityWeather);
    }

    private static string getWeatherApiKey() {
        string apiKey = Environment.GetEnvironmentVariable("WEATHER_API_KEY");
        if (apiKey == null) {
            Console.WriteLine("WEATHER_API_KEY not set");
        }
        return apiKey;
    }

    private const string WEATHER_API_ROOT = "http://api.weatherapi.com/v1";
}