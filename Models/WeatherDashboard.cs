namespace ReactDemo.Models
{

    public class CityModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }

        public override string ToString()
        {
            return $"Id: {Id}\nName: {Name}\nCountry: {Country}";
        }
    }
}