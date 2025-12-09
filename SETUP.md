# Payroll Pro - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

#### Option A: PostgreSQL (Recommended)

1. Install PostgreSQL locally or use a cloud service
2. Create a database:
```sql
CREATE DATABASE payroll_pro;
```

#### Option B: MySQL

1. Install MySQL locally or use a cloud service
2. Create a database:
```sql
CREATE DATABASE payroll_pro;
```

3. Update `libs/data/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/payroll_pro?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here"
JWT_SECRET="generate-a-random-jwt-secret-here"
EXPO_PUBLIC_API_URL="http://localhost:3000"
```

**Generate secrets:**
```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate
```

### 5. Create Admin User

Run this Node.js script to create an admin user:

```bash
node scripts/create-admin.js
```

Or manually via Prisma Studio:
```bash
npm run db:studio
```

Then create a user with:
- Email: `admin@payrollpro.com`
- Password: (hash with bcrypt)
- Role: `ADMIN`

### 6. Start Development Servers

**Web App:**
```bash
npm run dev:web
```
Visit: http://localhost:3000

**Mobile App:**
```bash
npm run dev:mobile
```
Scan QR code with Expo Go app

## Production Deployment

### Web Application

1. **Build:**
```bash
npm run build:web
```

2. **Deploy to Vercel:**
   - Connect your repository
   - Set environment variables
   - Deploy

3. **Or deploy to your server:**
   - Build the app
   - Set up Node.js environment
   - Configure reverse proxy (nginx)
   - Set environment variables

### Mobile Application

1. **Configure app.json:**
   - Update bundle identifiers
   - Set app icons and splash screens

2. **Build:**
```bash
# iOS
nx run mobile:build-ios

# Android
nx run mobile:build-android
```

3. **Submit to stores:**
   - App Store (iOS)
   - Google Play Store (Android)

### Database

1. **Use managed database:**
   - AWS RDS
   - Supabase
   - Railway
   - PlanetScale

2. **Run migrations:**
```bash
npx prisma migrate deploy
```

3. **Update DATABASE_URL** in production environment

## Troubleshooting

### Database Connection Issues

- Verify DATABASE_URL format
- Check database is running
- Verify credentials
- Check firewall settings

### Prisma Issues

```bash
# Reset Prisma Client
rm -rf node_modules/.prisma
npm run db:generate
```

### Mobile App Issues

```bash
# Clear Expo cache
npx expo start -c

# Clear Metro bundler cache
npx react-native start --reset-cache
```

### Port Already in Use

Change ports in:
- `apps/web/next.config.js` (if needed)
- Expo will auto-assign ports

## Next Steps

1. Create employees
2. Set up pay rates
3. Configure shifts
4. Add holidays
5. Set up deductions and contributions
6. Process first payroll run

## Support

For issues, check:
- README.md
- Prisma documentation
- Next.js documentation
- Expo documentation

