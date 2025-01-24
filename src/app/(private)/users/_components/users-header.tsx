'use client';

import UsersDialog from './users-dialog';

const UsersHeader = () => {
  return (
    <div className="flex items-center justify-between w-full mb-4">
      <h1 className="text-2xl font-semibold text-gray-800">Usuários</h1>
      <UsersDialog mode="add" />
    </div>
  );
};

export default UsersHeader;
