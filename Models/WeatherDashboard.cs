using System.Collections;
using System.Collections.Generic;
using Microsoft.CodeAnalysis;
using Newtonsoft.Json;

namespace ReactDemo.Models
{
    public class BagModel
    {
        public List<CityModel> Cities { get; set; }
        public CityWeather CityWeather { get; set; }
    }

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

    public class CityWeather
    {
        public Dictionary<string, IList<AlertItems>> Alerts { get; set; }

        public override string ToString()
        {
            string text = "";
            foreach (KeyValuePair<string, IList<AlertItems>> pair in Alerts)
            {
                text += "\n" + pair.Key;
                foreach (AlertItems alertItems in pair.Value) {
                    text += "\n" + alertItems.ToString();
                }
            }
            return text;
        }
    }

    public class AlertItems
    {
        public string Severity { get; set; }
        public string Areas { get; set; }
        public string Certainty { get; set; }
        public string Event { get; set; }
        public string Effective { get; set; }
        public string Expires { get; set; }
        public string Desc { get; set; }
        public string Instruction { get; set; }
        public override string ToString()
        {
            return @$"
                ""Severity: {Severity}""
                ""Areas: {Areas}""
                ""Certainty: {Certainty}""
                ""Event: {Event}""
                ""Effective: {Effective}""
                ""Expires: {Expires}""
                ""Desc: {Desc}""
                ""Instruction: {Instruction}""
            ";
        }
    }
}