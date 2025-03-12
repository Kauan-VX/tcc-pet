'use client';
import { useTranslations } from 'next-intl';

import LoginForm from './_components/login-form';

const Login = () => {
  const t = useTranslations('LoginPage');
  return (
    <>
      <div className="flex flex-col justify-center align-center p-4 max-w-md mx-auto h-screen">
        <h1 className="text-3xl font-semibold mb-10 text-center">
          {t('title')}
        </h1>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
