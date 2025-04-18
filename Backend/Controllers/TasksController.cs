using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Services;
using ModelsTask = TaskManagementSystem.Models.AppTask; // Alias for your model

namespace TaskManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        // GET api/tasks
        [HttpGet]
        public async Task<ActionResult<List<ModelsTask>>> GetTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);
        }

        // POST api/tasks
        [HttpPost]
        public async Task<ActionResult> AddTask([FromBody] ModelsTask task)
        {
            await _taskService.AddTaskAsync(task);
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        // PUT api/tasks/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(int id, [FromBody] ModelsTask task)
        {
            var existingTask = await _taskService.GetTaskByIdAsync(id);
            if (existingTask == null) return NotFound();

            task.Id = id;
            await _taskService.UpdateTaskAsync(task);
            return NoContent();
        }

        // DELETE api/tasks/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null) return NotFound();

            await _taskService.DeleteTaskAsync(id);
            return NoContent();
        }
    }
}
