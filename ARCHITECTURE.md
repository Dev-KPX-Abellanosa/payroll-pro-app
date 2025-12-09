# Payroll Pro - Architecture Documentation

## System Overview

Payroll Pro is a full-stack payroll management system built with modern technologies and best practices.

## Technology Stack

### Frontend
- **Web**: Next.js 14 (App Router), React 18, TypeScript
- **Mobile**: Expo, React Native, TypeScript
- **UI**: Tailwind CSS, shadcn/ui components
- **State Management**: React Query (TanStack Query), Jotai

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL/MySQL with Prisma ORM
- **Authentication**: NextAuth.js (Web), JWT (Mobile)

### Development Tools
- **Monorepo**: NX
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Type Safety**: TypeScript

## Architecture Patterns

### Monorepo Structure

```
payroll-pro/
├── apps/
│   ├── web/          # Next.js web application
│   └── mobile/       # Expo React Native app
├── libs/
│   ├── ui/           # Shared UI components
│   ├── utils/        # Utility functions
│   └── data/         # Database models & Prisma
└── scripts/          # Utility scripts
```

### Shared Libraries

#### `libs/ui`
- Reusable UI components
- Tailwind CSS styling
- shadcn/ui component patterns
- Works in both web and mobile (where applicable)

#### `libs/utils`
- Formatting functions (currency, dates, etc.)
- Validation schemas (Zod)
- Payroll calculation logic
- Date utilities

#### `libs/data`
- Prisma schema definition
- Database models
- Prisma Client instance
- Type exports

## Data Flow

### Web Application

1. **User Authentication**
   - NextAuth.js handles sessions
   - JWT tokens stored in HTTP-only cookies
   - Role-based access control

2. **API Routes**
   - Server-side API routes in `apps/web/src/app/api/`
   - Protected with NextAuth middleware
   - Direct Prisma database access

3. **Data Fetching**
   - Server Components for initial data
   - React Query for client-side data
   - Optimistic updates where applicable

### Mobile Application

1. **Authentication**
   - JWT token-based
   - Tokens stored in AsyncStorage
   - Automatic token refresh

2. **API Communication**
   - RESTful API calls to web backend
   - Bearer token authentication
   - Error handling and retry logic

3. **State Management**
   - React Query for server state
   - Local state with React hooks
   - AsyncStorage for persistence

## Database Schema

### Core Entities

- **User** - Authentication and authorization
- **Employee** - Employee information
- **Attendance** - Time tracking
- **PayrollRecord** - Individual payroll calculations
- **PayrollRun** - Batch payroll processing
- **Deduction** - Employee deductions
- **Contribution** - Government contributions
- **Loan** - Employee loans
- **AuditLog** - System audit trail

### Relationships

- User 1:1 Employee
- Employee 1:N Attendance
- Employee 1:N PayrollRecord
- Employee 1:N Deduction
- Employee 1:N Contribution
- Employee 1:N Loan
- PayrollRun 1:N PayrollRecord

## Payroll Calculation Flow

1. **Input Collection**
   - Employee attendance records
   - Pay rates
   - Deductions and contributions
   - Holidays

2. **Calculation**
   - Regular hours × rate
   - Overtime (hours > 8) × rate × 1.25
   - Night differential × rate × 1.1
   - Holiday pay × rate × 2.0
   - Sum = Gross Pay

3. **Deductions**
   - Loan payments
   - Other deductions
   - Contributions (SSS, PhilHealth, Pag-IBIG)
   - Tax withholding

4. **Net Pay**
   - Gross Pay - Total Deductions - Tax = Net Pay

## Security

### Authentication
- Password hashing with bcrypt (10 rounds)
- JWT tokens with expiration
- Secure token storage

### Authorization
- Role-based access control (RBAC)
- Route protection middleware
- API endpoint authorization checks

### Data Protection
- Input validation with Zod
- SQL injection prevention (Prisma)
- XSS protection (React)
- CSRF protection (NextAuth)

## Performance

### Optimization Strategies
- Server-side rendering (SSR) for web
- Code splitting
- Image optimization
- Database query optimization
- Caching with React Query

### Scalability
- Stateless API design
- Database indexing
- Connection pooling
- Horizontal scaling ready

## Deployment

### Web Application
- Vercel (recommended)
- Netlify
- Self-hosted (Node.js server)

### Mobile Application
- Expo Application Services (EAS)
- App Store (iOS)
- Google Play Store (Android)

### Database
- Managed PostgreSQL (AWS RDS, Supabase)
- Managed MySQL (PlanetScale)
- Self-hosted database

## Monitoring & Logging

### Recommended Tools
- Error tracking (Sentry)
- Analytics (Plausible, Google Analytics)
- Logging (Winston, Pino)
- Performance monitoring (Vercel Analytics)

## Future Enhancements

- Real-time notifications
- Advanced reporting
- Multi-tenant support
- API rate limiting
- Caching layer (Redis)
- Background job processing
- PDF generation
- Email notifications

