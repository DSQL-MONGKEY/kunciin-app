'use client';

import useSWR from "swr";
import { CredentialDataTable } from "./credential-tables";
import { columns } from "./credential-tables/columns";
import { fetcher } from "@/lib/fetcher";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { toast } from "sonner";

export default function UserCredentialsTable() {
   const { data:response, error, isLoading } = useSWR('/api/user-credentials', fetcher);

   if(isLoading) {
      return (
         <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
      );
   }

   const credentialData = response?.data ?? [];
   const totalItems = response?.data.length ?? 0;

   if(error) {
      toast('Error fetching data', {
         description: `details: ${error}`
      })
   }

   return (
      <CredentialDataTable
         data={credentialData}
         totalItems={totalItems}
         columns={columns}
      />
   )
}