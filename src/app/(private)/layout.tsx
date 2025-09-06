'use client';

import { withAuth } from '@/hoc/with-auth';
import { useAccessTokenStore } from '@/store';

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { getAccessToken } = useAccessTokenStore();

  // useLayoutEffect(() => {
  //   if (!getAccessToken()) {
  //     redirect('/login');
  //   }
  // });

  return <section className="container mx-auto">{children}</section>;
};

export default withAuth(PrivateLayout);
