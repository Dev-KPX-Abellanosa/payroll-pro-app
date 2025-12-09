import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '@payroll-pro/data';
import { calculatePayroll } from '@payroll-pro/utils';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'ACCOUNTANT')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { employeeId, periodStart, periodEnd } = body;

    // Get employee and their rates
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        rates: {
          where: { isActive: true },
          orderBy: { effectiveDate: 'desc' },
          take: 1,
        },
        attendance: {
          where: {
            date: {
              gte: new Date(periodStart),
              lte: new Date(periodEnd),
            },
            status: 'PRESENT',
          },
        },
        deductions: {
          where: { isActive: true },
        },
        contributions: {
          where: { isActive: true },
        },
        loans: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!employee || !employee.rates[0]) {
      return NextResponse.json({ error: 'Employee or rate not found' }, { status: 404 });
    }

    const rate = employee.rates[0];
    const hourlyRate = rate.rateType === 'HOURLY' 
      ? rate.amount 
      : rate.rateType === 'DAILY' 
      ? rate.amount / 8 
      : rate.amount / (22 * 8); // Monthly to hourly

    // Calculate hours
    let regularHours = 0;
    let overtimeHours = 0;
    let nightDifferentialHours = 0;
    let holidayHours = 0;

    for (const attendance of employee.attendance) {
      if (attendance.timeIn && attendance.timeOut) {
        const hours = attendance.totalHours || 0;
        if (hours > 8) {
          regularHours += 8;
          overtimeHours += hours - 8;
        } else {
          regularHours += hours;
        }
        // Check for night shift (simplified)
        if (attendance.shift?.isNightShift) {
          nightDifferentialHours += hours;
        }
      }
    }

    // Get holidays in period
    const holidays = await prisma.holiday.findMany({
      where: {
        date: {
          gte: new Date(periodStart),
          lte: new Date(periodEnd),
        },
      },
    });

    // Calculate payroll
    const calculation = calculatePayroll({
      regularHours,
      hourlyRate,
      overtimeHours,
      nightDifferentialHours,
      holidayHours,
      allowanceAmount: 0,
      bonusAmount: 0,
      deductions: employee.deductions.map((d) => ({
        amount: d.amount || 0,
      })),
      contributions: employee.contributions.map((c) => ({
        employeeShare: c.employeeShare,
      })),
    });

    // Add loan payments
    const loanPayments = employee.loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);
    calculation.totalDeductions += loanPayments;
    calculation.netPay -= loanPayments;

    return NextResponse.json(calculation);
  } catch (error) {
    console.error('Error calculating payroll:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

