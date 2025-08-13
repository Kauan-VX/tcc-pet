import { Metadata } from 'next';
import LoginPage from './_components/login-page';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Faça login no Boilerplate',
  description:
    'Entre na sua conta Boilerplate e acesse todos os recursos disponíveis.',
  keywords:
    'login boilerplate, entrar boilerplate, acesso boilerplate, boilerplate next.js',
  path: '/login',
  noIndex: false,
});

export default function Page() {
  return <LoginPage />;
}
