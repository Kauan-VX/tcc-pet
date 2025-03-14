export function formatDateString(
  dateString: string | null | undefined,
  dateStyle: 'short' | 'medium' | 'long' | 'full' = 'medium', // Define um padrão opcional
): string {
  if (!dateString) return 'Data inválida';

  return new Intl.DateTimeFormat('pt-BR', { dateStyle }).format(
    new Date(dateString),
  );
}
