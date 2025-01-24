import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '@/service/api';

interface UseAccessTokenState {
  accessToken: string;
  setAccessToken: (payload: { accessToken: string }) => void;
  getAccessToken: () => string;
  logout: () => void;
}

export const useAccessTokenStore = create<UseAccessTokenState>()(
  persist(
    (set, get) => ({
      accessToken: '',
      setAccessToken: ({ accessToken }: { accessToken: string }) => {
        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        set({ accessToken });
      },
      getAccessToken: () => get().accessToken,
      logout: () => {
        api.defaults.headers.Authorization = '';

        set({ accessToken: '' });
      },
    }),
    {
      name: 'accessToken',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
