using Microsoft.AspNetCore.Http.HttpResults;
using WeatherAlert;

namespace service_tests;

public class Tests
{
    private const string SOPRON_ID = "969557";

    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public async Task TestCitySearch_GivenSopron_FoundInHungary()
    {
        var result = await Handlers.CitySearch("sopron");

        Assert.That(result, Is.TypeOf<Ok<List<CityModel>>>());
        var cities = ((Ok<List<CityModel>>)result).Value;

        Assert.NotNull(cities);
        Assert.That(cities.Count, Is.GreaterThan(0));
        Assert.That(cities[0].Country, Is.EqualTo("Hungary"));
    }

    [Test]
    public async Task TestCityWeather_GivenCity_ReturnsExpectedModel()
    {
        var result = await Handlers.CityWeather(SOPRON_ID);

        Assert.That(result, Is.TypeOf<Ok<CityWeather>>());
    }
}