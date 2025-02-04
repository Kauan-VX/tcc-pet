'use client';

import { Input } from '@/components/ui';
import UsersDialog from './users-dialog';
import { ChangeEvent } from 'react';

interface UsersHeader {
  refetch: () => void;
  filters: string;
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UsersHeader = ({ refetch, filters, handleFilterChange }: UsersHeader) => {
  return (
    <div className="flex items-center justify-between w-full mb-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Pesquisar..."
          value={filters}
          onChange={(e) => handleFilterChange(e)}
          className="max-w-sm"
        />
      </div>

      <UsersDialog mode="add" refetch={refetch} />
    </div>
  );
};

export default UsersHeader;
