"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Building2,
  Heart,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data para instituições
const mockInstitutions = [
  {
    id: 1,
    name: "Instituto Amor Animal",
    email: "contato@amoranimal.org",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - São Paulo, SP",
    status: "verified",
    joinDate: "2023-08-20",
    totalPets: 45,
    availablePets: 32,
    adoptedPets: 120,
    volunteers: 15,
    rating: 4.8,
    description: "Instituição dedicada ao resgate e cuidado de animais abandonados",
  },
  {
    id: 2,
    name: "ONG Patinhas Felizes",
    email: "ong@patinhas.org",
    phone: "(11) 88888-8888",
    address: "Av. Central, 456 - Rio de Janeiro, RJ",
    status: "pending",
    joinDate: "2024-01-15",
    totalPets: 23,
    availablePets: 18,
    adoptedPets: 67,
    volunteers: 8,
    rating: 4.5,
    description: "Focada no resgate de cães e gatos em situação de rua",
  },
  {
    id: 3,
    name: "Abrigo São Francisco",
    email: "abrigo@saofrancisco.org",
    phone: "(11) 77777-7777",
    address: "Rua da Esperança, 789 - Belo Horizonte, MG",
    status: "verified",
    joinDate: "2023-05-10",
    totalPets: 67,
    availablePets: 45,
    adoptedPets: 203,
    volunteers: 22,
    rating: 4.9,
    description: "Maior abrigo da região com foco em reabilitação animal",
  },
  {
    id: 4,
    name: "Casa dos Bichos",
    email: "casa@bichos.org",
    phone: "(11) 66666-6666",
    address: "Rua Verde, 321 - Curitiba, PR",
    status: "suspended",
    joinDate: "2023-11-30",
    totalPets: 12,
    availablePets: 8,
    adoptedPets: 34,
    volunteers: 5,
    rating: 3.8,
    description: "Pequena instituição familiar especializada em felinos",
  },
]

export default function InstitutionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredInstitutions = mockInstitutions.filter((institution) => {
    const matchesSearch =
      institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || institution.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      case "suspended":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "verified":
        return "Verificada"
      case "pending":
        return "Pendente"
      case "suspended":
        return "Suspensa"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Instituições</h1>
          <p className="text-gray-600 mt-1">Administre as instituições parceiras da plataforma</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
          <Building2 className="w-4 h-4 mr-2" />
          Nova Instituição
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Instituições</p>
                <p className="text-2xl font-bold text-gray-900">158</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verificadas</p>
                <p className="text-2xl font-bold text-gray-900">142</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pets Disponíveis</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">16</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
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
                placeholder="Buscar instituições..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                Todas
              </Button>
              <Button
                variant={filterStatus === "verified" ? "default" : "outline"}
                onClick={() => setFilterStatus("verified")}
                size="sm"
              >
                Verificadas
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                onClick={() => setFilterStatus("pending")}
                size="sm"
              >
                Pendentes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Institutions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInstitutions.map((institution) => (
          <Card key={institution.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                      {institution.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{institution.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(institution.status)}>
                        {getStatusIcon(institution.status)}
                        <span className="ml-1">{getStatusLabel(institution.status)}</span>
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600">{institution.rating}</span>
                      </div>
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
                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Ver Pets</DropdownMenuItem>
                    {institution.status === "verified" ? (
                      <DropdownMenuItem className="text-red-600">Suspender</DropdownMenuItem>
                    ) : institution.status === "pending" ? (
                      <DropdownMenuItem className="text-green-600">Aprovar</DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="text-green-600">Reativar</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{institution.description}</p>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {institution.address}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {institution.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {institution.phone}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Membro desde {new Date(institution.joinDate).toLocaleDateString("pt-BR")}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{institution.availablePets}</p>
                  <p className="text-xs text-gray-600">Pets Disponíveis</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{institution.adoptedPets}</p>
                  <p className="text-xs text-gray-600">Adoções Realizadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
