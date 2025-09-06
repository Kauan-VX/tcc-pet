"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Heart, Home, Shield, CheckCircle, AlertCircle, Info } from "lucide-react"

// Mock data for foster care opportunities
const mockFosterOpportunities = [
  {
    id: "1",
    name: "Bella",
    breed: "Labrador Mix",
    age: "6 meses",
    size: "Médio",
    location: "São Paulo, SP",
    image: "/placeholder.svg?height=200&width=200&text=Bella",
    reason: "Recuperação pós-cirúrgica",
    duration: "2-3 meses",
    requirements: ["Experiência com filhotes", "Disponibilidade para medicação"],
    institution: "Lar dos Animais SP",
    urgency: "high",
    description: "Bella precisa de cuidados especiais durante sua recuperação. É uma filhote muito carinhosa.",
  },
  {
    id: "2",
    name: "Thor",
    breed: "Pastor Alemão",
    age: "8 anos",
    size: "Grande",
    location: "São Paulo, SP",
    image: "/placeholder.svg?height=200&width=200&text=Thor",
    reason: "Socialização e treinamento",
    duration: "4-6 meses",
    requirements: ["Experiência com cães grandes", "Quintal amplo"],
    institution: "Amigos de Quatro Patas",
    urgency: "medium",
    description: "Thor é um cão idoso que precisa de socialização antes da adoção definitiva.",
  },
  {
    id: "3",
    name: "Mia",
    breed: "Gata SRD",
    age: "3 meses",
    size: "Pequeno",
    location: "São Paulo, SP",
    image: "/placeholder.svg?height=200&width=200&text=Mia",
    reason: "Cuidados com filhote órfão",
    duration: "1-2 meses",
    requirements: ["Disponibilidade integral", "Experiência com filhotes"],
    institution: "Casa dos Felinos",
    urgency: "high",
    description: "Mia é uma filhote órfã que precisa de cuidados intensivos e socialização.",
  },
]

const mockMyFosters = [
  {
    id: "1",
    name: "Rex",
    breed: "Golden Retriever",
    startDate: "2024-01-15",
    expectedEndDate: "2024-03-15",
    status: "active",
    progress: 75,
    nextCheckup: "2024-02-20",
    institution: "Lar dos Animais SP",
    notes: "Rex está se adaptando muito bem. Já consegue ficar sozinho por algumas horas.",
  },
]

export default function FosterCarePage() {
  const [activeTab, setActiveTab] = useState<"opportunities" | "my-fosters" | "application">("opportunities")
  const [selectedPet, setSelectedPet] = useState<string | null>(null)
  const [applicationData, setApplicationData] = useState({
    experience: "",
    availability: "",
    housing: "",
    reason: "",
    duration: "",
    specialCare: false,
    emergencyContact: "",
    veterinarian: "",
    additionalInfo: "",
  })

  const handleApplicationSubmit = () => {
    console.log("Foster application submitted:", applicationData)
    // Here you would submit the application
    setActiveTab("my-fosters")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground flex items-center space-x-2">
          <Home className="h-8 w-8 text-primary" />
          <span>Foster Care</span>
        </h1>
        <p className="text-muted-foreground">Ofereça um lar temporário e ajude pets em situações especiais</p>
      </div>

      {/* Info Banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">O que é Foster Care?</h3>
              <p className="text-sm text-blue-700">
                Foster Care é um programa de cuidado temporário onde você oferece um lar seguro para pets que precisam
                de cuidados especiais, recuperação ou socialização antes da adoção definitiva.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <Button
          variant={activeTab === "opportunities" ? "default" : "ghost"}
          onClick={() => setActiveTab("opportunities")}
          className="flex-1"
        >
          <Heart className="mr-2 h-4 w-4" />
          Oportunidades
        </Button>
        <Button
          variant={activeTab === "my-fosters" ? "default" : "ghost"}
          onClick={() => setActiveTab("my-fosters")}
          className="flex-1"
        >
          <Home className="mr-2 h-4 w-4" />
          Meus Fosters
        </Button>
        <Button
          variant={activeTab === "application" ? "default" : "ghost"}
          onClick={() => setActiveTab("application")}
          className="flex-1"
        >
          <Shield className="mr-2 h-4 w-4" />
          Candidatar-se
        </Button>
      </div>

      {/* Foster Opportunities Tab */}
      {activeTab === "opportunities" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Pets Precisando de Foster Care</h2>
            <Badge variant="secondary">{mockFosterOpportunities.length} oportunidades</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFosterOpportunities.map((pet) => (
              <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2">
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
                    <p className="text-xs text-muted-foreground">{pet.location}</p>
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

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Requisitos:</p>
                    <div className="flex flex-wrap gap-1">
                      {pet.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{pet.description}</p>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedPet(pet.id)
                        setActiveTab("application")
                      }}
                    >
                      Candidatar-se
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">Por: {pet.institution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* My Fosters Tab */}
      {activeTab === "my-fosters" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Meus Foster Care Ativos</h2>
            <Badge variant="secondary">{mockMyFosters.length} ativo(s)</Badge>
          </div>

          {mockMyFosters.length > 0 ? (
            <div className="space-y-4">
              {mockMyFosters.map((foster) => (
                <Card key={foster.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{foster.name}</span>
                          <Badge variant="secondary">{foster.status === "active" ? "Ativo" : "Concluído"}</Badge>
                        </CardTitle>
                        <CardDescription>{foster.breed}</CardDescription>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>Progresso: {foster.progress}%</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          Início
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(foster.startDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          Previsão de Término
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(foster.expectedEndDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          Próximo Check-up
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(foster.nextCheckup).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Progresso do Foster Care</p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${foster.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Notas Recentes</p>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{foster.notes}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Atualizar Progresso
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Contatar Instituição
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Agendar Check-up
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">Instituição: {foster.institution}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Home className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Nenhum Foster Care Ativo</h3>
                    <p className="text-muted-foreground">
                      Você ainda não tem nenhum pet em foster care. Que tal ajudar um pet em necessidade?
                    </p>
                  </div>
                  <Button onClick={() => setActiveTab("opportunities")}>Ver Oportunidades</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Application Tab */}
      {activeTab === "application" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Candidatura para Foster Care</h2>
            <p className="text-muted-foreground">Preencha o formulário abaixo para se candidatar como foster care</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações do Candidato</CardTitle>
              <CardDescription>Conte-nos sobre sua experiência e disponibilidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Experiência com Pets</Label>
                  <Select
                    value={applicationData.experience}
                    onValueChange={(value) => setApplicationData({ ...applicationData, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione sua experiência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Primeira vez</SelectItem>
                      <SelectItem value="some">Alguma experiência</SelectItem>
                      <SelectItem value="experienced">Muito experiente</SelectItem>
                      <SelectItem value="professional">Profissional da área</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Disponibilidade</Label>
                  <Select
                    value={applicationData.availability}
                    onValueChange={(value) => setApplicationData({ ...applicationData, availability: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Quanto tempo você tem?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="part-time">Meio período</SelectItem>
                      <SelectItem value="full-time">Período integral</SelectItem>
                      <SelectItem value="flexible">Flexível</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="housing">Tipo de Moradia</Label>
                  <Select
                    value={applicationData.housing}
                    onValueChange={(value) => setApplicationData({ ...applicationData, housing: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartamento</SelectItem>
                      <SelectItem value="house">Casa</SelectItem>
                      <SelectItem value="house-yard">Casa com quintal</SelectItem>
                      <SelectItem value="farm">Sítio/Chácara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duração Preferida</Label>
                  <Select
                    value={applicationData.duration}
                    onValueChange={(value) => setApplicationData({ ...applicationData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Por quanto tempo?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Curto prazo (1-2 meses)</SelectItem>
                      <SelectItem value="medium">Médio prazo (3-6 meses)</SelectItem>
                      <SelectItem value="long">Longo prazo (6+ meses)</SelectItem>
                      <SelectItem value="flexible">Flexível</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Por que quer ser Foster Care?</Label>
                <Textarea
                  id="reason"
                  value={applicationData.reason}
                  onChange={(e) => setApplicationData({ ...applicationData, reason: e.target.value })}
                  placeholder="Conte-nos sua motivação para ajudar pets em situação especial..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                <Input
                  id="emergencyContact"
                  value={applicationData.emergencyContact}
                  onChange={(e) => setApplicationData({ ...applicationData, emergencyContact: e.target.value })}
                  placeholder="Nome e telefone de contato de emergência"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="veterinarian">Veterinário de Referência</Label>
                <Input
                  id="veterinarian"
                  value={applicationData.veterinarian}
                  onChange={(e) => setApplicationData({ ...applicationData, veterinarian: e.target.value })}
                  placeholder="Nome e contato do veterinário (opcional)"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="specialCare"
                  checked={applicationData.specialCare}
                  onCheckedChange={(checked) => setApplicationData({ ...applicationData, specialCare: !!checked })}
                />
                <Label htmlFor="specialCare">
                  Tenho disponibilidade para cuidados especiais (medicação, fisioterapia, etc.)
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Informações Adicionais</Label>
                <Textarea
                  id="additionalInfo"
                  value={applicationData.additionalInfo}
                  onChange={(e) => setApplicationData({ ...applicationData, additionalInfo: e.target.value })}
                  placeholder="Qualquer informação adicional que considere relevante..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setActiveTab("opportunities")} className="bg-transparent">
                  Cancelar
                </Button>
                <Button onClick={handleApplicationSubmit}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Enviar Candidatura
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
