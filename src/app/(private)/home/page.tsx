import { Metadata } from 'next';
import HomePage from './_components/home-page';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Dashboard - Boilerplate NextJs',
  description:
    'Página inicial do seu projeto Boilerplate NextJs. Acesse facilmente todos os recursos e funcionalidades disponíveis.',
  keywords:
    'dashboard boilerplate, nextjs dashboard, painel administrativo, boilerplate nextjs',
  path: '/home',
  noIndex: false,
});

export default function Page() {
  return <HomePage />;
}
