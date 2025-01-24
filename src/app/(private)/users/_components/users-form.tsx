'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { UsersDataType, usersSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { UserApi } from '@/service/endpoints';
import { onError } from '@/utils';
import InputField from '@/components/input-field';
import Button from '@/components/button';
import SelectField from '@/components/select-field';

interface UsersForm {
  data?: UsersDataType;
  handleClose: () => void;
}

export default function UsersForm({ data, handleClose }: UsersForm) {
  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: data ? UserApi.update : UserApi.save,
  });

  const form = useForm<UsersDataType>({
    resolver: zodResolver(usersSchema),
    defaultValues: data || {
      email: '',
      username: '',
      age: 0,
      gender: '',
    },
  });

  const onSubmit = async (user: UsersDataType) => {
    try {
      const {
        data: { message },
      } = await mutateAsync(user);

      toast({ variant: 'default', description: message });

      handleClose();
    } catch (error) {
      const { variant, description } = onError(error);

      toast({ variant, description });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField name="email" label="Endereço de e-mail" />
          <InputField name="username" label="Nome" />
          <InputField name="age" label="Idade" type="number" />
          <SelectField
            name="gender"
            options={[
              { value: 'M', label: 'M' },
              { value: 'F', label: 'F' },
            ]}
            label="Sexo"
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <Button type="button" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
