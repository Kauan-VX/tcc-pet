'use client';
import { useQuery } from '@tanstack/react-query';
import UsersHeader from './_components/users-header';
import UsersTable from './_components/users-table';
import { UserApi } from '@/service/endpoints';
import { useUser } from '@/hooks/use-user';

const Users = () => {
  const {
    pagination,
    setPagination,
    sortBy,
    handleSortChange,
    filters,
    handleFilterChange,
    filterDebounce,
  } = useUser();

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['users', sortBy, filterDebounce, pagination],
    queryFn: () =>
      UserApi.get({
        page: pagination.pageIndex,
        limit: pagination.pageSize,
        keyword: filterDebounce,
        ...(sortBy && { sort: sortBy.id, desc: sortBy.desc }),
      }),
    keepPreviousData: true,
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 mt-2 w-full">
      <UsersHeader
        refetch={refetch}
        filters={filters}
        handleFilterChange={handleFilterChange}
      />

      <UsersTable
        handleSortChange={handleSortChange}
        refetch={refetch}
        data={data?.data.data}
        setPagination={setPagination}
        pagination={pagination}
        total={data?.data.total}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Users;
