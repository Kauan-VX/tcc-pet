'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui';
import { Button } from '@/components';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UserApi } from '@/service/endpoints';
import { onError } from '@/utils';
import { useToast } from '@/hooks/use-toast';

interface UsersDelete {
  id: number;
  refetch: () => void;
}

export default function UsersDelete({ id, refetch }: UsersDelete) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: UserApi.delete,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    refetch();
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const {
        data: { message },
      } = await mutateAsync({ id });

      toast({ variant: 'default', description: message });
      handleClose();
    } catch (error) {
      const { description, variant } = onError(error);
      toast({ variant, description });
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="h-8 w-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
        title="Excluir"
      >
        <X />
      </Button>
      {open && (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleClose}>
                Cancelar
              </AlertDialogCancel>
              <Button onClick={handleSubmit} isLoading={isLoading}>
                Continuar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
