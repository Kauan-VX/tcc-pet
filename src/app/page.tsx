'use client';

import { AuthModal } from '@/components/auth/auth-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import {
  ArrowRight,
  Heart,
  Home,
  LogOut,
  PawPrint,
  Shield,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, logout } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const handleRegister = () => {
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  const getDashboardLink = () => {
    if (!user) return '/dashboard';

    switch (user.type) {
      case 'adopter':
        return '/dashboard';
      case 'institution':
        return '/institution';
      case 'admin':
        return '/admin';
      default:
        return '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-primary" />
              <span className="font-heading font-bold text-xl text-foreground">
                Adota Match
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#como-funciona"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Como Funciona
              </a>
              <a
                href="#impacto"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Nosso Impacto
              </a>
              <a
                href="#historias"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Histórias
              </a>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Olá, {user.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="bg-transparent"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={getDashboardLink()}>
                      {user.type === 'adopter' && 'Meu Dashboard'}
                      {user.type === 'institution' && 'Painel Instituição'}
                      {user.type === 'admin' && 'Painel Admin'}
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="mr-2 bg-transparent"
                    onClick={handleLogin}
                  >
                    Entrar
                  </Button>
                  <Button onClick={handleRegister}>Começar Agora</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-background"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            >
              <Badge variant="secondary" className="w-fit">
                <Sparkles className="h-4 w-4 mr-2" />
                Tecnologia com IA para Adoção Responsável
              </Badge>

              <div className="space-y-4">
                <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight">
                  Conectando
                  <span className="text-primary block">Corações</span>e Patinhas
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                  A primeira plataforma brasileira que usa inteligência
                  artificial para criar matches perfeitos entre pets e famílias,
                  combatendo o abandono animal.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 animate-heartbeat"
                    asChild
                  >
                    <Link href={getDashboardLink()}>
                      {user.type === 'adopter' && 'Ver Meus Matches'}
                      {user.type === 'institution' && 'Gerenciar Pets'}
                      {user.type === 'admin' && 'Painel Administrativo'}
                      <Heart className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 animate-heartbeat"
                      onClick={handleRegister}
                    >
                      Encontrar Meu Pet
                      <Heart className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 py-6 bg-transparent"
                      onClick={() => {
                        setAuthMode('register');
                        setAuthModalOpen(true);
                      }}
                    >
                      Sou uma Instituição
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="font-heading font-bold text-2xl text-primary">
                    12.5k+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pets Adotados
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-heading font-bold text-2xl text-primary">
                    850+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Instituições
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-heading font-bold text-2xl text-primary">
                    98%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Match Success
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="animate-float">
                <Image
                  width={500}
                  height={500}
                  src="/img/banner.jpg"
                  alt="Pets felizes em um lar amoroso"
                  className="rounded-2xl w-full shadow-2xl max-w-lg"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground p-4 rounded-full shadow-lg animate-bounce">
                <Heart className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              O Problema que Combatemos
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Milhões de animais são abandonados todos os anos no Brasil. Nossa
              missão é mudar essa realidade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="font-heading font-semibold text-xl">
                  30 Milhões
                </h3>
                <p className="text-muted-foreground">
                  de animais abandonados nas ruas do Brasil
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                  <Home className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="font-heading font-semibold text-xl">70%</h3>
                <p className="text-muted-foreground">
                  das adoções falham por incompatibilidade
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="font-heading font-semibold text-xl">Falta</h3>
                <p className="text-muted-foreground">
                  de conexão entre adotantes e instituições
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section - AI Match */}
      <section id="como-funciona" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Nossa Solução Inovadora
            </Badge>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Match Inteligente com IA
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nosso algoritmo analisa personalidade, estilo de vida e
              preferências para criar matches perfeitos entre pets e famílias.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-heading font-bold text-primary">
                      1
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-2">
                      Perfil Detalhado
                    </h3>
                    <p className="text-muted-foreground">
                      Criamos um perfil completo baseado no seu estilo de vida,
                      experiência e preferências.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-heading font-bold text-primary">
                      2
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-2">
                      IA Analisa
                    </h3>
                    <p className="text-muted-foreground">
                      Nossa inteligência artificial processa milhares de dados
                      para encontrar a combinação perfeita.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-heading font-bold text-primary">
                      3
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-2">
                      Match Perfeito
                    </h3>
                    <p className="text-muted-foreground">
                      Receba sugestões personalizadas de pets que se encaixam
                      perfeitamente com você.
                    </p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full sm:w-auto">
                Começar Meu Match
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
                <img
                  src="/placeholder-a47d4.png"
                  alt="Interface do sistema de match com IA"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="historias" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-lg text-muted-foreground">
              Veja como transformamos vidas através de matches perfeitos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden py-0 hover:shadow-lg transition-shadow">
              <div className="aspect-video">
                <Image
                  width={400}
                  height={250}
                  src="/img/testimonials/retrato-de-par-feliz-casa-com-cao.jpg"
                  alt="Família feliz com pet adotado"
                  className="size-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "O match foi perfeito! Luna se adaptou imediatamente à nossa
                  família. A IA realmente entendeu o que precisávamos."
                </p>
                <div className="font-semibold">Maria & João - São Paulo</div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden py-0 hover:shadow-lg transition-shadow">
              <div className="aspect-video">
                <Image
                  width={400}
                  height={250}
                  src="/img/testimonials/idosa-feliz-segurando-um-cachorro.jpg"
                  alt="Pessoa idosa com gato adotado"
                  className="size-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Aos 70 anos encontrei minha companheira perfeita. Mimi trouxe
                  alegria e propósito para minha vida."
                </p>
                <div className="font-semibold">Dona Rosa - Rio de Janeiro</div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden py-0 hover:shadow-lg transition-shadow">
              <div className="aspect-video">
                <Image
                  width={400}
                  height={250}
                  src="/img/testimonials/casal-brincando-com-cachorro.jpg"
                  alt="Casal jovem com cão adotado"
                  className="size-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Como primeira adoção, estávamos nervosos. O sistema nos guiou
                  perfeitamente e Max é nosso filho de quatro patas!"
                </p>
                <div className="font-semibold">
                  Ana & Carlos - Belo Horizonte
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Pronto para Encontrar seu Companheiro?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Junte-se a milhares de famílias que já encontraram o amor
            incondicional através do Adota Match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Começar Agora
              <Heart className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-transparent"
            >
              Saber Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <PawPrint className="h-6 w-6 text-primary" />
                <span className="font-heading font-bold text-lg">
                  Adota Match
                </span>
              </div>
              <p className="text-muted-foreground">
                Conectando corações e patinhas através da tecnologia e amor.
              </p>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4">Plataforma</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#como-funciona"
                    className="hover:text-primary transition-colors"
                  >
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard/adopter"
                    className="hover:text-primary transition-colors"
                  >
                    Para Adotantes
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard/institution"
                    className="hover:text-primary transition-colors"
                  >
                    Para Instituições
                  </a>
                </li>
                <li>
                  <Link
                    href="/dashboard/foster"
                    className="hover:text-primary transition-colors"
                  >
                    Foster Care
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Comunidade
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Termos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2025 Adota Match. Todos os direitos reservados. Feito com
              ❤️ para os pets do Brasil.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </div>
  );
}
