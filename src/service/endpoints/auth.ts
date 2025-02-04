import { api } from '../api';

export const AuthApi = {
  login: async ({ email, password }: { email: string; password: string }) => {
    return await api.post('/login', { email, password });
  },
  recoveryPassword: async ({ email }: { email: string }) => {
    return await api.post('/forgot-password', { email });
  },
};
