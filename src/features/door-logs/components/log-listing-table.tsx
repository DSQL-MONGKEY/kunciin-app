'use client';

import useSWR from "swr";
import { LogDataTable } from "./log-tables";
import { columns } from "./log-tables/columns";
import { fetcher } from "@/lib/fetcher";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { toast } from "sonner";

export default function RegisterListingTable() {
   const { data:response, error, isLoading } = useSWR('/api/door-logs', fetcher);

   if(isLoading) {
      return (
         <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
      );
   }

   const logData = response?.data ?? [];
   const totalItems = response?.data.length ?? 0;

   if(error) {
      toast('Error fetching data', {
         description: `details: ${error}`
      })
   }

   return (
      <LogDataTable
         data={logData}
         totalItems={totalItems}
         columns={columns}
      />
   )
}