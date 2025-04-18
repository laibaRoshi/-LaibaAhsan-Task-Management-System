using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Data;
using TaskManagementSystem.Models;
using TaskManagementSystem.Services;
using TaskModel = TaskManagementSystem.Models.AppTask; // Alias to avoid conflict

var builder = WebApplication.CreateBuilder(args);

// Configure Services
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    if (string.IsNullOrEmpty(connectionString))
    {
        throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured.");
    }

    options.UseSqlServer(connectionString);
});

// Register TaskService to use Dependency Injection
builder.Services.AddScoped<TaskService>();

// Enable CORS policy for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add Swagger for API Documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure Middleware
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();  // Detailed exception page for development
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

// API Endpoints for Task CRUD

app.MapGet("/api/tasks", async (TaskService taskService) =>
{
    var tasks = await taskService.GetAllTasksAsync();
    return Results.Ok(tasks);
});

app.MapPost("/api/tasks", async (TaskModel task, TaskService taskService) =>
{
    await taskService.AddTaskAsync(task);
    return Results.Created($"/api/tasks/{task.Id}", task);
});

app.MapPut("/api/tasks/{id}", async (int id, TaskModel updatedTask, TaskService taskService) =>
{
    var task = await taskService.GetTaskByIdAsync(id);
    if (task == null) return Results.NotFound();

    updatedTask.Id = id;
    await taskService.UpdateTaskAsync(updatedTask);
    return Results.NoContent();
});

app.MapDelete("/api/tasks/{id}", async (int id, TaskService taskService) =>
{
    var task = await taskService.GetTaskByIdAsync(id);
    if (task == null) return Results.NotFound();

    await taskService.DeleteTaskAsync(id);
    return Results.NoContent();
});

app.Run();
