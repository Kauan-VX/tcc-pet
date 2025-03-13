import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '@/service/api';

interface UseAuthProps {
  accessToken: string;
  refreshToken: string;
  setRefreshToken: (payload: { refreshToken: string }) => void;
  getRefreshToken: () => string;
  setAccessToken: (payload: { accessToken: string }) => void;
  getAccessToken: () => string;
  logout: () => void;
}

export const useAuthStore = create<UseAuthProps>()(
  persist(
    (set, get) => ({
      accessToken: '',
      refreshToken: '',
      setRefreshToken: ({ refreshToken }: { refreshToken: string }) => {
        set({ refreshToken });
      },
      getRefreshToken: () => get().refreshToken,
      setAccessToken: ({ accessToken }: { accessToken: string }) => {
        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        set({ accessToken });
      },
      getAccessToken: () => get().accessToken,
      logout: () => {
        api.defaults.headers.Authorization = '';

        set({ accessToken: '', refreshToken: '' });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
