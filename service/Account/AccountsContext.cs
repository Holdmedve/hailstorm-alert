using Microsoft.EntityFrameworkCore;
using WeatherAlert;

public class DbAccountsContext: DbContext {
    public DbSet<Account> Accounts => Set<Account>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=accounts.db");
    }
}
