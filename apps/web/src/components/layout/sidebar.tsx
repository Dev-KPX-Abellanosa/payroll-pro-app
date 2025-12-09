'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Employees', href: '/dashboard/employees' },
  { name: 'Attendance', href: '/dashboard/attendance' },
  { name: 'Payroll Runs', href: '/dashboard/payroll-runs' },
  { name: 'Payroll Register', href: '/dashboard/payroll-register' },
  { name: 'Loans', href: '/dashboard/loans' },
  { name: 'Reports', href: '/dashboard/reports' },
  { name: 'Settings', href: '/dashboard/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Payroll Pro</h2>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'block px-4 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

