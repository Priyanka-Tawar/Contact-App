# Contact App Frontend

Contact Record Keeping Application - Angular Frontend

## Prerequisites

- Node.js 18+ and npm
- Angular CLI 17+
- VS Code (recommended)

## Setup Instructions

### 1. Install Dependencies

```bash
cd contact-app-frontend
npm install
```

### 2. Install Angular CLI (if not already installed)

```bash
npm install -g @angular/cli
```

### 3. Run the Application

```bash
npm start
```

The application will start at `http://localhost:4200`

## Features

- **User Authentication**
  - User registration with form validation
  - Login with JWT token authentication
  - Auto-redirect to dashboard after login
  - Secure route protection with Auth Guards

- **Dashboard**
  - View all contacts in a card-based grid layout
  - Paginated contact list (10 contacts per page)
  - Add new contacts with modal form
  - Edit existing contacts
  - Delete individual contacts
  - Delete all contacts
  - Mark contacts as favorites
  - Real-time updates

- **Profile Management**
  - View user profile information
  - Edit profile details (name, email, phone, address, about)
  - Form validation
  - Success/error notifications
  - Display account creation and update timestamps

## Technology Stack

- Angular 17 (Latest)
- Bootstrap 5.3.2
- Bootstrap Icons 1.11.2
- RxJS 7.8
- TypeScript 5.2

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   └── navbar/
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   └── contact.service.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   └── contact.model.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   ├── config/
│   │   └── api.config.ts
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── assets/
├── index.html
├── main.ts
└── styles.css
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build and watch for changes

## API Configuration

The frontend is configured to connect to the backend API at `http://localhost:8080/api`

You can modify the API URL in `src/app/config/api.config.ts`:

```typescript
export const API_BASE_URL = 'http://localhost:8080/api';
```

## Key Features Implementation

### Authentication Flow
1. User registers/logs in
2. JWT token received and stored in localStorage
3. Token automatically attached to all API requests via HTTP Interceptor
4. Auth Guard protects routes requiring authentication

### Contact Management
- CRUD operations for contacts
- Pagination support (10 items per page)
- Real-time updates after create/update/delete
- Modal-based forms for add/edit

### Profile Management
- View/Edit user profile
- Form validation
- Success/error notifications
- Optimistic UI updates

## Styling

- Bootstrap 5 for responsive UI
- Bootstrap Icons for icon library
- Custom CSS for enhanced user experience
- Card-based layouts
- Hover effects and transitions
- Mobile-friendly responsive design

## Security

- JWT token-based authentication
- HTTP Interceptor for automatic token attachment
- Auth Guard for route protection
- Automatic redirect to login for unauthenticated users
- Token stored in localStorage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

1. Make sure the backend server is running on port 8080
2. Clear localStorage if experiencing authentication issues
3. Check browser console for any errors
4. Use Chrome DevTools for debugging

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Troubleshooting

### CORS Issues
Make sure the backend CORS configuration allows `http://localhost:4200`

### API Connection Issues
Verify the backend server is running and accessible at `http://localhost:8080`

### Token Expiration
If token expires, user will be redirected to login page automatically
