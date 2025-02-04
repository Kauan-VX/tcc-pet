import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(function (config) {
  const storage = localStorage.getItem('accessToken');

  if (storage) {
    const parsedStorage = JSON.parse(storage);

    if (!parsedStorage.state.accessToken) return config;

    config.headers.Authorization = `Bearer ${parsedStorage.state.accessToken}`;
  }

  return config;
});
