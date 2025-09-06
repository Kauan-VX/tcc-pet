# Adota Match - Plataforma de Adoção Responsável

A maior e mais completa plataforma de adoção responsável de pets do Brasil, desenvolvida com Next.js. Conectamos famílias com cães e gatos que precisam de um lar usando tecnologia avançada e inteligência artificial.

**Desenvolvido por: Kauan Xavier**

![Next.js](https://img.shields.io/badge/Next.js-14.2.23-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325)
![i18n](https://img.shields.io/badge/i18n-Multilingual-yellow)

## 📋 Características

Este boilerplate foi cuidadosamente estruturado para oferecer uma base sólida para projetos React/Next.js, incluindo:

### 🔐 Autenticação e Autorização

- Sistema completo de autenticação JWT
- Gerenciamento de tokens (acesso e refresh)
- Rotas protegidas e middleware de autorização
- Suporte para impersonação de usuários

### 🌐 Internacionalização (i18n)

- Suporte para múltiplos idiomas (EN, PT-BR, ES)
- Troca dinâmica de idiomas com next-intl
- Localização de mensagens e conteúdo

### 🎨 UI/UX

- Componentes reutilizáveis com shadcn/ui
- Temas e estilos customizáveis
- Layout responsivo
- Formulários com validação (React Hook Form + Zod)

### 🧪 Testes

- Configuração Jest para testes unitários
- React Testing Library para testes de componentes
- Exemplos de testes

### 📱 PWA

- Suporte a Progressive Web App
- Configuração offline
- Instalação em dispositivos móveis

### 📊 Monitoramento e Análise

- Integração com Sentry para rastreamento de erros
- Métricas de performance com Web Vitals
- Analytics com Google Analytics

### 📚 Documentação

- Storybook para documentação de componentes
- Exemplos de implementação
- Código bem documentado

## 🚀 Instalação e Uso

### Pré-requisitos

- Node.js 18+ (LTS recomendado)
- npm, yarn ou pnpm

### Instalação

```bash
# Clone o repositório
git clone https://seu-repositorio/next-boilerplate.git
cd next-boilerplate

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
```

### Comandos disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar versão de produção
npm run start

# Executar testes
npm run test

# Executar testes em watch mode
npm run test:watch

# Iniciar Storybook
npm run storybook

# Build do Storybook
npm run build-storybook
```

## 🛠️ Arquitetura e Estrutura

```
.
├── messages/                 # Arquivos de tradução para i18n
├── public/                   # Arquivos estáticos
├── src/
│   ├── app/                  # Estrutura de páginas (Next.js App Router)
│   │   ├── (private)/        # Rotas protegidas que requerem autenticação
│   │   ├── (public)/         # Rotas públicas
│   │   └── api/              # Rotas da API
│   ├── components/           # Componentes reutilizáveis
│   │   └── ui/               # Componentes UI base (shadcn/ui)
│   ├── hoc/                  # Higher-Order Components
│   ├── hooks/                # Hooks personalizados
│   ├── i18n/                 # Configuração de internacionalização
│   ├── lib/                  # Utilitários e bibliotecas
│   ├── schemas/              # Esquemas de validação (Zod)
│   ├── service/              # Serviços e clientes API
│   │   └── endpoints/        # Endpoints da API organizados
│   ├── store/                # Gerenciamento de estado (Zustand)
│   ├── types/                # Definições de tipos TypeScript
│   └── utils/                # Funções utilitárias
├── .storybook/              # Configuração do Storybook
├── jest.config.js           # Configuração do Jest
└── next.config.mjs          # Configuração do Next.js
```

## 🔍 Por que essas tecnologias?

### Next.js (App Router)

Escolhido por sua renderização híbrida (SSR/SSG/CSR), otimização de imagens, rotas API e integrações nativas com serviços Vercel. O App Router traz vantagens como layouts aninhados, carregamento em paralelo e componentes server/client claramente definidos.

### TypeScript

Adiciona tipagem estática, aumentando a segurança do código, facilitando refatorações e melhorando a documentação interna do projeto.

### Tailwind CSS

Framework CSS utility-first que acelera o desenvolvimento, mantém o bundle pequeno e facilita a criação de interfaces responsivas sem necessidade de alternância entre arquivos.

### shadcn/ui

Componentes acessíveis e customizáveis, construídos com Radix UI e Tailwind CSS. Diferente de bibliotecas tradicionais, você tem controle total sobre o código, facilitando customizações.

### Zustand

Gerenciador de estado minimalista, simples de usar e com excelente performance. É uma alternativa mais leve ao Redux com menos boilerplate.

### React Query

Solução para gerenciamento de estado de servidor, com cache, refetching automático e invalidação de queries, reduzindo código boilerplate para operações de dados.

### Jest + Testing Library

Ferramentas robustas para testes que incentivam boas práticas de teste focadas no comportamento do usuário e não na implementação.

### Storybook

Ambiente de desenvolvimento para UI que permite criar, visualizar e testar componentes isoladamente, melhorando a colaboração entre designers e desenvolvedores.

### Sentry

Plataforma de monitoramento de erros em tempo real que ajuda a identificar e corrigir problemas em produção rapidamente.

### next-pwa

Adiciona suporte a Progressive Web App, permitindo que seu site seja instalado como um aplicativo, com funcionamento offline e melhor experiência móvel.

### React Hook Form + Zod

Combinação eficiente para gerenciamento de formulários com excelente performance e validação de esquemas fortemente tipada.

### next-intl

Solução completa de internacionalização para Next.js que funciona bem com o App Router e suporta tradução de mensagens, formatação de datas, números e mais.

## 🧩 Hooks Personalizados

O boilerplate inclui vários hooks úteis:

### useWindowSize

Monitora o tamanho da janela para implementações responsivas baseadas em código.

```tsx
const { width, height } = useWindowSize();
if (width && width < 768) {
  // Lógica para telas móveis
}
```

### useFetch

Simplifica requisições fetch com gerenciamento de estado.

```tsx
const { data, isLoading, error } = useFetch<UserData>('/api/user/profile');
```

### useLocalStorage

Persiste dados no localStorage com uma API similar ao useState.

```tsx
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### useToast

Sistema de notificações elegante e acessível.

```tsx
const { toast } = useToast();
toast({ title: 'Sucesso!', description: 'Operação concluída.' });
```

## 📊 Monitoramento e Análise

### Web Vitals

Captura métricas cruciais de performance como LCP, FID, CLS e TTFB, importantes para SEO e experiência do usuário.

### Sentry

Configurado para capturar erros tanto no cliente quanto no servidor, com breadcrumbs para reproduzir problemas.

### Google Analytics

Integração para rastreamento de páginas e eventos personalizados.

## 🔒 Segurança

- Tokens JWT com refresh automático
- Proteção contra CSRF
- Sanitização de entrada de dados
- Validação de schema com Zod
- HTTPOnly cookies para tokens sensíveis
- Middleware de autenticação para rotas protegidas

## 🌐 Suporte a PWA

Configurado para oferecer:

- Instalação no dispositivo
- Funcionamento offline
- Ícones personalizados
- Tela de splash
- Cache de assets

## 🚢 Deploy e Docker

Inclui configuração Docker para desenvolvimento e produção, facilitando o deploy em qualquer ambiente.

```bash
# Desenvolvimento
docker-compose up

# Produção
docker build -t next-boilerplate .
docker run -p 3000:3000 next-boilerplate
```

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor, sinta-se à vontade para submeter um Pull Request.
