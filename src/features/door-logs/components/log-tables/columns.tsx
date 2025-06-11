'use client';
import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, XCircle } from 'lucide-react';
import { CellAction } from './cell-action';
import { formatDate } from '@/lib/format';
import { DoorLogs } from '@/types';

export const columns: ColumnDef<DoorLogs>[] = [
  {
    id: 'climber_users.name',
    accessorKey: 'fingerprint_id',
    header: 'Fingerprin ID',
    cell: ({ row }) => (
      <div>
        {row.original.fingerprint_id}
      </div>
    ),
    enableColumnFilter: true,
  },
  {
    id: 'rfid_uid',
    accessorKey: 'rfid_uid',
    header: 'rfid_uid',
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.original.rfid_uid}
      </div>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'access_granted',
    header: 'Access Status',
    cell: ({ cell }) => {
      const status = cell.getValue<DoorLogs['access_granted']>();
      const Icon = status ? CheckCircle2 : XCircle;
      
      return (
        <Badge variant={status ? 'default' : 'destructive'}>
          <>
            <Icon />
            {status ? 'Granted' : 'Unverified'}
          </>
        </Badge>
      )
    },
    enableColumnFilter: true,
  },
  {
    id: 'created_at',
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ cell }) => {
      const formattedDate = formatDate(cell.getValue<DoorLogs['created_at']>() ?? undefined, {
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
