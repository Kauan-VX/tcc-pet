import { Metadata } from 'next';

// Configurações base para o site inteiro
const siteConfig = {
  name: 'Boilerplate NextJs',
  description:
    'Um boilerplate moderno para projetos NextJs com as melhores práticas',
  url: 'https://boilerplate-next.example.com',
  ogImage: 'https://boilerplate-next.example.com/opengraph-image.jpg',
  authors: [{ name: 'Equipe Boilerplate' }],
};

// Metatags padrão para o site
export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: siteConfig.authors,
  creator: 'Boilerplate Team',
  publisher: 'Boilerplate Team',
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
    creator: '@boilerplate',
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
