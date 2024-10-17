import { Component, OnInit } from '@angular/core';
import { TicketService } from '../Service/ticket.service';
import { Ticket } from '../Models/ticket';
import { MatDialog } from '@angular/material/dialog';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(page: number = 1, pageSize: number = 10): void {
    this.ticketService.getTickets(page, pageSize).subscribe((tickets) => {
      this.tickets = tickets;

      // Add fade-in effect for rows
      setTimeout(() => {
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach((row) => {
          row.classList.add('fade-in');
        });
      }, 100); // Slight delay for effect
    });
  }

  deleteTicket(id: number): void {
    this.ticketService.deleteTicket(id).subscribe(() => {
      this.loadTickets(); // Reload tickets after deletion
    });
  }

  openAddTicketDialog(): void {
    const dialogRef = this.dialog.open(TicketFormComponent, {
      width: '500px',
      data: {} // Pass empty data for creating a new ticket
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ticket created:', result);
        this.loadTickets(); // Reload tickets after creation
      }
    });
  }
  
  openEditTicketDialog(ticketId: number): void {
    const dialogRef = this.dialog.open(TicketFormComponent, {
      width: '500px',
      data: { id: ticketId } // Pass the ID for editing a ticket
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ticket updated:', result);
        this.loadTickets(); // Reload tickets after update
      }
    });
  }
}
