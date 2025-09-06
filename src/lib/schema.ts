export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Adota Match',
    description:
      'A maior plataforma de adoção responsável de pets do Brasil. Conectamos famílias com cães e gatos que precisam de um lar.',
    url: 'https://adotamatch.com.br',
    logo: 'https://adotamatch.com.br/logo-adota-match.png',
    sameAs: [
      'https://www.facebook.com/adotamatch',
      'https://www.instagram.com/adotamatch',
      'https://twitter.com/adotamatch',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-11-99999-9999',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Adota Match',
    description:
      'Plataforma de adoção responsável de pets. Encontre cães e gatos para adoção.',
    url: 'https://adotamatch.com.br',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://adotamatch.com.br/buscar?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generatePetSchema(pet: {
  name: string;
  breed: string;
  age: string;
  description: string;
  images: string[];
  location: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pet.name,
    description: pet.description,
    category: 'Pet para Adoção',
    brand: {
      '@type': 'Organization',
      name: 'Adota Match',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    image: pet.images,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Raça',
        value: pet.breed,
      },
      {
        '@type': 'PropertyValue',
        name: 'Idade',
        value: pet.age,
      },
      {
        '@type': 'PropertyValue',
        name: 'Localização',
        value: pet.location,
      },
    ],
  };
}
