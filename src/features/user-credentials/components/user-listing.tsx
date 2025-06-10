import { searchParamsCache } from '@/lib/searchparams';
import UserCredentialsTable from './user-listing-table';

type UserCredentialsPage = {};

export default async function UserCredentialsPage({}: UserCredentialsPage) {
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
    <UserCredentialsTable />
  );
}
