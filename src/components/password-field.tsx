'use client';
import { useState } from 'react';
import { Input } from '@/components/ui';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseControllerProps } from 'react-hook-form';
import Icon from '@/shared/icon/icon';

interface PasswordFieldProps extends UseControllerProps {
  label?: string;
  placeholder?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  placeholder,
  ...controllerProps
}) => {
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
                className="absolute right-2  top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <Icon className="size-4  text-black" name="eye_cancel" />
                ) : (
                  <Icon className="size-4  text-black" name="eye" />
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

export default PasswordField;
