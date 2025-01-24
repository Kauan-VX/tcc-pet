import { api } from '../api';
import { UsersDataType } from '@/schemas';

export const UserApi = {
  get: async () => {
    return await api.get('/get-users.json');
  },
  save: async (user: UsersDataType) => {
    console.log(user);

    return await api.get('/save-user.json');
  },
  update: async (user: UsersDataType) => {
    console.log(user);

    return await api.get('/update-user.json');
  },
  delete: async ({ id }: { id: number }) => {
    return await api.get('/delete-user.json', {
      params: { id },
    });
  },
};
