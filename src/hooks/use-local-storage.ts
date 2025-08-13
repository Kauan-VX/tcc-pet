'use client';

import { useCallback, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para armazenar nosso valor
  // Passa a função de inicialização para useState para que a lógica seja executada apenas uma vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Obtém do local storage pelo key
      const item = window.localStorage.getItem(key);
      // Analisa o item armazenado ou retorna initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se ocorrer um erro, também retorna initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Retorna uma versão memorizada da função de setter que ...
  // ... atualiza o state local e o local storage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Permite que o valor seja uma função para que tenhamos a mesma API que useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Salva o state
        setStoredValue(valueToStore);

        // Salva no local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        // Uma implementação mais avançada lidaria com o erro
        console.error(error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue] as const;
}
