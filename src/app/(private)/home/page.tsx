import { createMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import HomePage from './_components/home-page';

export const metadata: Metadata = createMetadata({
  title: 'Dashboard - Adota Match | Sua jornada de adoção',
  description:
    'Acesse seu painel personalizado no Adota Match. Veja pets compatíveis com seu perfil, acompanhe candidaturas e encontre seu novo melhor amigo de forma responsável.',
  keywords:
    'dashboard adoção pets, painel adotante, perfil adoção, pets compatíveis, candidaturas adoção, matching pets, adoção responsável dashboard',
  path: '/home',
  noIndex: false,
});

export default function Page() {
  return <HomePage />;
}
