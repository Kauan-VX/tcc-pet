'use client';
import { useAuthStore } from '@/store';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getAccessToken } = useAuthStore();

  useLayoutEffect(() => {
    if (getAccessToken()) {
      redirect('/dashboard');
    }
  }, []);

  return <section>{children}</section>;
}
