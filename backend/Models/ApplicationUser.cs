using Microsoft.AspNetCore.Identity;

namespace TaskManagementSystem.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Additional properties for user profile
        public string FullName { get; set; }
        public string ProfilePictureUrl { get; set; }
    }
}
