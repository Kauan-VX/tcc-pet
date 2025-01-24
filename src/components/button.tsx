'use client';
import { Button as BaseButton, ButtonProps, buttonVariants } from './ui';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonCustomProps extends ButtonProps {
  isLoading?: boolean;
}

const Button = ({
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonCustomProps) => {
  return (
    <BaseButton
      className={cn(
        buttonVariants({ className }),
        'relative',
        isLoading && 'opacity-75 cursor-not-allowed',
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <Loader2 className="absolute animate-spin text-white" size={16} />
      )}
      <span className={cn(isLoading && 'opacity-0')}>{children}</span>
    </BaseButton>
  );
};

export default Button;
