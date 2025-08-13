'use client';

import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

// Tipagem para o gtag do Google Analytics
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      parameters: Record<string, unknown>,
    ) => void;
  }
}

export function PerformanceMetrics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Reportar métricas Web Vitals
      const reportWebVitals = (metric: Metric) => {
        // Aqui você pode enviar para qualquer serviço de analytics
        console.log(`Web Vitals: ${metric.name}`, {
          value: metric.delta || metric.value,
          id: metric.id,
        });

        // Exemplo enviando para Google Analytics (se configurado)
        if (window.gtag) {
          window.gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(
              metric.name === 'CLS' ? metric.delta * 1000 : metric.delta,
            ),
            non_interaction: true,
          });
        }
      };

      // Adicionar listener quando web-vitals estiver disponível
      if ('performance' in window) {
        import('web-vitals').then(({ onCLS, onINP, onLCP, onTTFB }) => {
          onCLS(reportWebVitals);
          onINP(reportWebVitals); // Substituiu onFID por onINP
          onLCP(reportWebVitals);
          onTTFB(reportWebVitals);
        });
      }
    }
  }, []);

  return null;
}
