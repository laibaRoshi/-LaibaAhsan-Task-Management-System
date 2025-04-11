using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure ApplicationUser properties
            modelBuilder.Entity<ApplicationUser>()
                .Property(u => u.FullName)
                .HasMaxLength(255);

            modelBuilder.Entity<ApplicationUser>()
                .Property(u => u.ProfilePictureUrl)
                .HasMaxLength(500);

            // ✅ Configure the relationship (nullable FK)
            modelBuilder.Entity<TaskItem>()
                .HasOne(t => t.AssignedUser)
                .WithMany()
                .HasForeignKey(t => t.AssignedUserId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
