# Contact Record Keeping Application

A full-stack contact management application built with Angular and Spring Boot.

## Project Structure

```
Peoject Task/
├── contact-app-backend/     # Spring Boot Backend
└── contact-app-frontend/    # Angular Frontend
```

## Prerequisites

### Backend
- Java 17+
- Maven 3.6+
- PostgreSQL 12+
- IntelliJ IDEA (recommended)

### Frontend
- Node.js 18+
- npm
- Angular CLI 17+
- VS Code (recommended)

## Quick Start

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE contactdb;
```

### 2. Start Backend Server

```bash
cd contact-app-backend
mvn clean install
mvn spring-boot:run
```

Backend will run on: `http://localhost:8080`

Swagger UI: `http://localhost:8080/swagger-ui.html`

### 3. Start Frontend Application

```bash
cd contact-app-frontend
npm install
npm start
```

Frontend will run on: `http://localhost:4200`

## Features

### User Management
- ✅ User Registration
- ✅ User Login with JWT Authentication
- ✅ Profile Management (View/Edit)
- ✅ Secure Password Encryption

### Contact Management
- ✅ Add New Contact
- ✅ List All Contacts (Paginated)
- ✅ Update Contact
- ✅ Delete Contact
- ✅ Delete All Contacts
- ✅ Mark as Favorite
- ✅ Search and Filter

## Technology Stack

### Backend
- Java Spring Boot 3.2.1
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- Swagger/OpenAPI 3.0
- Lombok
- Maven

### Frontend
- Angular 17
- Bootstrap 5.3.2
- Bootstrap Icons
- RxJS
- TypeScript 5.2

## API Documentation

Once the backend is running, access the Swagger documentation at:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/api-docs

## Module Breakdown

### Module 1 - Server Setup ✅
- Created User and Contact APIs
- Implemented JWT Authentication
- Configured PostgreSQL Database
- Added Swagger Documentation
- Tested with Postman-ready endpoints

### Module 2 - Login and Register UI ✅
- Created Login Component
- Created Register Component
- Implemented form validation
- Integrated with Auth APIs
- Added error handling

### Module 3 - Dashboard UI ✅
- Created Dashboard with Contact listing
- Implemented pagination
- Added Create/Update/Delete functionality
- Created Profile Management UI
- Implemented responsive design

## Testing

### Backend Testing

Use the provided API endpoints with tools like Postman or cURL:

#### Register User
```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Frontend Testing

1. Open browser to `http://localhost:4200`
2. Register a new account
3. Login with credentials
4. Navigate to Dashboard
5. Test CRUD operations on contacts
6. Update your profile

## Security

- JWT-based authentication
- BCrypt password encryption
- CORS configuration
- Protected API endpoints
- Route guards in frontend
- HTTP Interceptors for token management

## Default Configuration

### Backend (application.properties)
- Server Port: 8080
- Database: contactdb
- JWT Expiration: 24 hours

### Frontend (api.config.ts)
- API Base URL: http://localhost:8080/api






