import axios from 'axios';
import { AuthApi } from './endpoints';
import { useAuthStore } from '@/store';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(function (config) {
  const storage = localStorage.getItem('auth');

  if (storage) {
    const parsedStorage = JSON.parse(storage);

    if (!parsedStorage.state.accessToken) return config;

    config.headers.Authorization = `Bearer ${parsedStorage.state.accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status !== 401) return Promise.reject(error);

    const { refreshToken, logout, setAccessToken, setRefreshToken } =
      useAuthStore.getState();

    if (!refreshToken) return Promise.reject(error);

    const response = await AuthApi.refresh({
      token: refreshToken,
    });

    if (response.status === 401) {
      logout();

      return Promise.reject(error);
    }

    setAccessToken({ accessToken: response.data.accessToken });
    setRefreshToken({ refreshToken: response.data.refreshToken });

    error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;

    return api(error.config);
  },
);
