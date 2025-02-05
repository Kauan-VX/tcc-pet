'use client';

// import { useAuthStore } from '@/store';
import { TopBar } from '@/components';
// import { redirect } from 'next/navigation';
// import { useLayoutEffect } from 'react';

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const { getAccessToken } = useAuthStore();

  // useLayoutEffect(() => {
  //   if (!getAccessToken()) {
  //     redirect('/');
  //   }
  // }, []);

  return (
    <section>
      <TopBar />
      {children}
    </section>
  );
};

export default PrivateLayout;
