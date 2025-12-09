import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@payroll-pro/data';
import { formatCurrency } from '@payroll-pro/utils';

async function getDashboardStats() {
  const [employees, payrollRuns, totalPayroll] = await Promise.all([
    prisma.employee.count({ where: { isActive: true } }),
    prisma.payrollRun.count({ where: { status: 'COMPLETED' } }),
    prisma.payrollRecord.aggregate({
      where: { status: 'PAID' },
      _sum: { netPay: true },
    }),
  ]);

  return {
    employees,
    payrollRuns,
    totalPayroll: totalPayroll._sum.netPay || 0,
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Payroll Pro</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.employees}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payroll Runs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.payrollRuns}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(stats.totalPayroll)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

