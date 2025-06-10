'use client';

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod";
import { IconHandClick } from "@tabler/icons-react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { formatDate } from "@/lib/format";
import { addCredentials } from "../api/add-credentials";
import { mutate } from "swr";

const formSchema = z.object({
   fingerprintId: z.number().min(1, {
      message: 'Name must be at least 1 characters.'
   }),
   rfId: z.string().min(1, {
      message: 'Total ml must be at least 1.'
   }),
})


export function UserCredentialsSheetForm() {

   const defaultValues = {
      fingerprintId: 0,
      rfId: '',
   };

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      values: defaultValues
   });

   async function onSubmit(values: z.infer<typeof formSchema>) {
      const response = await addCredentials({...values});

      const result = await response;

      if(!result.success) {
         toast('Request Failed', {
            duration: 4000,
            description: result.error || 'Terjadi kesalahan validasi'
         });
         return
      }
      const data = result.data;

      const formattedDate = formatDate(data.created_at,  {
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric',
         hour12: false,
      });

      mutate('/api/user-credentials');
      toast('Request Successfully', {
         duration: 5000,
         description: formattedDate,
      })
   }

   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button variant="default">
               <IconHandClick/>
               Create
            </Button>
         </SheetTrigger>
         <SheetContent>
         <SheetHeader>
            <SheetTitle>Holaa, kunciiners!</SheetTitle>
            <SheetDescription>
               Fill the your fingerprint-ID and RF-ID...
            </SheetDescription>
         </SheetHeader>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
               <SheetClose asChild>
                     <Button type="submit" className="mt-5 float-end mx-4">Add</Button>
               </SheetClose>
            </form>
         </Form>
         <SheetFooter>
            <SheetClose asChild>
               <Button variant="outline">Cancel</Button>
            </SheetClose>
         </SheetFooter>
         </SheetContent>
      </Sheet>
   )
}