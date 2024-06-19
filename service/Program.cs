using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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

        builder.Services.AddDbContext<DbAccountsContext>();
        builder.Services.AddSingleton<TokenService>();

        var secretKey = Settings.GenerateSecretByte();

        builder.Services.AddAuthentication(config => {
            config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(config => {
            config.RequireHttpsMetadata = false;
            config.SaveToken = true;
            config.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(secretKey),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

        builder.Services.AddAuthorization(options => {
            options.AddPolicy("account", policy => policy.RequireRole("account"));
        });

        var app = builder.Build();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseCors();

        app.MapGet("/", () => "Hello World!");
        app.MapGet("/city-search/{query}", Handlers.CitySearch);
        app.MapGet("/city-weather/{cityId}", Handlers.CityWeather);

        app.MapGet("/accounts", async (DbAccountsContext db) => {
            var accounts = await db.Accounts.ToListAsync();
            return Results.Ok(accounts);
        });

        app.MapPost("/accounts", async (Account account, DbAccountsContext db) => {
            db.Accounts.Add(account);
            await db.SaveChangesAsync();
            return Results.Ok(account);
        });

        app.MapPost("/login", (Account account, TokenService service) =>
        {
            var acc = UserRepository.Find(account.Name, account.Password);

            if (acc is null)
                return Results.NotFound(new { message = "Invalid username or password" });

            var token = service.GenerateToken(acc);

            acc.Password = string.Empty;

            return Results.Ok(new { user = acc, token = token });
        });

        app.MapGet("/operator", (ClaimsPrincipal account) =>
        {
            Console.WriteLine(account.IsInRole("account"));
            Console.WriteLine(account.IsInRole("Account"));
            foreach (var c in account.Claims) {
                Console.WriteLine(c);
            }
            Results.Ok(new { message = $"Authenticated as { account?.Identity?.Name }" });
        }).RequireAuthorization("Account");
        // });

        // app.MapPost("/login", async ([FromBody] LoginRequest loginRequest) => {
        //     //your logic for login process
        //     //If login usrename and password are correct then proceed to generate token

        //     var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        //     var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //     var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
        //         _config["Jwt:Issuer"],
        //         null,
        //         expires: DateTime.Now.AddMinutes(120),
        //         signingCredentials: credentials);

        //     var token =  new JwtSecurityTokenHandler().WriteToken(Sectoken);

        //     return Results.Ok(token);
        // });

        var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
        var url = $"http://0.0.0.0:{port}";
        app.Run(url);
    }
} 

