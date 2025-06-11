'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { UpdateModal } from '@/components/modal/update-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserCredentials } from '@/types';
import { IconEdit, IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { updateCredentials } from '../../api/update-logs';

interface CellActionProps {
  data: UserCredentials;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const onConfirm = async () => {
    setOpen(!open);
    const res = await fetch(`/api/door-logs/${data.id}`, {
      method: 'DELETE',
    });
    const { success } = await res.json();

    if(success) {
      mutate('/api/user-credentials');
    }

    toast(success ? 'Deleted Successfully' : 'Failed Process', {
      description: success ? 'Record has been deleted' : 'Record not deleted'
    });
  };

  const onConfirmUpdate = async (values: any) => {
    setOpenUpdate(!openUpdate);

    const res = await updateCredentials({...values}, data.id);
    const { success } = await res;

    if(success) {
      mutate('/api/door-logs');
    }

    toast(success ? 'Update Successfully' : 'Failed Process', {
      description: success ? 'Record has been updated' : 'Record not updated'
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <UpdateModal
        isOpen={openUpdate}
        onClose={() => setOpenUpdate(false)}
        onConfirmUpdate={onConfirmUpdate}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setOpenUpdate(true)}
          >
            <IconEdit className='mr-2 h-4 w-4' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <IconTrash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
