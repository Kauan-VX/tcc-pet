import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import './styles/globals.scss';
import QueryProvider from './query-provider';
import { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: 'Boilerplate NextJs',
  description: 'Boilerplate NextJs',
};

export default async function LocaleLayout({ children }: Props) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
