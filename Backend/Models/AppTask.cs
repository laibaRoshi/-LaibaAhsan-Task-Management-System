namespace TaskManagementSystem.Models
{
    public class AppTask
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;  // Set default empty value
        public string Description { get; set; } = string.Empty;  // Set default empty value
        public string Status { get; set; } = "Pending";
        public string Priority { get; set; } = "Medium";
        public DateTime DueDate { get; set; } = DateTime.Now;
    }

}
