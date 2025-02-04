'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui';
import { UseControllerProps } from 'react-hook-form';

interface SelectFieldProps extends UseControllerProps {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const SelectField = ({
  label,
  placeholder,
  options,
  ...controllerProps
}: SelectFieldProps) => {
  return (
    <FormField
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel htmlFor={field.name} className="font-bold">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              defaultValue="aa"
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder || ''} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
