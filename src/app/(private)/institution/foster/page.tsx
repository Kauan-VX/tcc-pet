"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Home, Users, CheckCircle, AlertCircle, Plus, Eye } from "lucide-react"

// Mock data for foster care management
const mockFosterPets = [
  {
    id: "1",
    name: "Bella",
    breed: "Labrador Mix",
    age: "6 meses",
    size: "Médio",
    image: "/placeholder.svg?height=200&width=200&text=Bella",
    reason: "Recuperação pós-cirúrgica",
    duration: "2-3 meses",
    status: "active",
    fosterFamily: "Família Silva",
    startDate: "2024-01-10",
    expectedEndDate: "2024-03-10",
    progress: 60,
    urgency: "high",
  },
  {
    id: "2",
    name: "Thor",
    breed: "Pastor Alemão",
    age: "8 anos",
    size: "Grande",
    image: "/placeholder.svg?height=200&width=200&text=Thor",
    reason: "Socialização e treinamento",
    duration: "4-6 meses",
    status: "seeking",
    fosterFamily: null,
    startDate: null,
    expectedEndDate: null,
    progress: 0,
    urgency: "medium",
  },
]

const mockFosterApplications = [
  {
    id: "1",
    petId: "2",
    petName: "Thor",
    applicantName: "João Santos",
    applicantEmail: "joao@email.com",
    experience: "experienced",
    availability: "full-time",
    housing: "house-yard",
    reason: "Tenho experiência com cães grandes e quero ajudar na socialização.",
    status: "pending",
    appliedDate: "2024-02-15",
  },
  {
    id: "2",
    petId: "2",
    petName: "Thor",
    applicantName: "Maria Costa",
    applicantEmail: "maria@email.com",
    experience: "some",
    availability: "part-time",
    housing: "house",
    reason: "Sempre quis ajudar animais em necessidade.",
    status: "pending",
    appliedDate: "2024-02-14",
  },
]

export default function InstitutionFosterPage() {
  const [activeTab, setActiveTab] = useState<"pets" | "applications" | "add-pet">("pets")
  const [newFosterPet, setNewFosterPet] = useState({
    name: "",
    breed: "",
    age: "",
    size: "",
    reason: "",
    duration: "",
    requirements: "",
    description: "",
    urgency: "medium",
  })

  const handleAddFosterPet = () => {
    console.log("Adding foster pet:", newFosterPet)
    // Here you would add the pet to foster care
    setActiveTab("pets")
  }

  const handleApplicationAction = (applicationId: string, action: "approve" | "reject") => {
    console.log(`${action} application ${applicationId}`)
    // Here you would handle the application action
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground flex items-center space-x-2">
          <Home className="h-8 w-8 text-primary" />
          <span>Gerenciar Foster Care</span>
        </h1>
        <p className="text-muted-foreground">Gerencie pets em foster care e candidaturas de famílias temporárias</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pets em Foster</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFosterPets.filter((pet) => pet.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Ativos no momento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buscando Foster</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFosterPets.filter((pet) => pet.status === "seeking").length}</div>
            <p className="text-xs text-muted-foreground">Precisam de família</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidaturas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFosterApplications.length}</div>
            <p className="text-xs text-muted-foreground">Aguardando análise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Foster para adoção</p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <Button
          variant={activeTab === "pets" ? "default" : "ghost"}
          onClick={() => setActiveTab("pets")}
          className="flex-1"
        >
          <Home className="mr-2 h-4 w-4" />
          Pets em Foster
        </Button>
        <Button
          variant={activeTab === "applications" ? "default" : "ghost"}
          onClick={() => setActiveTab("applications")}
          className="flex-1"
        >
          <Users className="mr-2 h-4 w-4" />
          Candidaturas
        </Button>
        <Button
          variant={activeTab === "add-pet" ? "default" : "ghost"}
          onClick={() => setActiveTab("add-pet")}
          className="flex-1"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Pet
        </Button>
      </div>

      {/* Foster Pets Tab */}
      {activeTab === "pets" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Pets em Foster Care</h2>
            <Badge variant="secondary">{mockFosterPets.length} pets</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFosterPets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden">
                <div className="relative">
                  <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <Badge variant={pet.status === "active" ? "default" : "secondary"}>
                      {pet.status === "active" ? "Em Foster" : "Buscando Foster"}
                    </Badge>
                    <Badge
                      variant={
                        pet.urgency === "high" ? "destructive" : pet.urgency === "medium" ? "default" : "secondary"
                      }
                    >
                      {pet.urgency === "high" ? "Urgente" : pet.urgency === "medium" ? "Moderado" : "Baixo"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-heading font-semibold text-lg">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {pet.breed} • {pet.age} • {pet.size}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">Motivo:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{pet.reason}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Duração: {pet.duration}</span>
                  </div>

                  {pet.status === "active" && (
                    <>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Família Foster: {pet.fosterFamily}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progresso</span>
                            <span>{pet.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${pet.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      Detalhes
                    </Button>
                    {pet.status === "active" ? (
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Acompanhar
                      </Button>
                    ) : (
                      <Button size="sm" className="flex-1">
                        Ver Candidatos
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === "applications" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Candidaturas para Foster Care</h2>
            <Badge variant="secondary">{mockFosterApplications.length} pendentes</Badge>
          </div>

          <div className="space-y-4">
            {mockFosterApplications.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{application.applicantName}</span>
                        <Badge variant="secondary">Para {application.petName}</Badge>
                      </CardTitle>
                      <CardDescription>{application.applicantEmail}</CardDescription>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>Aplicado em: {new Date(application.appliedDate).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Experiência</p>
                      <Badge variant="outline">
                        {application.experience === "experienced"
                          ? "Experiente"
                          : application.experience === "some"
                            ? "Alguma"
                            : "Primeira vez"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Disponibilidade</p>
                      <Badge variant="outline">
                        {application.availability === "full-time" ? "Integral" : "Meio período"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Moradia</p>
                      <Badge variant="outline">
                        {application.housing === "house-yard"
                          ? "Casa c/ quintal"
                          : application.housing === "house"
                            ? "Casa"
                            : "Apartamento"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Motivação</p>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{application.reason}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleApplicationAction(application.id, "approve")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleApplicationAction(application.id, "reject")}
                    >
                      Rejeitar
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Perfil Completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add Pet Tab */}
      {activeTab === "add-pet" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Adicionar Pet para Foster Care</h2>
            <p className="text-muted-foreground">Cadastre um pet que precisa de cuidados temporários</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações do Pet</CardTitle>
              <CardDescription>Preencha os dados do pet que precisa de foster care</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Pet</Label>
                  <Input
                    id="name"
                    value={newFosterPet.name}
                    onChange={(e) => setNewFosterPet({ ...newFosterPet, name: e.target.value })}
                    placeholder="Nome do pet"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="breed">Raça</Label>
                  <Input
                    id="breed"
                    value={newFosterPet.breed}
                    onChange={(e) => setNewFosterPet({ ...newFosterPet, breed: e.target.value })}
                    placeholder="Raça do pet"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    value={newFosterPet.age}
                    onChange={(e) => setNewFosterPet({ ...newFosterPet, age: e.target.value })}
                    placeholder="Ex: 2 anos, 6 meses"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Tamanho</Label>
                  <Select
                    value={newFosterPet.size}
                    onValueChange={(value) => setNewFosterPet({ ...newFosterPet, size: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pequeno">Pequeno</SelectItem>
                      <SelectItem value="Médio">Médio</SelectItem>
                      <SelectItem value="Grande">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duração Estimada</Label>
                  <Input
                    id="duration"
                    value={newFosterPet.duration}
                    onChange={(e) => setNewFosterPet({ ...newFosterPet, duration: e.target.value })}
                    placeholder="Ex: 2-3 meses"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgência</Label>
                  <Select
                    value={newFosterPet.urgency}
                    onValueChange={(value) => setNewFosterPet({ ...newFosterPet, urgency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a urgência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Moderada</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo do Foster Care</Label>
                <Textarea
                  id="reason"
                  value={newFosterPet.reason}
                  onChange={(e) => setNewFosterPet({ ...newFosterPet, reason: e.target.value })}
                  placeholder="Ex: Recuperação pós-cirúrgica, socialização, cuidados especiais..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requisitos para Foster Family</Label>
                <Textarea
                  id="requirements"
                  value={newFosterPet.requirements}
                  onChange={(e) => setNewFosterPet({ ...newFosterPet, requirements: e.target.value })}
                  placeholder="Ex: Experiência com filhotes, disponibilidade para medicação, quintal amplo..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição Adicional</Label>
                <Textarea
                  id="description"
                  value={newFosterPet.description}
                  onChange={(e) => setNewFosterPet({ ...newFosterPet, description: e.target.value })}
                  placeholder="Informações adicionais sobre o pet e seus cuidados..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setActiveTab("pets")} className="bg-transparent">
                  Cancelar
                </Button>
                <Button onClick={handleAddFosterPet}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Pet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
