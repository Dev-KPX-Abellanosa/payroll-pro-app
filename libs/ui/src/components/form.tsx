import * as React from 'react';
import { Input } from './input';
import { Label } from './label';

export interface FormFieldProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export { Input, Label };

