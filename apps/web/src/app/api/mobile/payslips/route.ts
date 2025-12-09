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

    const payslips = await prisma.payrollRecord.findMany({
      where: { employeeId: user.employee.id },
      orderBy: { periodStart: 'desc' },
      take: 12,
    });

    return NextResponse.json(payslips);
  } catch (error) {
    console.error('Error fetching payslips:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

