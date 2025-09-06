"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Filter, Eye, Check, X, MessageCircle, Calendar } from "lucide-react"

// Mock data for applications
const mockApplications = [
  {
    id: "1",
    petName: "Luna",
    petImage: "/placeholder.svg?height=60&width=60&text=Luna",
    applicantName: "Maria Silva",
    applicantEmail: "maria@email.com",
    applicantAvatar: "/placeholder.svg?height=40&width=40&text=MS",
    status: "Pendente",
    matchPercentage: 95,
    submittedDate: "2024-01-20",
    experience: "Experiente",
    housingType: "Casa",
    hasYard: true,
    hasOtherPets: false,
    reason: "Sempre quis ter um Golden Retriever. Tenho experiência com cães grandes e muito amor para dar.",
  },
  {
    id: "2",
    petName: "Max",
    petImage: "/placeholder.svg?height=60&width=60&text=Max",
    applicantName: "João Santos",
    applicantEmail: "joao@email.com",
    applicantAvatar: "/placeholder.svg?height=40&width=40&text=JS",
    status: "Aprovado",
    matchPercentage: 88,
    submittedDate: "2024-01-19",
    experience: "Alguma experiência",
    housingType: "Apartamento",
    hasYard: false,
    hasOtherPets: true,
    reason: "Procuro um companheiro para meu outro cão. Max parece perfeito para nossa família.",
  },
  {
    id: "3",
    petName: "Buddy",
    petImage: "/placeholder.svg?height=60&width=60&text=Buddy",
    applicantName: "Ana Costa",
    applicantEmail: "ana@email.com",
    applicantAvatar: "/placeholder.svg?height=40&width=40&text=AC",
    status: "Em análise",
    matchPercentage: 92,
    submittedDate: "2024-01-18",
    experience: "Primeira vez",
    housingType: "Casa",
    hasYard: true,
    hasOtherPets: false,
    reason: "Sempre sonhei em ter um cão. Buddy parece ser o companheiro ideal para começar essa jornada.",
  },
  {
    id: "4",
    petName: "Luna",
    petImage: "/placeholder.svg?height=60&width=60&text=Luna",
    applicantName: "Carlos Oliveira",
    applicantEmail: "carlos@email.com",
    applicantAvatar: "/placeholder.svg?height=40&width=40&text=CO",
    status: "Rejeitado",
    matchPercentage: 65,
    submittedDate: "2024-01-17",
    experience: "Primeira vez",
    housingType: "Apartamento",
    hasYard: false,
    hasOtherPets: false,
    reason: "Quero um cão para fazer companhia.",
  },
]

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-orange-100 text-orange-800"
      case "Aprovado":
        return "bg-green-100 text-green-800"
      case "Em análise":
        return "bg-blue-100 text-blue-800"
      case "Rejeitado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredApplications = mockApplications.filter((application) => {
    const matchesSearch =
      application.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.petName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || application.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground flex items-center space-x-2">
          <Users className="h-8 w-8 text-primary" />
          <span>Candidaturas</span>
        </h1>
        <p className="text-muted-foreground">Gerencie as candidaturas de adoção dos seus pets</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Buscar e Filtrar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome do candidato ou pet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="pt-4 border-t border-border">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Em análise">Em análise</SelectItem>
                    <SelectItem value="Aprovado">Aprovado</SelectItem>
                    <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">{filteredApplications.length} candidaturas encontradas</p>
        </div>

        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Pet Image */}
                  <img
                    src={application.petImage || "/placeholder.svg"}
                    alt={application.petName}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />

                  {/* Main Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{application.applicantName}</h3>
                          <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {application.matchPercentage}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Candidatura para <span className="font-medium">{application.petName}</span>
                        </p>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Enviada em {new Date(application.submittedDate).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={application.applicantAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {application.applicantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Experiência:</span>
                        <p className="font-medium">{application.experience}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Moradia:</span>
                        <p className="font-medium">{application.housingType}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quintal:</span>
                        <p className="font-medium">{application.hasYard ? "Sim" : "Não"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Outros pets:</span>
                        <p className="font-medium">{application.hasOtherPets ? "Sim" : "Não"}</p>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Motivo da adoção:</span>
                      <p className="text-sm bg-muted/50 p-3 rounded-md">"{application.reason}"</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Perfil Completo
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Conversar
                        </Button>
                      </div>

                      {application.status === "Pendente" && (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Rejeitar
                          </Button>
                          <Button size="sm">
                            <Check className="mr-2 h-4 w-4" />
                            Aprovar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Nenhuma candidatura encontrada</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar seus filtros de busca ou aguarde novas candidaturas.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
