# Contact App Backend

Contact Record Keeping Application - Spring Boot Backend

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+
- IntelliJ IDEA (recommended)

## Setup Instructions

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE contactdb;
```

Update database credentials in `src/main/resources/application.properties` if needed:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/contactdb
spring.datasource.username=postgres
spring.datasource.password=postgres
```

### 2. Build the Project

```bash
mvn clean install
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

The server will start at `http://localhost:8080`

## API Documentation

Once the application is running, you can access:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/api-docs

## API Endpoints

### Authentication APIs

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login and get JWT token

### User APIs (Requires Authentication)

- **GET** `/api/users/me` - Get current user profile
- **PUT** `/api/users/me` - Update user profile

### Contact APIs (Requires Authentication)

- **POST** `/api/contacts` - Create a new contact
- **GET** `/api/contacts` - Get all contacts (paginated)
- **GET** `/api/contacts/{id}` - Get contact by ID
- **PUT** `/api/contacts/{id}` - Update contact
- **DELETE** `/api/contacts/{id}` - Delete contact
- **DELETE** `/api/contacts` - Delete all contacts

## Testing with Postman

### 1. Register a User

```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St",
  "about": "Software Developer"
}
```

### 2. Login

```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response will include a JWT token. Use this token for authenticated requests.

### 3. Create Contact (Use JWT token)

```
POST http://localhost:8080/api/contacts
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "address": "456 Oak Ave",
  "description": "Business Partner",
  "favorite": false
}
```

### 4. Get All Contacts

```
GET http://localhost:8080/api/contacts?page=0&size=10&sortBy=createdAt
Authorization: Bearer <your-jwt-token>
```

## Technology Stack

- Spring Boot 3.2.1
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- Swagger/OpenAPI 3.0
- Lombok
- Maven

## Project Structure

```
src/main/java/com/contactapp/
├── config/              # Configuration classes
├── controller/          # REST controllers
├── dto/                 # Data Transfer Objects
├── exception/           # Exception handlers
├── model/               # Entity models
├── repository/          # JPA repositories
├── security/            # Security components
└── service/             # Business logic services
```

## Features

- User registration and authentication with JWT
- Secure password encryption
- CRUD operations for contacts
- Pagination and sorting for contact listing
- User profile management
- RESTful API design
- Swagger API documentation
- Global exception handling
- CORS configuration for Angular frontend

## Security

- JWT-based authentication
- BCrypt password encryption
- Stateless session management
- CORS enabled for localhost:4200
