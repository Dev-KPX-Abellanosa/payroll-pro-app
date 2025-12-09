// Export Prisma Client
export { PrismaClient } from '@prisma/client';
export * from '@prisma/client';

// Export types
export type {
  User,
  Employee,
  Attendance,
  Shift,
  PayRate,
  PayrollRecord,
  PayrollRun,
  Deduction,
  Contribution,
  Loan,
  LoanPayment,
  LeaveRequest,
  Holiday,
  AuditLog,
  Role,
  EmploymentType,
  AttendanceStatus,
  RateType,
  PayrollStatus,
  PayrollRunStatus,
  DeductionType,
  ContributionType,
  LoanType,
  LoanStatus,
  LeaveType,
  LeaveStatus,
  HolidayType,
} from '@prisma/client';

// Export Prisma Client instance
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

