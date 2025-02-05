'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui';
import { Dispatch, SetStateAction, useState } from 'react';
import { Pagination } from './pagination';
import { Card, CardContent, CardFooter } from './ui/card'; // Importe os componentes do Card do shadcn/ui

interface TableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  setPagination: Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
  pagination: { pageIndex: number; pageSize: number };
  total: number;
  isError: boolean;
}

export const Table = ({
  columns,
  data,
  setPagination,
  pagination,
  total,
  isError,
}: TableProps) => {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  const table = useReactTable({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    pageCount: Math.ceil(total / pagination.pageSize),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
  });

  const toggleViewMode = (type: 'table' | 'card') => {
    setViewMode(type);
  };

  return (
    <>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => toggleViewMode('card')}
          className={`px-4 py-2 rounded ${
            viewMode === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          CARD
        </button>
        <button
          onClick={() => toggleViewMode('table')}
          className={`px-4 py-2 rounded ${
            viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          TABELA
        </button>
      </div>

      {viewMode === 'table' ? (
        <TableComponent>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!isError && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {(!isError && 'Sem dados') ||
                    (isError && 'Erro ao carregar dados')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableComponent>
      ) : (
        <div className="flex flex-col gap-4">
          {!isError && data?.length ? (
            data.map((item, index) => (
              <Card key={index} className="shadow-md">
                <CardContent>
                  {columns.map((column) => (
                    <div key={column.id} className="mb-2">
                      <strong>{column.header}</strong>:
                      {item[column.accessorKey]}
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">ID: {item.id}</p>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-4 text-center">
                {(!isError && 'Sem dados') ||
                  (isError && 'Erro ao carregar dados')}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {!isError && <Pagination page={pagination.pageIndex} table={table} />}
    </>
  );
};
