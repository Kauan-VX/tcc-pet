import { Metadata } from 'next';

// Configurações base para o site inteiro
const siteConfig = {
  name: 'Adota Match - Adoção Responsável de Pets',
  description:
    'A plataforma mais completa para adoção responsável de cães e gatos no Brasil. Conectamos famílias com pets que precisam de um lar, usando inteligência artificial para matches perfeitos.',
  url: 'https://adotamatch.com.br',
  ogImage: 'https://adotamatch.com.br/og-image-adota-match.jpg',
  authors: [{ name: 'Adota Match Team', url: 'https://adotamatch.com.br' }],
};

// Metatags padrão para o site
export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'adoção de pets',
    'adoção de cães',
    'adoção de gatos',
    'adoção responsável',
    'pets para adoção',
    'cachorros para adotar',
    'gatos para adotar',
    'ONGs de animais',
    'resgate animal',
    'amor animal',
    'cuidados com pets',
    'castração',
    'microchipagem',
    'doação de animais',
    'família pet',
  ],
  authors: siteConfig.authors,
  creator: 'Adota Match Team',
  publisher: 'Adota Match',
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@adotamatch',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Função para gerar metatags para páginas específicas
export function createMetadata(config: {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const { title, description, keywords, path = '', noIndex = false } = config;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: `${path}`,
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: `${siteConfig.url}${path}`,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: !noIndex,
      follow: true,
    },
  };
}
