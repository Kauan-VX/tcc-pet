"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Heart, Dog, Cat, MoreVertical, MapPin, Calendar, Eye, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data para pets
const mockPets = [
  {
    id: 1,
    name: "Buddy",
    type: "dog",
    breed: "Golden Retriever",
    age: "2 anos",
    gender: "Macho",
    size: "Grande",
    status: "available",
    institution: "Instituto Amor Animal",
    location: "São Paulo, SP",
    addedDate: "2024-01-15",
    views: 245,
    applications: 8,
    image: "/golden-retriever.png",
  },
  {
    id: 2,
    name: "Luna",
    type: "cat",
    breed: "Siamês",
    age: "1 ano",
    gender: "Fêmea",
    size: "Médio",
    status: "adopted",
    institution: "ONG Patinhas Felizes",
    location: "Rio de Janeiro, RJ",
    addedDate: "2024-02-10",
    views: 189,
    applications: 12,
    image: "/siamese-cat.png",
  },
  {
    id: 3,
    name: "Max",
    type: "dog",
    breed: "Vira-lata",
    age: "3 anos",
    gender: "Macho",
    size: "Médio",
    status: "foster",
    institution: "Abrigo São Francisco",
    location: "Belo Horizonte, MG",
    addedDate: "2024-01-20",
    views: 156,
    applications: 5,
    image: "/placeholder-sn3il.png",
  },
  {
    id: 4,
    name: "Mia",
    type: "cat",
    breed: "Persa",
    age: "4 anos",
    gender: "Fêmea",
    size: "Pequeno",
    status: "available",
    institution: "Casa dos Bichos",
    location: "Curitiba, PR",
    addedDate: "2024-02-05",
    views: 98,
    applications: 3,
    image: "/fluffy-persian-cat.png",
  },
]

export default function PetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredPets = mockPets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.institution.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || pet.type === filterType
    const matchesStatus = filterStatus === "all" || pet.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "adopted":
        return "bg-blue-100 text-blue-800"
      case "foster":
        return "bg-purple-100 text-purple-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Disponível"
      case "adopted":
        return "Adotado"
      case "foster":
        return "Foster Care"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Pets</h1>
          <p className="text-gray-600 mt-1">Administre todos os pets da plataforma</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Pets</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponíveis</p>
                <p className="text-2xl font-bold text-gray-900">892</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Adotados</p>
                <p className="text-2xl font-bold text-gray-900">298</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Foster Care</p>
                <p className="text-2xl font-bold text-gray-900">57</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
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
                placeholder="Buscar pets por nome, raça ou instituição..."
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
                variant={filterType === "dog" ? "default" : "outline"}
                onClick={() => setFilterType("dog")}
                size="sm"
              >
                <Dog className="w-4 h-4 mr-1" />
                Cães
              </Button>
              <Button
                variant={filterType === "cat" ? "default" : "outline"}
                onClick={() => setFilterType("cat")}
                size="sm"
              >
                <Cat className="w-4 h-4 mr-1" />
                Gatos
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                Todos Status
              </Button>
              <Button
                variant={filterStatus === "available" ? "default" : "outline"}
                onClick={() => setFilterStatus("available")}
                size="sm"
              >
                Disponíveis
              </Button>
              <Button
                variant={filterStatus === "adopted" ? "default" : "outline"}
                onClick={() => setFilterStatus("adopted")}
                size="sm"
              >
                Adotados
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <Card key={pet.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className={`absolute top-3 right-3 ${getStatusColor(pet.status)}`}>
                  {getStatusLabel(pet.status)}
                </Badge>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{pet.name}</h3>
                    <p className="text-gray-600 text-sm">{pet.breed}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Idade:</span> {pet.age}
                  </div>
                  <div>
                    <span className="font-medium">Sexo:</span> {pet.gender}
                  </div>
                  <div>
                    <span className="font-medium">Porte:</span> {pet.size}
                  </div>
                  <div className="flex items-center gap-1">
                    {pet.type === "dog" ? <Dog className="w-4 h-4" /> : <Cat className="w-4 h-4" />}
                    {pet.type === "dog" ? "Cão" : "Gato"}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {pet.institution} - {pet.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Adicionado em {new Date(pet.addedDate).toLocaleDateString("pt-BR")}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-600 font-medium">{pet.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-600" />
                      <span className="text-red-600 font-medium">{pet.applications}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
