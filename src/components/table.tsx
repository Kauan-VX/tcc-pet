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
import { Dispatch, SetStateAction } from 'react';
import { Pagination } from './pagination';

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

  return (
    <>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {(!isError && 'Sem dados') ||
                  (isError && 'Erro ao carregar dados')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableComponent>
      {!isError && <Pagination page={pagination.pageIndex} table={table} />}
    </>
  );
};
