'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { formatDate } from '@/lib/format';
import { UserCredentials } from '@/types';
import { Badge } from '@/components/ui/badge';



export const columns: ColumnDef<UserCredentials>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }: { column: Column<UserCredentials, unknown> }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.original.id}
      </div>
    ),
    enableColumnFilter: true,
  },
  {
    id: 'fingerprint_id',
    accessorKey: 'fingerprint_id',
    header: ({ column }: { column: Column<UserCredentials, unknown> }) => (
      <DataTableColumnHeader column={column} title='Fingerprint ID' />
    ),
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.original.fingerprint_id}
      </div>
    ),
    enableColumnFilter: true,
  },
  {
    id: 'rfid_uid',
    accessorKey: 'rfid_uid',
    header: ({ column }: { column: Column<UserCredentials, unknown> }) => (
      <DataTableColumnHeader column={column} title='RFID' />
    ),
    cell: ({ row }) => (
      <Badge variant={'default'}>
        {row.original.rfid_uid}
      </Badge>
    ),
    enableColumnFilter: true,
  },
  
  {
    id: 'created_at',
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ cell }) => {
      const formattedDate = formatDate(cell.getValue<UserCredentials['created_at']>() ?? undefined, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      });
      return (
        <span>{formattedDate}</span>
      )
    },
    enableColumnFilter: true,
  },
  {
    id: 'actions',
    header: 'More',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
