'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import UsersForm from './users-form';
import { Pen, Plus } from 'lucide-react';
import { useState } from 'react';
import { UsersDataType } from '@/schemas';

interface UsersDialog {
  mode: 'edit' | 'add';
  data?: UsersDataType;
}

export default function UsersDialog({ mode, data }: UsersDialog) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        className={`h-8 w-8 flex items-center justify-center rounded-full ${mode === 'add' ? 'bg-blue-300 text-blue-800 hover:bg-blue-400' : 'bg-green-300 text-green-800 hover:bg-green-400'}`}
        title={mode === 'add' ? 'Adicionar' : 'Editar'}
      >
        {mode === 'add' ? <Plus /> : <Pen />}
      </Button>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {mode === 'add' ? 'Adicionar' : 'Editar'}
              </DialogTitle>
            </DialogHeader>
            <UsersForm data={data} handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
