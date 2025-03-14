'use client';
import { useAccessTokenStore } from '@/store';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getAccessToken } = useAccessTokenStore();

  useLayoutEffect(() => {
    if (getAccessToken()) {
      redirect('/home');
    }
  }, []);

  return <section>{children}</section>;
}
