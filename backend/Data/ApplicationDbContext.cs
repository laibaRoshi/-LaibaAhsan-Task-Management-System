using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // DbSet for other models (e.g., TaskItem)
        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Ensure Identity tables are configured properly

            // Configure the custom properties for ApplicationUser explicitly
            modelBuilder.Entity<ApplicationUser>()
                .Property(u => u.FullName)
                .HasMaxLength(255);  // Adjust the length for FullName as per your requirement

            modelBuilder.Entity<ApplicationUser>()
                .Property(u => u.ProfilePictureUrl)
                .HasMaxLength(500); // Set a maximum length for the ProfilePictureUrl (e.g., URL length)
        }
    }
}
