/**
 * Payroll calculation utilities
 */

export interface PayrollCalculationInput {
  regularHours: number;
  hourlyRate: number;
  overtimeHours?: number;
  nightDifferentialHours?: number;
  holidayHours?: number;
  allowanceAmount?: number;
  bonusAmount?: number;
  deductions?: Array<{ amount: number }>;
  contributions?: Array<{ employeeShare: number }>;
  taxRate?: number;
}

export interface PayrollCalculationResult {
  regularPay: number;
  overtimePay: number;
  nightDifferentialPay: number;
  holidayPay: number;
  allowanceAmount: number;
  bonusAmount: number;
  grossPay: number;
  totalDeductions: number;
  totalContributions: number;
  taxWithheld: number;
  netPay: number;
}

/**
 * Calculate regular pay
 */
export function calculateRegularPay(hours: number, hourlyRate: number): number {
  return hours * hourlyRate;
}

/**
 * Calculate overtime pay (typically 1.25x or 1.5x regular rate)
 */
export function calculateOvertimePay(
  hours: number,
  hourlyRate: number,
  multiplier: number = 1.25
): number {
  return hours * hourlyRate * multiplier;
}

/**
 * Calculate night differential pay (typically 1.1x regular rate for night shift hours)
 */
export function calculateNightDifferentialPay(
  hours: number,
  hourlyRate: number,
  multiplier: number = 1.1
): number {
  return hours * hourlyRate * multiplier;
}

/**
 * Calculate holiday pay (typically 2x regular rate)
 */
export function calculateHolidayPay(
  hours: number,
  hourlyRate: number,
  multiplier: number = 2.0
): number {
  return hours * hourlyRate * multiplier;
}

/**
 * Calculate total gross pay
 */
export function calculateGrossPay(
  regularPay: number,
  overtimePay: number,
  nightDifferentialPay: number,
  holidayPay: number,
  allowanceAmount: number,
  bonusAmount: number
): number {
  return (
    regularPay +
    overtimePay +
    nightDifferentialPay +
    holidayPay +
    allowanceAmount +
    bonusAmount
  );
}

/**
 * Calculate tax withheld (simplified - adjust based on tax brackets)
 */
export function calculateTaxWithheld(
  grossPay: number,
  taxRate: number = 0.15
): number {
  // Simplified tax calculation - in production, use actual tax brackets
  return grossPay * taxRate;
}

/**
 * Calculate total deductions
 */
export function calculateTotalDeductions(deductions: Array<{ amount: number }>): number {
  return deductions.reduce((sum, deduction) => sum + deduction.amount, 0);
}

/**
 * Calculate total contributions
 */
export function calculateTotalContributions(
  contributions: Array<{ employeeShare: number }>
): number {
  return contributions.reduce((sum, contrib) => sum + contrib.employeeShare, 0);
}

/**
 * Calculate net pay
 */
export function calculateNetPay(
  grossPay: number,
  totalDeductions: number,
  totalContributions: number,
  taxWithheld: number
): number {
  return grossPay - totalDeductions - totalContributions - taxWithheld;
}

/**
 * Complete payroll calculation
 */
export function calculatePayroll(input: PayrollCalculationInput): PayrollCalculationResult {
  const regularPay = calculateRegularPay(input.regularHours, input.hourlyRate);
  const overtimePay = calculateOvertimePay(input.overtimeHours || 0, input.hourlyRate);
  const nightDifferentialPay = calculateNightDifferentialPay(
    input.nightDifferentialHours || 0,
    input.hourlyRate
  );
  const holidayPay = calculateHolidayPay(input.holidayHours || 0, input.hourlyRate);
  const allowanceAmount = input.allowanceAmount || 0;
  const bonusAmount = input.bonusAmount || 0;

  const grossPay = calculateGrossPay(
    regularPay,
    overtimePay,
    nightDifferentialPay,
    holidayPay,
    allowanceAmount,
    bonusAmount
  );

  const totalDeductions = calculateTotalDeductions(input.deductions || []);
  const totalContributions = calculateTotalContributions(input.contributions || []);
  const taxWithheld = calculateTaxWithheld(grossPay, input.taxRate);

  const netPay = calculateNetPay(grossPay, totalDeductions, totalContributions, taxWithheld);

  return {
    regularPay,
    overtimePay,
    nightDifferentialPay,
    holidayPay,
    allowanceAmount,
    bonusAmount,
    grossPay,
    totalDeductions,
    totalContributions,
    taxWithheld,
    netPay,
  };
}

/**
 * Calculate hours worked from time in and time out
 */
export function calculateHoursWorked(
  timeIn: Date,
  timeOut: Date,
  breakDurationMinutes: number = 0
): number {
  const diffMs = timeOut.getTime() - timeIn.getTime();
  const diffMinutes = diffMs / (1000 * 60);
  const hours = (diffMinutes - breakDurationMinutes) / 60;
  return Math.max(0, hours);
}

/**
 * Check if time falls within night shift hours (10 PM to 6 AM)
 */
export function isNightShiftTime(time: Date): boolean {
  const hour = time.getHours();
  return hour >= 22 || hour < 6;
}

