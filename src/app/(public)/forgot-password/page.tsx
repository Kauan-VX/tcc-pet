import { Metadata } from 'next';
import ForgotPasswordPage from './_components/forgot-password-page';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Recupere sua senha do Boilerplate',
  description:
    'Esqueceu sua senha do Boilerplate? Recupere facilmente o acesso à sua conta com nosso processo seguro de recuperação de senha.',
  keywords:
    'recuperar senha boilerplate, esqueci senha boilerplate, redefinir senha boilerplate',
  path: '/forgot-password',
  noIndex: false,
});

export default function Page() {
  return <ForgotPasswordPage />;
}
