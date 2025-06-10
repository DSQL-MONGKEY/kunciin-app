'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface UpdatetModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirmUpdate: (values: z.infer<typeof formSchema>) => void;
   loading: boolean;
}

const formSchema = z.object({
   fingerprintId: z.number().min(1, {
      message: 'Name must be at least 1 characters.'
   }),
   rfId: z.string().min(1, {
      message: 'Total ml must be at least 1.'
   }),
})

export const UpdateModal: React.FC<UpdatetModalProps> = ({
   isOpen,
   onClose,
   onConfirmUpdate,
   loading,
}) => {
   const [isMounted, setIsMounted] = useState(false);

   const defaultValues = {
         fingerprintId: 0,
         rfId: '',
      };
   
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      values: defaultValues
   });

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) {
      return null;
   }

   return (
      <Modal
         title='Update Credential Data'
         description='Carefully to take this action yea...'
         isOpen={isOpen}
         onClose={onClose}
      >
         <div className='flex w-full flex-col md:flex-row gap-5 items-center justify-center space-x-2 pt-6'>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onConfirmUpdate)}>
                  <div className="grid flex-1 auto-rows-min gap-6 px-4">
                     <FormField
                        control={form.control}
                        name='fingerprintId'
                        render={({ field }) => (
                           <FormItem>
                           <FormLabel>Fingerprint-ID</FormLabel>
                           <FormControl>
                              <Input
                                 type="number"
                                 placeholder='Enter id'
                                 onChange={(e) => field.onChange(Number(e.target.value))}
                                 />
                           </FormControl>
                           <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name='rfId'
                        render={({ field }) => (
                           <FormItem>
                           <FormLabel>RFID</FormLabel>
                           <FormControl>
                              <Input 
                                 placeholder='Enter unique code'
                                 value={field.value}
                                 onChange={(e) => field.onChange(e.target.value)}
                              />
                           </FormControl>
                           <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <p className='text-foreground opacity-50 text-sm px-4 my-3'>
                     Make sure your fingerprint and rfid credentials correct!
                  </p>
               <div className='flex gap-3 w-full justify-center'>
                  <Button disabled={loading} variant='outline' onClick={onClose}>
                     Cancel
                  </Button>
                  <Button disabled={loading} variant='default'>
                     Continue
                  </Button>
               </div>
               </form>
            </Form>
         </div>
      </Modal>
   );
};
