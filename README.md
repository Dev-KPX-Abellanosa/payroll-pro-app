# Payroll Pro - Full-Stack Payroll Management System

A comprehensive, production-ready payroll management system built with NX Monorepo, Next.js, Expo, and Prisma.

## 🏗️ Architecture

This monorepo contains:

- **apps/web** - Next.js 14 web admin dashboard with shadcn/ui
- **apps/mobile** - Expo React Native mobile app for employees
- **libs/ui** - Shared UI components (Tailwind + shadcn/ui)
- **libs/utils** - Shared utility functions
- **libs/data** - Prisma schema and database models

## 📋 Features

### Web Admin Dashboard
- ✅ Employee management (CRUD)
- ✅ Attendance tracking
- ✅ Payroll runs and processing
- ✅ Payroll register
- ✅ Loan management
- ✅ Reports generation
- ✅ Settings configuration
- ✅ Role-based access control
- ✅ Audit logging

### Mobile App
- ✅ Employee self-service portal
- ✅ View payslips
- ✅ Check attendance records
- ✅ Update profile information
- ✅ Push notifications support

### Payroll Calculations
- ✅ Regular hours and pay
- ✅ Overtime calculations (1.25x - 1.5x)
- ✅ Night differential (1.1x)
- ✅ Holiday pay (2x)
- ✅ Deductions and contributions
- ✅ Tax calculations
- ✅ Net pay computation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL or MySQL database
- For mobile: Expo CLI and iOS/Android development environment

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create `.env` in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/payroll_pro?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# JWT for mobile
JWT_SECRET="your-jwt-secret-key-here"

# API URL for mobile (update for production)
EXPO_PUBLIC_API_URL="http://localhost:3000"
```

3. **Set up the database:**

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# (Optional) Open Prisma Studio to view/edit data
npm run db:studio
```

4. **Create initial admin user:**

You can create an admin user via Prisma Studio or by running a seed script. Here's a quick way using Node:

```bash
node -e "
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@payrollpro.com',
      passwordHash: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('Admin user created: admin@payrollpro.com / admin123');
}

main().catch(console.error).finally(() => prisma.$disconnect());
"
```

## 🏃 Running the Applications

### Web Application

```bash
# Development
npm run dev:web

# Build for production
npm run build:web
```

The web app will be available at `http://localhost:3000`

### Mobile Application

```bash
# Start Expo development server
npm run dev:mobile

# Run on iOS simulator
nx run mobile:run-ios

# Run on Android emulator
nx run mobile:run-android
```

## 📁 Project Structure

```
payroll-pro/
├── apps/
│   ├── web/                 # Next.js web application
│   │   ├── src/
│   │   │   ├── app/         # Next.js app router pages
│   │   │   ├── components/  # React components
│   │   │   └── api/         # API routes
│   │   └── ...
│   └── mobile/              # Expo React Native app
│       ├── src/
│       │   └── app/         # Expo router screens
│       └── ...
├── libs/
│   ├── ui/                  # Shared UI components
│   ├── utils/               # Utility functions
│   └── data/                # Prisma schema & models
│       └── prisma/
│           └── schema.prisma
└── ...
```

## 🗄️ Database Schema

The Prisma schema includes models for:

- **Users** - Authentication and authorization
- **Employees** - Employee information
- **Attendance** - Time tracking records
- **Shifts** - Work shift definitions
- **PayRates** - Employee pay rates
- **PayrollRecords** - Individual payroll calculations
- **PayrollRuns** - Payroll processing batches
- **Deductions** - Employee deductions
- **Contributions** - SSS, PhilHealth, Pag-IBIG
- **Loans** - Employee loans and payments
- **LeaveRequests** - Leave management
- **Holidays** - Holiday calendar
- **AuditLogs** - System audit trail

## 🔐 Authentication

### Web (NextAuth.js)
- JWT-based sessions
- Role-based access control
- Protected API routes

### Mobile (JWT)
- Token-based authentication
- Secure token storage with AsyncStorage
- Automatic token refresh

## 🧮 Payroll Calculation Logic

The system calculates payroll based on:

1. **Regular Hours** - Standard working hours × hourly rate
2. **Overtime** - Hours beyond 8/day × rate × 1.25 (or 1.5x)
3. **Night Differential** - Night shift hours × rate × 1.1
4. **Holiday Pay** - Holiday hours × rate × 2.0
5. **Gross Pay** - Sum of all earnings + allowances + bonuses
6. **Deductions** - Loans, advances, other deductions
7. **Contributions** - SSS, PhilHealth, Pag-IBIG (employee share)
8. **Tax** - Withheld tax (simplified calculation)
9. **Net Pay** - Gross pay - deductions - contributions - tax

## 📱 Mobile App Features

- **Home Screen** - Dashboard with latest payslip summary
- **Payslips** - View all payslip history with detailed breakdown
- **Attendance** - View attendance records and hours worked
- **Profile** - Update personal information (phone, address)

## 🔧 Development

### Adding New Features

1. **Database Changes:**
   - Update `libs/data/prisma/schema.prisma`
   - Run `npm run db:migrate`

2. **API Routes:**
   - Add routes in `apps/web/src/app/api/`

3. **UI Components:**
   - Add to `libs/ui/src/components/` for shared components
   - Add to app-specific folders for app-only components

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting

```bash
# Lint
npm run lint

# Format
npm run format
```

## 🚢 Deployment

### Web Application

1. Build the application:
```bash
npm run build:web
```

2. Deploy to Vercel, Netlify, or your preferred hosting:
   - Set environment variables
   - Configure database connection
   - Deploy

### Mobile Application

1. Build for production:
```bash
# iOS
nx run mobile:build-ios

# Android
nx run mobile:build-android
```

2. Submit to App Store / Play Store

### Database

- Use a managed PostgreSQL service (AWS RDS, Supabase, etc.)
- Update `DATABASE_URL` in production environment
- Run migrations in production:
```bash
npx prisma migrate deploy
```

## 🔒 Security Considerations

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Input validation with Zod
- ✅ SQL injection protection (Prisma)
- ✅ CORS configuration
- ✅ Environment variable security

## 📊 Reports & Exports

The system supports:
- Payroll register exports (CSV/PDF)
- Employee reports
- Attendance reports
- Tax reports

(Implementation details in Reports page)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests for specific project
nx test web
nx test mobile
```

## 📝 License

MIT

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Built with ❤️ using NX, Next.js, Expo, and Prisma**

