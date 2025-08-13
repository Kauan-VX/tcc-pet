'use client';

import { useEffect } from 'react';

export function PerformanceMetrics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Reportar métricas Web Vitals
      const reportWebVitals = ({ name, delta, value, id }: any) => {
        // Aqui você pode enviar para qualquer serviço de analytics
        console.log(`Web Vitals: ${name}`, {
          value: delta || value,
          id,
        });

        // Exemplo enviando para Google Analytics (se configurado)
        if (window.gtag) {
          window.gtag('event', name, {
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(name === 'CLS' ? delta * 1000 : delta),
            non_interaction: true,
          });
        }
      };

      // Adicionar listener quando web-vitals estiver disponível
      if ('performance' in window) {
        import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB }) => {
          onCLS(reportWebVitals);
          onFID(reportWebVitals);
          onLCP(reportWebVitals);
          onTTFB(reportWebVitals);
        });
      }
    }
  }, []);

  return null;
}
