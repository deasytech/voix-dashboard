"use client";

import React from 'react'
import { format } from 'date-fns';

import {
  Column,
  ColumnDef,
  PaginationState,
  Table as TanstackTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { InferSelectModel } from "drizzle-orm";
import { feedbacks, projects } from '@/db/schema';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './ui/button';
import Ratings from './ratings';

type Feedback = InferSelectModel<typeof feedbacks>;

function Table(props: { data: Feedback[] }) {

  const columns = React.useMemo<ColumnDef<Feedback>[]>(
    () => [
      {
        accessorKey: 'userName',
        header: "Name",
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.userEmail,
        id: 'userEmail',
        cell: info => info.getValue(),
        header: () => <span>Email</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.rating,
        id: 'rating',
        cell: info => info.getValue() === null ? 'N/A' : <Ratings rating={info.getValue() as number} count={5} />,
        header: () => <span>Rating</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'message',
        header: () => 'Message',
        footer: props => props.column.id,
        size: 400,
        minSize: 200,
        maxSize: 600,
      },
      {
        accessorKey: 'createdAt',
        header: () => <span>Created At</span>,
        cell: ({ getValue }) => {
          const dateValue = getValue() as string | number;
          const date = new Date(dateValue);
          return <div className="text-nowrap text-sm">{format(date, 'P p')}</div>;
        },
        footer: props => props.column.id,
      },
    ],
    []
  )

  return (
    <MyTable
      {...{
        data: props.data,
        columns,
      }}
    />
  )
}

function MyTable({
  data,
  columns,
}: {
  data: Feedback[]
  columns: ColumnDef<Feedback>[]
}) {
  const [ pagination, setPagination ] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  })

  return (
    <div className="p-2 mt-5">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border-b border-slate-400">
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className="text-left bg-gray-50 p-4 rounded-t-md">
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[ header.column.getIsSorted() as string ] ?? null}
                      {header.column.getCanFilter() ? (
                        <div className="mt-2">
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id} style={{ width: cell.column.getSize() }} className="p-4 border-b">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex justify-between items-center gap-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="w-full flex items-center justify-between gap-2">
            <Button
              className="border rounded bg-gray-50 px-2"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              size="sm"
              variant="outline"
            >
              <ChevronsLeft className="w-5 h-5" />
            </Button>
            <Button
              className="border rounded bg-gray-50 px-2"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              size="sm"
              variant="outline"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              className="border rounded bg-gray-50 px-2"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="sm"
              variant="outline"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button
              className="border rounded bg-gray-50 px-2"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              size="sm"
              variant="outline"
            >
              <ChevronsRight className="w-5 h-5" />
            </Button>
          </div>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border rounded w-16 py-1 px-2 focus:border-transparent focus:outline-none"
            />
          </span>
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
          className="border py-1 px-2 focus:border-transparent focus:outline-none"
        >
          {[ 10, 20, 30, 40, 50 ].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: TanstackTable<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[ 0 ]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2" onClick={e => e.stopPropagation()}>
      <input
        type="number"
        value={(columnFilterValue as [ number, number ])?.[ 0 ] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [ number, number ]) => [
            e.target.value,
            old?.[ 1 ],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded px-2 py-1 placeholder:text-sm focus:ring-0 focus:outline-none focus:border-transparent font-thin"
      />
      <input
        type="number"
        value={(columnFilterValue as [ number, number ])?.[ 1 ] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [ number, number ]) => [
            old?.[ 0 ],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded px-2 py-1 placeholder:text-sm focus:ring-0 focus:outline-none focus:border-transparent font-thin"
      />
    </div>
  ) : (
    <input
      className="w-full shadow rounded px-2 py-1 placeholder:text-sm focus:ring-0 focus:outline-none focus:border-transparent font-thin"
      onChange={e => column.setFilterValue(e.target.value)}
      onClick={e => e.stopPropagation()}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  )
}

export default Table;
