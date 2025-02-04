'use client';

import { ColumnDef } from '@tanstack/react-table';
import UsersDelete from './users-delete';
import UsersDialog from './users-dialog';
import { UsersDataType } from '@/schemas';
import { Dispatch, SetStateAction } from 'react';
import { Table } from '@/components';
import { Button } from '@/components/ui';
import { ArrowUpDown } from 'lucide-react';

interface UsersDataProps {
  refetch: () => void;
  data: UsersDataType[];
  setPagination: Dispatch<
    SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  pagination: { pageIndex: number; pageSize: number };
  total: number;
  handleSortChange: (columnId: string) => void;
  isLoading: boolean;
  isError: boolean;
}

export default function UsersData({
  refetch,
  data,
  setPagination,
  pagination,
  total,
  handleSortChange,
  isLoading,
  isError,
}: UsersDataProps) {
  const columns: ColumnDef<UsersDataType>[] = [
    {
      accessorKey: 'id',
      header: () => {
        return (
          <Button variant="ghost" onClick={() => handleSortChange('id')}>
            ID
            <ArrowUpDown />
          </Button>
        );
      },
      size: 100,
      cell: ({ row }) => <div className="w-[100px]">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'username',
      header: () => {
        return (
          <Button variant="ghost" onClick={() => handleSortChange('username')}>
            Nome
            <ArrowUpDown />
          </Button>
        );
      },
      size: 100,
      cell: ({ row }) => (
        <div className="w-[100px]">{row.getValue('username')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: () => {
        return (
          <Button variant="ghost" onClick={() => handleSortChange('email')}>
            E-mail
            <ArrowUpDown />
          </Button>
        );
      },
      size: 100,
      cell: ({ row }) => (
        <div className="w-[100px]">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'gender',
      header: () => {
        return (
          <Button variant="ghost" onClick={() => handleSortChange('gender')}>
            Sexo
            <ArrowUpDown />
          </Button>
        );
      },
      size: 100,
      cell: ({ row }) => (
        <div className="w-[100px]">{row.getValue('gender')}</div>
      ),
    },
    {
      accessorKey: 'age',
      header: () => {
        return (
          <Button variant="ghost" onClick={() => handleSortChange('age')}>
            Idade
            <ArrowUpDown />
          </Button>
        );
      },
      size: 100,
      cell: ({ row }) => <div className="w-[100px]">{row.getValue('age')}</div>,
    },
    {
      accessorKey: 'edit',
      header: '',
      size: 100,
      cell: ({ row }) => (
        <UsersDialog mode="edit" data={row.original} refetch={refetch} />
      ),
    },
    {
      accessorKey: 'delete',
      header: '',
      size: 100,
      cell: ({ row }) => <UsersDelete id={row.original.id} refetch={refetch} />,
    },
  ];

  return (
    <div className="w-full">
      <div className="rounded-md border">
        {isLoading ? (
          'Cargando...'
        ) : (
          <Table
            columns={columns}
            data={data}
            pagination={pagination}
            setPagination={setPagination}
            total={total}
            isError={isError}
          />
        )}
      </div>
    </div>
  );
}
