   import PageContainer from '@/components/layout/page-container';
   import { Heading } from '@/components/ui/heading';
   import { Separator } from '@/components/ui/separator';
   import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import UserCredentialsPage from '@/features/user-credentials/components/user-listing';
import { UserCredentialsSheetForm } from '@/features/user-credentials/components/user-sheet-form';
   import { searchParamsCache } from '@/lib/searchparams';
   import { SearchParams } from 'nuqs/server';
   import { Suspense } from 'react';

   export const metadata = {
   title: 'Dashboard: User Credentials'
   };

   type pageProps = {
   searchParams: Promise<SearchParams>;
   };

   export default async function Page(props: pageProps) {
   const searchParams = await props.searchParams;
   // Allow nested RSCs to access the search params (in a type-safe way)
   searchParamsCache.parse(searchParams);

   // This key is used for invoke suspense if any of the search params changed (used for filters).
   // const key = serialize({ ...searchParams });

      return (
         <PageContainer scrollable={false} >
            <div className='flex flex-1 flex-col space-y-4'>
            <div className='flex items-start justify-between'>
               <Heading
                  title='Credentials'
                  description='Add and monitorize user credentials'
               />
               <UserCredentialsSheetForm />
            </div>
            <Separator />
            <Suspense
            // key={key}
               fallback={
                  <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
               }
            >
               <UserCredentialsPage />
            </Suspense>
            </div>
         </PageContainer>
      );
   }