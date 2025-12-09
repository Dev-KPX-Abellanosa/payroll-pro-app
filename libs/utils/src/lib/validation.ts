import { z } from 'zod';

/**
 * Email validation schema
 */
export const emailSchema = z.string().email('Invalid email address');

/**
 * Password validation schema
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

/**
 * Employee number validation
 */
export const employeeNumberSchema = z
  .string()
  .min(3, 'Employee number must be at least 3 characters')
  .max(20, 'Employee number must be at most 20 characters')
  .regex(/^[A-Z0-9-]+$/, 'Employee number can only contain uppercase letters, numbers, and hyphens');

/**
 * Phone number validation
 */
export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format')
  .min(10, 'Phone number must be at least 10 digits');

/**
 * Validate date range
 */
export function validateDateRange(startDate: Date, endDate: Date): boolean {
  return startDate <= endDate;
}

/**
 * Validate time range
 */
export function validateTimeRange(startTime: string, endTime: string): boolean {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const start = startHour * 60 + startMin;
  const end = endHour * 60 + endMin;
  
  return start < end;
}

