import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // For dialog reference and data
import { TicketService } from '../Service/ticket.service';
import { Ticket } from '../Models/ticket';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  ticket: Ticket = { id: 0, description: '', status: 'Open', dateCreated: new Date() };

  constructor(
    private ticketService: TicketService,
    public dialogRef: MatDialogRef<TicketFormComponent>, // Dialog reference for closing
    @Inject(MAT_DIALOG_DATA) public data: { id?: number } // Inject data
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.ticketService.getTicket(this.data.id).subscribe((ticket) => {
        this.ticket = ticket; // Load ticket details for editing
      });
    }
  }

  save(): void {
    if (this.ticket.id) {
      // Update existing ticket
      this.ticketService.updateTicket(this.ticket.id, this.ticket).subscribe(() => {
        this.dialogRef.close(this.ticket); // Close dialog and return the updated ticket
      });
    } else {
      // Create a new ticket
      this.ticketService.createTicket(this.ticket).subscribe((newTicket) => {
        this.dialogRef.close(newTicket); // Close dialog and return the newly created ticket
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}
