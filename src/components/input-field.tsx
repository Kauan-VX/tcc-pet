'use client';
import { Input } from '@/components/ui';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseControllerProps } from 'react-hook-form';

interface InputFieldProps extends UseControllerProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = 'text',
  ...controllerProps
}) => {
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
            <Input
              {...field}
              id={field.name}
              type={type}
              placeholder={placeholder}
              onChange={(e) => {
                if (type === 'number') {
                  field.onChange(Number(e.target.value));
                } else {
                  field.onChange(e.target.value);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
