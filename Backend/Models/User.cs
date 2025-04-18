using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
    // Constructor to initialize properties
    public User(string userName, string email, string passwordHash)
    {
        UserName = userName;
        Email = email;
        PasswordHash = passwordHash;
    }

    // Properties for User class
    public new string UserName { get; set; }
    public new string Email { get; set; }
    public new string PasswordHash { get; set; }
}
