# dotnet-angular-ticket-project
## Overview

This project is a Ticket Management System built with Angular for the front end and ASP.NET Core for the back end. It allows users to create, edit, delete, and view tickets.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **.NET 8.0 SDK** installed on your machine
- **Node.js** (version 14 or later)
- **Angular CLI** installed globally
- **SQL Server** installed and running

1. **Clone the repository**:
   git clone https://your-repo-url.git

   --Backend Setup:

   >cd TicketManagementAPI
   >dotnet restore
   --Configure the Connection String:
   ##Open appsettings.json in the TicketManagementAPI project.
   ##Update the DefaultConnection string to point to your SQL Server instance.

   --Database Migration
   ##To create or update the database schema, use the following commands in the terminal or command prompt:
    >dotnet ef migrations add InitialCreate
    >dotnet ef database update


    --Running the Frontend
    >cd ticket-management-frontend
    >npm install
    >ng serve
    navigate to http://localhost:4200


