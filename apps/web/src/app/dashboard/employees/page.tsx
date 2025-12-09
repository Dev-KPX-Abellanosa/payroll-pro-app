import { EmployeesList } from '@/components/employees/employees-list';

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground">Manage employee information</p>
        </div>
      </div>
      <EmployeesList />
    </div>
  );
}

