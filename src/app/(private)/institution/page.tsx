"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { PawPrint, Users, Heart, MessageCircle, Clock, Star, ArrowRight, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockStats = {
  totalPets: 24,
  availablePets: 18,
  adoptedThisMonth: 6,
  pendingApplications: 12,
  totalAdoptions: 156,
  successRate: 94,
}

const mockRecentPets = [
  {
    id: "1",
    name: "Luna",
    breed: "Golden Retriever",
    age: "2 anos",
    status: "Disponível",
    image: "/placeholder.svg?height=100&width=100&text=Luna",
    applications: 3,
    addedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Max",
    breed: "Labrador Mix",
    age: "3 anos",
    status: "Em processo",
    image: "/placeholder.svg?height=100&width=100&text=Max",
    applications: 5,
    addedDate: "2024-01-10",
  },
  {
    id: "3",
    name: "Mimi",
    breed: "Gato Persa",
    age: "1 ano",
    status: "Adotado",
    image: "/placeholder.svg?height=100&width=100&text=Mimi",
    applications: 2,
    addedDate: "2024-01-05",
  },
]

const mockRecentApplications = [
  {
    id: "1",
    petName: "Luna",
    applicantName: "Maria Silva",
    status: "Pendente",
    matchPercentage: 95,
    submittedDate: "2024-01-20",
    avatar: "/placeholder.svg?height=40&width=40&text=MS",
  },
  {
    id: "2",
    petName: "Max",
    applicantName: "João Santos",
    status: "Aprovado",
    matchPercentage: 88,
    submittedDate: "2024-01-19",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
  },
  {
    id: "3",
    petName: "Buddy",
    applicantName: "Ana Costa",
    status: "Em análise",
    matchPercentage: 92,
    submittedDate: "2024-01-18",
    avatar: "/placeholder.svg?height=40&width=40&text=AC",
  },
]

const mockRecentActivity = [
  {
    id: "1",
    type: "application",
    message: "Nova candidatura para Luna",
    time: "2 horas atrás",
    icon: Users,
  },
  {
    id: "2",
    type: "adoption",
    message: "Mimi foi adotada com sucesso!",
    time: "1 dia atrás",
    icon: Heart,
  },
  {
    id: "3",
    type: "message",
    message: "Nova mensagem de João Santos",
    time: "2 dias atrás",
    icon: MessageCircle,
  },
]

export default function InstitutionDashboard() {
  const { user } = useAuth()
  const [profileCompletion] = useState(85)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível":
        return "bg-green-100 text-green-800"
      case "Em processo":
        return "bg-yellow-100 text-yellow-800"
      case "Adotado":
        return "bg-blue-100 text-blue-800"
      case "Pendente":
        return "bg-orange-100 text-orange-800"
      case "Aprovado":
        return "bg-green-100 text-green-800"
      case "Em análise":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground">Bem-vinda, {user?.name}! 🏠</h1>
        <p className="text-muted-foreground">
          Gerencie seus pets, candidaturas e ajude mais animais a encontrarem um lar.
        </p>
      </div>

      {/* Profile Completion */}
      {profileCompletion < 100 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <span>Complete o perfil da instituição</span>
            </CardTitle>
            <CardDescription>Um perfil completo aumenta a confiança dos adotantes</CardDescription>
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
              <Link href="/institution/profile">
                Completar Perfil
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pets</CardTitle>
            <PawPrint className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalPets}</div>
            <p className="text-xs text-muted-foreground">{mockStats.availablePets} disponíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adoções este Mês</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.adoptedThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2 vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidaturas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pendingApplications}</div>
            <p className="text-xs text-muted-foreground">Aguardando análise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.successRate}%</div>
            <p className="text-xs text-muted-foreground">{mockStats.totalAdoptions} adoções realizadas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Pets */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <PawPrint className="h-5 w-5 text-primary" />
                  <span>Pets Recentes</span>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href="/institution/pets/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Pet
                  </Link>
                </Button>
              </CardTitle>
              <CardDescription>Pets adicionados recentemente à plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecentPets.map((pet) => (
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
                      <Badge className={getStatusColor(pet.status)}>{pet.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pet.breed} • {pet.age}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{pet.applications} candidaturas</span>
                      <span>Adicionado em {new Date(pet.addedDate).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              ))}
              <div className="text-center pt-4">
                <Button asChild variant="outline">
                  <Link href="/institution/pets">
                    Ver Todos os Pets
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications & Activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Candidaturas Recentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecentApplications.map((application) => (
                <div key={application.id} className="flex items-center space-x-3">
                  <img
                    src={application.avatar || "/placeholder.svg"}
                    alt={application.applicantName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{application.applicantName}</p>
                      <Badge className={getStatusColor(application.status)} variant="outline">
                        {application.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Para {application.petName} • {application.matchPercentage}% match
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(application.submittedDate).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/institution/applications">Ver Todas</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

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
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/institution/pets/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Novo Pet
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/institution/applications">
                  <Users className="mr-2 h-4 w-4" />
                  Ver Candidaturas
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/institution/messages">
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
