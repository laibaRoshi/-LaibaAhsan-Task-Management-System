[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TasksController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
    {
        var tasks = await _context.Tasks.ToListAsync();
        if (tasks == null || tasks.Count == 0)
        {
            return NotFound("No tasks found.");
        }
        return Ok(tasks);
    }
}
