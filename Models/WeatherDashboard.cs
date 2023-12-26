using Newtonsoft.Json;

namespace ReactDemo.Models
{

    public class CityModel
    {
        [JsonRequired]
        public int Id { get; set; }
        [JsonRequired]
        public string Name { get; set; }
        [JsonRequired]
        public string Country { get; set; }

        public override string ToString()
        {
            return $"Id: {Id}\nName: {Name}\nCountry: {Country}";
        }
    }
}