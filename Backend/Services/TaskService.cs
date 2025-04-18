using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Data;
using TaskModel = TaskManagementSystem.Models.AppTask; // Alias for your model

namespace TaskManagementSystem.Services
{
    public class TaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async System.Threading.Tasks.Task<List<TaskModel>> GetAllTasksAsync() =>
            await _context.Tasks.ToListAsync();

        public async System.Threading.Tasks.Task<TaskModel?> GetTaskByIdAsync(int id) =>
            await _context.Tasks.FindAsync(id);

        public async System.Threading.Tasks.Task AddTaskAsync(TaskModel task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
        }

        public async System.Threading.Tasks.Task UpdateTaskAsync(TaskModel task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }

        public async System.Threading.Tasks.Task DeleteTaskAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }
    }
}
