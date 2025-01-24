'use client';

import { useAccessTokenStore } from '@/store';
import { isTokenExpired } from '@/utils';
import { ComponentType } from 'react';
import { redirect } from 'next/navigation';

export const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  return function WithAuth(props: P) {
    const { getAccessToken, logout } = useAccessTokenStore();

    if (getAccessToken() && isTokenExpired(getAccessToken())) {
      logout();

      redirect('/login');
    }

    return <WrappedComponent {...props} />;
  };
};
