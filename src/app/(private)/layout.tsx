'use client';

import { Navbar } from '@/components/ui/navbar';
import { withAuth } from '@/hoc/with-auth';
import { useAccessTokenStore } from '@/store';
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
      redirect('/login');
    }
  });

  return (
    <section className="container mx-auto">
      <Navbar />
      {children}
    </section>
  );
};

export default withAuth(PrivateLayout);
