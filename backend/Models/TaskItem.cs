using System;

namespace TaskManagementSystem.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Description { get; set; } // Added Description
        public DateTime DueDate { get; set; } // Added DueDate
        public bool IsCompleted { get; set; } // Added IsCompleted
    }
}
