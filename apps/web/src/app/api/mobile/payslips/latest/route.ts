import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@payroll-pro/data';
import jwt from 'jsonwebtoken';

async function getUserIdFromToken(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
      userId: string;
    };
    return decoded.userId;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { employee: true },
    });

    if (!user?.employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    const latest = await prisma.payrollRecord.findFirst({
      where: { employeeId: user.employee.id },
      orderBy: { periodStart: 'desc' },
    });

    if (!latest) {
      return NextResponse.json({ error: 'No payslips found' }, { status: 404 });
    }

    return NextResponse.json({
      period: `${latest.periodStart.toISOString().split('T')[0]} - ${latest.periodEnd.toISOString().split('T')[0]}`,
      grossPay: latest.grossPay,
      netPay: latest.netPay,
      status: latest.status,
    });
  } catch (error) {
    console.error('Error fetching latest payslip:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

