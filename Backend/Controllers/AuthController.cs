using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.DTOs;


[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public ActionResult Login([FromBody] LoginModel model)
    {
        // Implement login logic here (e.g., JWT authentication)
        return Ok();
    }

    [HttpPost("register")]
    public ActionResult Register([FromBody] RegisterModel model)
    {
        // Implement registration logic here
        return Created("", model);
    }
}
