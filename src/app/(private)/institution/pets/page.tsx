"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PawPrint, Search, Filter, Plus, Edit, Eye, Trash2, Users, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data for pets
const mockPets = [
  {
    id: "1",
    name: "Luna",
    breed: "Golden Retriever",
    age: "2 anos",
    size: "Grande",
    status: "Disponível",
    image: "/placeholder.svg?height=200&width=200&text=Luna",
    personality: ["Carinhosa", "Ativa", "Inteligente"],
    applications: 3,
    views: 45,
    addedDate: "2024-01-15",
    vaccinated: true,
    neutered: true,
    specialNeeds: false,
  },
  {
    id: "2",
    name: "Max",
    breed: "Labrador Mix",
    age: "3 anos",
    size: "Grande",
    status: "Em processo",
    image: "/placeholder.svg?height=200&width=200&text=Max",
    personality: ["Brincalhão", "Leal", "Protetor"],
    applications: 5,
    views: 67,
    addedDate: "2024-01-10",
    vaccinated: true,
    neutered: true,
    specialNeeds: false,
  },
  {
    id: "3",
    name: "Mimi",
    breed: "Gato Persa",
    age: "1 ano",
    size: "Pequeno",
    status: "Adotado",
    image: "/placeholder.svg?height=200&width=200&text=Mimi",
    personality: ["Calma", "Carinhosa", "Independente"],
    applications: 2,
    views: 32,
    addedDate: "2024-01-05",
    vaccinated: true,
    neutered: true,
    specialNeeds: false,
  },
  {
    id: "4",
    name: "Buddy",
    breed: "Beagle",
    age: "4 anos",
    size: "Médio",
    status: "Disponível",
    image: "/placeholder.svg?height=200&width=200&text=Buddy",
    personality: ["Amigável", "Curioso", "Brincalhão"],
    applications: 1,
    views: 23,
    addedDate: "2024-01-08",
    vaccinated: true,
    neutered: false,
    specialNeeds: false,
  },
]

export default function InstitutionPetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível":
        return "bg-green-100 text-green-800"
      case "Em processo":
        return "bg-yellow-100 text-yellow-800"
      case "Adotado":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredPets = mockPets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || pet.status === statusFilter
    const matchesSize = sizeFilter === "all" || pet.size === sizeFilter

    return matchesSearch && matchesStatus && matchesSize
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center space-x-2">
            <PawPrint className="h-8 w-8 text-primary" />
            <span>Meus Pets</span>
          </h1>
          <p className="text-muted-foreground">Gerencie todos os pets da sua instituição</p>
        </div>
        <Button asChild>
          <Link href="/institution/pets/add">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Pet
          </Link>
        </Button>
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
                  placeholder="Buscar por nome ou raça..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="Disponível">Disponível</SelectItem>
                    <SelectItem value="Em processo">Em processo</SelectItem>
                    <SelectItem value="Adotado">Adotado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tamanho</label>
                <Select value={sizeFilter} onValueChange={setSizeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tamanhos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tamanhos</SelectItem>
                    <SelectItem value="Pequeno">Pequeno</SelectItem>
                    <SelectItem value="Médio">Médio</SelectItem>
                    <SelectItem value="Grande">Grande</SelectItem>
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
          <p className="text-muted-foreground">{filteredPets.length} pets encontrados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge className={getStatusColor(pet.status)}>{pet.status}</Badge>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-heading font-semibold text-lg">{pet.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {pet.breed} • {pet.age} • {pet.size}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {pet.personality.slice(0, 3).map((trait) => (
                    <Badge key={trait} variant="outline" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{pet.applications}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{pet.views}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-2">
                    {pet.vaccinated && (
                      <Badge variant="secondary" className="text-xs">
                        Vacinado
                      </Badge>
                    )}
                    {pet.neutered && (
                      <Badge variant="secondary" className="text-xs">
                        Castrado
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Adicionado em {new Date(pet.addedDate).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <PawPrint className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Nenhum pet encontrado</h3>
                  <p className="text-muted-foreground">Tente ajustar seus filtros de busca ou adicione novos pets.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                      setSizeFilter("all")
                    }}
                  >
                    Limpar Filtros
                  </Button>
                  <Button asChild>
                    <Link href="/institution/pets/add">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Pet
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
