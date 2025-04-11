using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagementSystem.Models
{
    public enum TaskStatus
    {
        Pending,
        InProgress,
        Completed
    }

    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.Pending;

        public string Description { get; set; }
        public DateTime DueDate { get; set; }

        // ✅ Make this nullable
        public string? AssignedUserId { get; set; }

        [ForeignKey("AssignedUserId")]
        public ApplicationUser? AssignedUser { get; set; }
    }
}
