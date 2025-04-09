using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Data;
using TaskManagementSystem.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS to allow frontend requests
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add DbContext with SQL Server configuration
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add controllers for the Task API
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowAllOrigins");

// Map Task-related API routes
app.MapGet("/", () => "Welcome to the Task Management System!");

// API endpoint for retrieving all tasks
app.MapGet("/api/tasks", async (ApplicationDbContext context) =>
{
    return await context.Tasks.ToListAsync();
});

// API endpoint for retrieving a task by id
app.MapGet("/api/tasks/{id}", async (int id, ApplicationDbContext context) =>
{
    var task = await context.Tasks.FindAsync(id);
    return task is not null ? Results.Ok(task) : Results.NotFound();
});

// API endpoint for creating a new task
app.MapPost("/api/tasks", async (TaskItem task, ApplicationDbContext context) =>
{
    context.Tasks.Add(task);
    await context.SaveChangesAsync();
    return Results.Created($"/api/tasks/{task.Id}", task);
});

// API endpoint for updating a task
app.MapPut("/api/tasks/{id}", async (int id, TaskItem updatedTask, ApplicationDbContext context) =>
{
    var task = await context.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    task.Title = updatedTask.Title;
    task.Description = updatedTask.Description;
    task.DueDate = updatedTask.DueDate;
    task.IsCompleted = updatedTask.IsCompleted;

    await context.SaveChangesAsync();
    return Results.Ok(task);
});

// API endpoint for deleting a task
app.MapDelete("/api/tasks/{id}", async (int id, ApplicationDbContext context) =>
{
    var task = await context.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    context.Tasks.Remove(task);
    await context.SaveChangesAsync();
    return Results.NoContent();
});

// Weather forecast route (you can remove or modify this part)
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
.WithName("GetWeatherForecast");

// Run the application
app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
