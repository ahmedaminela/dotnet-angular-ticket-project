import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';

const routes: Routes = [
  { path: 'tickets', component: TicketListComponent },
  { path: 'create', component: TicketFormComponent },
  { path: 'edit/:id', component: TicketFormComponent },
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
