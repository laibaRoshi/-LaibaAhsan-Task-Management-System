using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Data;
using TaskManagementSystem.Models;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public DashboardController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet("taskCounts")]
    public async Task<IActionResult> GetTaskCounts()
    {
        var user = await _userManager.GetUserAsync(User);
        var roles = await _userManager.GetRolesAsync(user);

        bool isAdmin = roles.Contains("Admin");

        var tasks = isAdmin
            ? _context.Tasks
            : _context.Tasks.Where(t => t.AssignedUserId == user.Id);

        // Fixing the ambiguity by fully qualifying the TaskStatus enum
        var completed = await tasks.CountAsync(t => t.Status == TaskManagementSystem.Models.TaskStatus.Completed);
        var inProgress = await tasks.CountAsync(t => t.Status == TaskManagementSystem.Models.TaskStatus.InProgress);
        var pending = await tasks.CountAsync(t => t.Status == TaskManagementSystem.Models.TaskStatus.Pending);

        return Ok(new
        {
            Completed = completed,
            InProgress = inProgress,
            Pending = pending
        });
    }
}
