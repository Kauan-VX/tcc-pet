import { defaultMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import QueryProvider from './query-provider';
import './styles/globals.css';

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

export const metadata: Metadata = defaultMetadata;

export default async function LocaleLayout({ children }: Props) {
  const locale = await getLocale();

  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
