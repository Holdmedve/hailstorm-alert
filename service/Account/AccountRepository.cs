
namespace WeatherAlert;

public static class UserRepository
{
    public static Account Find(string username, string password)
    {
        var users = new List<Account>()
        {
            new Account() { Id = 42, Name = "manager", Password = "&u*eVFG95%", Email = "manager@gmail.com", Role = "account"},
            new Account() { Id = 42, Name = "operator", Password = "3!xeTwVNvc", Email = "operator@gmail.com", Role = "account"},
        };
        return users.FirstOrDefault(account => account.Name.ToLower() == username.ToLower() && account.Password == password);
    }
}