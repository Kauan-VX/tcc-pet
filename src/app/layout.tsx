import { StructuredData } from '@/components/structured-data';
import { GoogleAnalytics } from '@/lib/analytics';
import { AuthProvider } from '@/lib/auth-context';
import { createMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import './globals.css';
import QueryProvider from './query-provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = createMetadata({
  title: 'Adota Match - A melhor plataforma de adoção de pets do Brasil',
  description:
    'Encontre seu companheiro ideal na maior plataforma de adoção responsável do Brasil. Cães e gatos castrados, vacinados e carinhosos esperando por uma família. Adote com amor e responsabilidade no Adota Match.',
  keywords:
    'adoção pets brasil, adotar cachorro, adotar gato, pets para adoção, adoção responsável, cães disponíveis adoção, gatos disponíveis adoção, ongs animais, resgate animal, amor incondicional pets',
  path: '/',
  noIndex: false,
});

export default async function LocaleLayout({ children }: Props) {
  const locale = await getLocale();

  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <StructuredData />
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
