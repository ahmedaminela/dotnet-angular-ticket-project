using Microsoft.EntityFrameworkCore;
using TicketManagementAPI.Data; // Adjust this according to your project structure
using TicketManagementAPI.Models; // Adjust this according to your project structure

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Configure the DbContext with SQL Server
builder.Services.AddDbContext<TicketDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:4200") // Allow requests from Angular frontend
                          .AllowAnyMethod()                // Allow any HTTP method
                          .AllowAnyHeader());              // Allow any HTTP header
});

// Add controllers to the service collection
builder.Services.AddControllers(); // Ensure this line is present

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("AllowSpecificOrigin"); // Apply the CORS policy

// Enable attribute routing for controllers
app.MapControllers(); // Ensure this line is present

// Example of a mapped endpoint (optional, can be removed if not needed)
var summaries = new[] 
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
