import { searchParamsCache } from '@/lib/searchparams';
import LogListingTable from './log-listing-table';

type LogListingPage = {};

export default async function LogListingPage({}: LogListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  return (
    <LogListingTable />
  );
}
