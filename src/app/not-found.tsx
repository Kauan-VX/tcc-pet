import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = createMetadata({
  title: 'Página não encontrada - Adota Match',
  description:
    'A página que você está tentando acessar não foi encontrada. Volte para o Adota Match e continue sua jornada de adoção responsável de pets.',
  keywords: '404, página não encontrada, erro, adota match, adoção pets',
  path: '/not-found',
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center pb-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Página não encontrada
          </h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-900 mb-4">404</div>
            <p className="text-gray-600 mb-6">
              A página que você está procurando não existe ou foi movida.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                Voltar ao início
              </Button>
            </Link>

            <Link href="/contact" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                Entre em contato
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/help"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Precisa de ajuda?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
