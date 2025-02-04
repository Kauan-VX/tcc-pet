'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { ForgotPasswordDataType, forgotPasswordSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { AuthApi } from '@/service/endpoints';
import { onError } from '@/utils';
import { InputField, Button } from '@/components';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: AuthApi.recoveryPassword,
  });

  const form = useForm<ForgotPasswordDataType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async ({ email }: ForgotPasswordDataType) => {
    try {
      const {
        data: { message },
      } = await mutateAsync({ email });

      toast({ variant: 'default', description: message });
    } catch (error) {
      const { variant, description } = onError(error);

      toast({ variant, description });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputField name="email" label="Endereço de e-mail" />
        <div className="flex justify-between items-center">
          <Link href="/" className="text-sm">
            VOLTAR AO LOGIN
          </Link>
          <Button type="submit" isLoading={isLoading}>
            ENVIAR LINK DE REDEFINIÇÃO
          </Button>
        </div>
      </form>
    </Form>
  );
}
