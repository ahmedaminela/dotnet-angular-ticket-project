using System;

namespace TicketManagementAPI.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public required string Description { get; set; } // Mark as required
        public required string Status { get; set; }      // Mark as required
        public DateTime DateCreated { get; set; } = DateTime.Now; // Default to current time
    }
}
