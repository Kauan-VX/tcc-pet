"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { Heart, Sparkles, MessageCircle, MapPin, Clock, Star, ArrowRight, PawPrint } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockMatches = [
  {
    id: "1",
    name: "Luna",
    breed: "Golden Retriever",
    age: "2 anos",
    location: "São Paulo, SP",
    matchPercentage: 95,
    image: "/placeholder.svg?height=200&width=200&text=Luna",
    personality: ["Carinhosa", "Ativa", "Inteligente"],
    institution: "Lar dos Animais SP",
  },
  {
    id: "2",
    name: "Max",
    breed: "Labrador Mix",
    age: "3 anos",
    location: "São Paulo, SP",
    matchPercentage: 88,
    image: "/placeholder.svg?height=200&width=200&text=Max",
    personality: ["Brincalhão", "Leal", "Protetor"],
    institution: "Amigos de Quatro Patas",
  },
  {
    id: "3",
    name: "Mimi",
    breed: "Gato Persa",
    age: "1 ano",
    location: "São Paulo, SP",
    matchPercentage: 92,
    image: "/placeholder.svg?height=200&width=200&text=Mimi",
    personality: ["Calma", "Carinhosa", "Independente"],
    institution: "Casa dos Felinos",
  },
]

const mockStats = {
  totalMatches: 12,
  favorites: 5,
  applications: 3,
  messages: 8,
}

const mockRecentActivity = [
  {
    id: "1",
    type: "match",
    message: "Novo match encontrado: Luna",
    time: "2 horas atrás",
    icon: Sparkles,
  },
  {
    id: "2",
    type: "message",
    message: "Nova mensagem de Lar dos Animais SP",
    time: "5 horas atrás",
    icon: MessageCircle,
  },
  {
    id: "3",
    type: "application",
    message: "Sua aplicação para Max foi aprovada!",
    time: "1 dia atrás",
    icon: Heart,
  },
]

export default function AdopterDashboard() {
  const { user } = useAuth()
  const [profileCompletion] = useState(75)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground">Olá, {user?.name}! 👋</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu dashboard. Aqui você pode ver seus matches, favoritos e muito mais.
        </p>
      </div>

      {/* Profile Completion */}
      {profileCompletion < 100 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <span>Complete seu perfil</span>
            </CardTitle>
            <CardDescription>Complete seu perfil para receber matches mais precisos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso do perfil</span>
                <span>{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
            </div>
            <Button asChild>
              <Link href="/dashboard/profile">
                Completar Perfil
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Matches</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalMatches}</div>
            <p className="text-xs text-muted-foreground">+3 novos esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.favorites}</div>
            <p className="text-xs text-muted-foreground">Pets salvos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aplicações</CardTitle>
            <PawPrint className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.applications}</div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.messages}</div>
            <p className="text-xs text-muted-foreground">2 não lidas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Matches */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Seus Melhores Matches</span>
              </CardTitle>
              <CardDescription>Pets que combinam perfeitamente com você</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockMatches.map((pet) => (
                <div
                  key={pet.id}
                  className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{pet.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {pet.matchPercentage}% match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pet.breed} • {pet.age}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{pet.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pet.personality.slice(0, 2).map((trait) => (
                        <Badge key={trait} variant="outline" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm">Ver Mais</Button>
                  </div>
                </div>
              ))}
              <div className="text-center pt-4">
                <Button asChild variant="outline">
                  <Link href="/dashboard/matches">
                    Ver Todos os Matches
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Atividade Recente</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/dashboard/matches">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Descobrir Novos Pets
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/dashboard/favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  Ver Favoritos
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/dashboard/messages">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Minhas Conversas
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
