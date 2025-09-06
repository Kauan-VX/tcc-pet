"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Info, Trash2, MessageCircle } from "lucide-react"

// Mock data for favorite pets
const mockFavorites = [
  {
    id: "1",
    name: "Luna",
    breed: "Golden Retriever",
    age: "2 anos",
    location: "São Paulo, SP",
    matchPercentage: 95,
    image: "/placeholder.svg?height=300&width=300&text=Luna",
    personality: ["Carinhosa", "Ativa", "Inteligente"],
    institution: "Lar dos Animais SP",
    description: "Luna é uma golden retriever muito carinhosa e ativa.",
    addedDate: "2024-01-15",
  },
  {
    id: "3",
    name: "Mimi",
    breed: "Gato Persa",
    age: "1 ano",
    location: "São Paulo, SP",
    matchPercentage: 92,
    image: "/placeholder.svg?height=300&width=300&text=Mimi",
    personality: ["Calma", "Carinhosa", "Independente"],
    institution: "Casa dos Felinos",
    description: "Mimi é uma gata persa muito elegante e carinhosa.",
    addedDate: "2024-01-10",
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavorites)

  const removeFavorite = (petId: string) => {
    setFavorites((prev) => prev.filter((pet) => pet.id !== petId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground flex items-center space-x-2">
          <Heart className="h-8 w-8 text-primary" />
          <span>Meus Favoritos</span>
        </h1>
        <p className="text-muted-foreground">Pets que você salvou para considerar mais tarde</p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((pet) => (
            <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary text-primary-foreground">{pet.matchPercentage}% match</Badge>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-heading font-semibold text-lg">{pet.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {pet.breed} • {pet.age}
                  </p>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{pet.location}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{pet.description}</p>

                <div className="flex flex-wrap gap-1">
                  {pet.personality.map((trait) => (
                    <Badge key={trait} variant="outline" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Info className="mr-2 h-4 w-4" />
                    Ver Detalhes
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFavorite(pet.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t border-border">
                  <span>Por: {pet.institution}</span>
                  <span>Salvo em {new Date(pet.addedDate).toLocaleDateString("pt-BR")}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Nenhum favorito ainda</h3>
                <p className="text-muted-foreground">
                  Quando você favoritar pets, eles aparecerão aqui para fácil acesso.
                </p>
              </div>
              <Button asChild>
                <a href="/dashboard/matches">Descobrir Pets</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
