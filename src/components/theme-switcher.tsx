import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Evita renderizar conteúdo dependente do tema antes da hidratação
    return (
      <button
        className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
        aria-label="Alternar tema"
        style={{ visibility: 'hidden' }}
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
    </button>
  );
};

export default ThemeSwitcher;
