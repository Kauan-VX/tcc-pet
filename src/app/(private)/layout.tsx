'use client';

import { useAccessTokenStore } from '@/store';
import TopBar from '@/components/top-bar';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { withAuth } from '@/hoc/with-auth';

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { getAccessToken } = useAccessTokenStore();

  useLayoutEffect(() => {
    if (!getAccessToken()) {
      redirect('/login');
    }
  }, []);

  return (
    <section>
      <TopBar />
      {children}
    </section>
  );
};

export default withAuth(PrivateLayout);
