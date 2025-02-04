'use client';
import { useState } from 'react';
import {
  Input,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui';
import { UseControllerProps } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface PasswordFieldProps extends UseControllerProps {
  label?: string;
  placeholder?: string;
}

export const PasswordField = ({
  label,
  placeholder,
  ...controllerProps
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
            <div className="relative">
              <Input
                {...field}
                id={field.name}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className="pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
