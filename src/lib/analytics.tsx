'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>,
    ) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_location: url,
      });
    }
  }, [pathname, searchParams]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_location: window.location.href,
              send_page_view: false
            });
          `,
        }}
      />
    </>
  );
}

// Função para tracking de eventos personalizado
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {},
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters,
    });
  }
};

// Eventos específicos do Adota Match
export const trackPetView = (petId: string, petName: string) => {
  trackEvent('pet_view', {
    event_category: 'pet_interaction',
    pet_id: petId,
    pet_name: petName,
  });
};

export const trackApplicationSubmit = (petId: string, adopterId: string) => {
  trackEvent('application_submit', {
    event_category: 'adoption',
    pet_id: petId,
    adopter_id: adopterId,
  });
};

export const trackMatchFound = (
  petId: string,
  adopterId: string,
  matchPercentage: number,
) => {
  trackEvent('match_found', {
    event_category: 'matching',
    pet_id: petId,
    adopter_id: adopterId,
    match_percentage: matchPercentage,
  });
};
