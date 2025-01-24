'use client';
import UsersHeader from './_components/users-header';
import UsersTable from './_components/users-table';

const Users = () => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-5 mt-2 w-full">
        <UsersHeader />
        <UsersTable />
      </div>
    </>
  );
};

export default Users;
