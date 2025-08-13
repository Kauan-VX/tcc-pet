'use client';
import { useTranslations } from 'next-intl';
import ForgorPasswordForm from '../_components/forgot-password-form';

const ForgotPasswordPage = () => {
  const t = useTranslations('ForgotPassword');

  return (
    <>
      <div className="flex flex-col justify-center align-center p-4 max-w-md mx-auto h-screen">
        <h1 className="text-3xl font-semibold mb-10 text-center">
          {t('title')}
        </h1>
        <ForgorPasswordForm />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
