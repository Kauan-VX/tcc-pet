'use client';

import { useAccessTokenStore } from '@/store';
import { TopBar } from '@/components';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { getAccessToken } = useAccessTokenStore();

  useLayoutEffect(() => {
    if (!getAccessToken()) {
      redirect('/');
    }
  }, []);

  return (
    <section>
      <TopBar />
      {children}
    </section>
  );
};

export default PrivateLayout;
