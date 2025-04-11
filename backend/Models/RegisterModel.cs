using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Models
{
    public class RegisterModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string ConfirmPassword { get; set; }

        [Required]
        public string FullName { get; set; }  // Ensure this field is required

        [Url]
        public string ProfilePictureUrl { get; set; }
    }
}
