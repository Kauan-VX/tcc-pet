import { Metadata } from 'next';

// Meta tags adicionais para SEO específicas do nicho de adoção de pets
export function generatePetAdoptionMetadata(
  overrides: Partial<Metadata> = {},
): Metadata {
  const baseMetadata: Metadata = {
    other: {
      // Meta tags específicas para pets/animais
      'pet-friendly': 'true',
      'adoption-platform': 'true',
      'animal-welfare': 'responsible',

      // Facebook App ID (caso tenha)
      'fb:app_id': 'your-facebook-app-id',

      // Apple-specific meta tags
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'Adota Match',

      // Microsoft Tile
      'msapplication-TileColor': '#10b981',
      'msapplication-config': '/browserconfig.xml',

      // Pinterest Rich Pins
      'article:author': 'Adota Match Team',
      'article:publisher': 'https://adotamatch.com.br',

      // Schema.org markup for Local Business
      'schema:type': 'LocalBusiness',
      'schema:name': 'Adota Match',
      'schema:description': 'Plataforma de adoção responsável de pets',
      'schema:url': 'https://adotamatch.com.br',
      'schema:telephone': '+55-11-99999-9999',
      'schema:address': 'São Paulo, SP, Brasil',
    },

    // Verificação de propriedade para ferramentas de webmaster
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
      other: {
        bing: 'your-bing-verification-code',
        facebook: 'your-facebook-verification-code',
        pinterest: 'your-pinterest-verification-code',
      },
    },

    // Configurações de idioma
    alternates: {
      languages: {
        'pt-BR': 'https://adotamatch.com.br',
        'en-US': 'https://adotamatch.com.br/en',
      },
    },

    // Configurações de categoria
    category: 'Pets & Animals',

    // Configurações de aplicativo
    applicationName: 'Adota Match',

    // Configurações de referrer
    referrer: 'origin-when-cross-origin',
  };

  return {
    ...baseMetadata,
    ...overrides,
    other: {
      ...baseMetadata.other,
      ...overrides.other,
    },
  };
}

// Metadata específica para páginas de pets
export function generatePetPageMetadata(pet: {
  name: string;
  breed: string;
  age: string;
  description: string;
  location: string;
  id: string;
}): Metadata {
  return generatePetAdoptionMetadata({
    title: `${pet.name} - ${pet.breed} para adoção | Adota Match`,
    description: `Conheça ${pet.name}, um(a) ${pet.breed} de ${pet.age} disponível para adoção em ${pet.location}. ${pet.description}`,
    keywords: [
      `adotar ${pet.breed.toLowerCase()}`,
      `${pet.name} adoção`,
      `pets ${pet.location}`,
      'adoção responsável',
      pet.breed.toLowerCase(),
    ],
    openGraph: {
      title: `${pet.name} - Disponível para Adoção`,
      description: `${pet.breed} • ${pet.age} • ${pet.location}`,
      type: 'article',
      url: `https://adotamatch.com.br/pets/${pet.id}`,
    },
    twitter: {
      title: `${pet.name} precisa de um lar! 🐕💕`,
      description: `${pet.breed} de ${pet.age} disponível para adoção em ${pet.location}`,
    },
  });
}

// Metadata para páginas de instituições
export function generateInstitutionMetadata(institution: {
  name: string;
  location: string;
  description: string;
  id: string;
}): Metadata {
  return generatePetAdoptionMetadata({
    title: `${institution.name} - Adoção de Pets em ${institution.location} | Adota Match`,
    description: `Conheça ${institution.name} em ${institution.location}. ${institution.description} Veja pets disponíveis para adoção.`,
    keywords: [
      `ong pets ${institution.location}`,
      `adoção ${institution.location}`,
      institution.name,
      'instituição resgate animal',
    ],
    openGraph: {
      title: `${institution.name}`,
      description: `Instituição de resgate animal em ${institution.location}`,
      type: 'website',
    },
  });
}
