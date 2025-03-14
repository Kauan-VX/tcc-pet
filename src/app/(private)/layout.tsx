'use client';

import { useAccessTokenStore } from '@/store';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { withAuth } from '@/hoc/with-auth';
import { Navbar } from '@/components/ui/navbar';
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
    <section className="container mx-auto">
      <Navbar />
      {children}
    </section>
  );
};

export default withAuth(PrivateLayout);
