"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MoreVertical, UserCheck, UserX, Mail, Phone, Calendar, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data para usuários
const mockUsers = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria@email.com",
    phone: "(11) 99999-9999",
    type: "adopter",
    status: "active",
    joinDate: "2024-01-15",
    location: "São Paulo, SP",
    adoptions: 2,
    applications: 5,
  },
  {
    id: 2,
    name: "Instituto Amor Animal",
    email: "contato@amoranimal.org",
    phone: "(11) 88888-8888",
    type: "institution",
    status: "active",
    joinDate: "2023-08-20",
    location: "Rio de Janeiro, RJ",
    pets: 45,
    adoptions: 120,
  },
  {
    id: 3,
    name: "João Santos",
    email: "joao@email.com",
    phone: "(11) 77777-7777",
    type: "adopter",
    status: "pending",
    joinDate: "2024-02-10",
    location: "Belo Horizonte, MG",
    adoptions: 0,
    applications: 2,
  },
  {
    id: 4,
    name: "ONG Patinhas Felizes",
    email: "ong@patinhas.org",
    phone: "(11) 66666-6666",
    type: "institution",
    status: "suspended",
    joinDate: "2023-12-05",
    location: "Curitiba, PR",
    pets: 23,
    adoptions: 67,
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || user.type === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "adopter":
        return "Adotante"
      case "institution":
        return "Instituição"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
          <p className="text-gray-600 mt-1">Administre adotantes e instituições da plataforma</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Adotantes</p>
                <p className="text-2xl font-bold text-gray-900">1,089</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Instituições</p>
                <p className="text-2xl font-bold text-gray-900">158</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <UserX className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={filterType === "adopter" ? "default" : "outline"}
                onClick={() => setFilterType("adopter")}
                size="sm"
              >
                Adotantes
              </Button>
              <Button
                variant={filterType === "institution" ? "default" : "outline"}
                onClick={() => setFilterType("institution")}
                size="sm"
              >
                Instituições
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status === "active" ? "Ativo" : user.status === "pending" ? "Pendente" : "Suspenso"}
                      </Badge>
                      <Badge variant="outline">{getTypeLabel(user.type)}</Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.joinDate).toLocaleDateString("pt-BR")}
                      </div>
                    </div>

                    <div className="flex gap-4 text-sm">
                      {user.type === "adopter" ? (
                        <>
                          <span className="text-green-600 font-medium">{user.adoptions} adoções</span>
                          <span className="text-blue-600 font-medium">{user.applications} candidaturas</span>
                        </>
                      ) : (
                        <>
                          <span className="text-purple-600 font-medium">{user.pets} pets</span>
                          <span className="text-green-600 font-medium">{user.adoptions} adoções realizadas</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    {user.status === "active" ? (
                      <DropdownMenuItem className="text-red-600">Suspender</DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="text-green-600">Ativar</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
