# Migração para Tailwind CSS v4

Este documento descreve as mudanças realizadas na migração do boilerplate de Tailwind CSS v3 para v4.

## Principais Mudanças

### 1. Configuração de Pacotes

**Removido:**

- `autoprefixer` - Não é mais necessário
- `postcss` - Versão anterior removida
- `tailwindcss-animate` - Animações agora são built-in

**Adicionado:**

- `@tailwindcss/postcss@^4.0.0-alpha.37` - Plugin PostCSS para Tailwind v4
- `tailwindcss@^4.0.0-alpha.37` - Tailwind CSS v4

### 2. Estrutura de Configuração

**Arquivo removido:**

- `tailwind.config.ts` - Configuração antiga em TypeScript

**Arquivo criado:**

- `tailwind.config.css` - Nova configuração em CSS usando `@theme`

**Arquivo atualizado:**

- `postcss.config.mjs` - Atualizado para usar `@tailwindcss/postcss`

### 3. Sistema de Cores

A migração mantém todas as cores personalizadas do projeto, mas com as seguintes mudanças:

- **Formato de cores:** Migração de HSL para OKLCH para melhor gerenciamento de cores
- **Variáveis CSS:** Prefixo alterado de `--background` para `--color-background`
- **Dark mode:** Suporte mantido tanto para `prefers-color-scheme` quanto para classe `.dark`

### 4. Importação de Estilos

**Antes (Tailwind v3):**

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Depois (Tailwind v4):**

```scss
@import 'tailwindcss';
```

### 5. Componentes UI

Os componentes UI foram atualizados para usar as novas variáveis CSS:

**Exemplo no Button component:**

- `bg-primary` → `bg-(--color-primary)`
- `text-primary-foreground` → `text-primary-foreground`
- `focus-visible:ring-ring` → `focus-visible:ring-ring`

### 6. Funcionalidades Mantidas

- ✅ Dark mode (class-based e system preference)
- ✅ Todas as cores personalizadas do tema
- ✅ Animações de accordion
- ✅ Compatibilidade com shadcn/ui
- ✅ Responsividade
- ✅ PWA functionality

### 7. Benefícios da Migração

1. **Performance:** Tailwind v4 é mais rápido e eficiente
2. **Tamanho:** Bundle size reduzido
3. **DX:** Melhor experiência de desenvolvimento
4. **Manutenção:** Configuração mais simples
5. **Cores:** Sistema de cores OKLCH para melhor precisão

### 8. Próximos Passos

Após a migração, recomenda-se:

1. Testar todas as funcionalidades da aplicação
2. Verificar se todos os componentes UI estão renderizando corretamente
3. Testar o dark mode em diferentes dispositivos
4. Revisar e otimizar componentes específicos se necessário

### 9. Resolução de Problemas

Se houver problemas com componentes específicos:

1. Verifique se as variáveis CSS estão definidas corretamente
2. Confirme se o PostCSS está processando o Tailwind corretamente
3. Para classes customizadas, considere usar a sintaxe `[var(--color-name)]`

### 10. Compatibilidade

- ✅ Next.js 14.2.23
- ✅ React 18
- ✅ shadcn/ui
- ✅ Radix UI components
- ✅ TypeScript
- ✅ Storybook
