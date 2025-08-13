'use client';

import { useEffect, useState } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler para chamar no resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Adicionar event listener
    window.addEventListener('resize', handleResize);

    // Chamar handler imediatamente para que o estado reflita os valores iniciais
    handleResize();

    // Remover event listener no cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
