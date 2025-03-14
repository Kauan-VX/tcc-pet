import { api } from '../api';
import { Md5 } from 'ts-md5';

export const AuthApi = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const md5 = Md5.hashStr(password).toUpperCase();

    return await api.post('adminweb/auth-admin/', { email, password: md5 });
  },
  recoveryPassword: async ({ email }: { email: string }) => {
    console.log(email);

    return await api.get('/forgot-password.json');
  },
};
