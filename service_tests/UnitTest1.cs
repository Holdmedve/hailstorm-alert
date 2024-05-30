using Microsoft.AspNetCore.Http.HttpResults;
using WeatherAlert;

namespace service_tests;

public class Tests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public async Task Test1()
    {
        var result = await Handlers.CitySearch("sopron");

        Assert.That(result, Is.TypeOf<Ok<List<CityModel>>>());
        var cities = ((Ok<List<CityModel>>)result).Value;

        Assert.NotNull(cities);
        Assert.That(cities.Count, Is.GreaterThan(0));
        Assert.That(cities[0].Country, Is.EqualTo("Hungary"));
    }
}