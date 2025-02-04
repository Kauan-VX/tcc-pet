import { api } from '../api';
import { UsersDataType } from '@/schemas';

export const UserApi = {
  get: async ({
    page,
    limit,
    keyword,
    sort,
    desc,
  }: {
    page: number;
    limit: number;
    keyword?: string;
    sort?: string;
    desc?: 'asc' | 'desc';
  }) => {
    return await api.get('/user', {
      params: {
        page,
        limit,
        ...(keyword && { keyword }),
        ...(sort && desc && { orderBy: sort, orderType: desc }),
      },
    });
  },
  save: async (user: UsersDataType) => {
    return await api.post('/user', { user });
  },
  update: async (user: UsersDataType) => {
    return await api.put(`/user/${user.id}`, { user });
  },
  delete: async ({ id }: { id: number }) => {
    return await api.delete(`/user/${id}`);
  },
};
