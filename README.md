# Finance App

A comprehensive Angular finance application with authentication, dashboard, and administration features.

## Features

✅ **Authentication System**
- Login/Signup/Reset Password pages
- JWT-like token simulation
- Role-based access control (Admin/User)
- Authentication guards

✅ **HTTP Interceptors**
- Automatic token attachment
- Error handling for 401 responses
- Automatic logout on unauthorized access

✅ **UI Framework Integration**
- Tailwind CSS for utility-first styling
- PrimeNG for professional UI components
- Responsive design

✅ **Finance Dashboard**
- Real-time financial overview cards
- Interactive charts (Income vs Expenses, Expense Categories)
- Recent transactions table
- Sample financial data

✅ **Administration Panel**
- User management (Create, Read, Update, Delete)
- Role assignment (Admin/User)
- Status management (Active/Inactive/Suspended)
- Confirmation dialogs and toast notifications

✅ **Routing & Navigation**
- Lazy loading components
- Protected routes with guards
- Clean navigation with active states

## Demo Accounts

Use these credentials to test the application:

### Admin Account
- **Email:** admin@demo.com
- **Password:** admin123
- **Access:** Full access including administration panel

### Regular User Account
- **Email:** user@demo.com
- **Password:** user123
- **Access:** Dashboard only

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Angular CLI (optional, uses npx)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd finance-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── auth/                    # Authentication components
│   │   ├── login/
│   │   ├── signup/
│   │   └── reset-password/
│   ├── dashboard/               # Finance dashboard
│   ├── admin/                   # Administration panel
│   ├── shared/                  # Shared components
│   │   └── navbar/
│   ├── services/                # Services
│   │   └── auth.service.ts
│   ├── guards/                  # Route guards
│   │   └── auth-guard.ts
│   ├── interceptors/           # HTTP interceptors
│   │   └── auth-interceptor.ts
│   └── app.routes.ts           # Application routing
├── styles.css                  # Global styles
└── main.ts                     # Application bootstrap
```

## Technology Stack

- **Framework:** Angular 19 (Zoneless)
- **UI Library:** PrimeNG
- **CSS Framework:** Tailwind CSS
- **Charts:** Chart.js via PrimeNG
- **Build Tool:** Angular CLI
- **Package Manager:** npm

## Features in Detail

### Authentication
- Secure login/signup flow
- Password reset functionality
- Persistent authentication state
- Role-based access control

### Dashboard
- Financial overview with key metrics
- Interactive charts showing income vs expenses
- Expense category breakdown
- Recent transactions table
- Responsive design for all screen sizes

### Admin Panel
- Complete user management CRUD operations
- Role assignment and status management
- Confirmation dialogs for destructive actions
- Real-time updates with toast notifications

### Technical Features
- HTTP interceptors for automatic token handling
- Route guards for protected pages
- Lazy loading for optimal performance
- Modern Angular signals for reactive state
- TypeScript strict mode
- Responsive design patterns

## Customization

The application is built with modularity in mind:

1. **Theming:** Modify `src/styles.css` for global styles and PrimeNG theme
2. **API Integration:** Replace simulation methods in `auth.service.ts` with real API calls
3. **Dashboard Data:** Update `dashboard.component.ts` to fetch real financial data
4. **User Management:** Connect admin panel to real user management APIs

## Development

### Building for Production
```bash
npm run build
```

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## License

This project is for demonstration purposes.