'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  aiMatchSystem,
  createPetProfileFromData,
  createUserProfileFromData,
} from '@/lib/ai-match-system';
import { Filter, Heart, Info, MapPin, Search, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

// Mock data for pets
const mockPets = [
  {
    id: '1',
    name: 'Luna',
    breed: 'Golden Retriever',
    age: '2 anos',
    size: 'Grande',
    location: 'São Paulo, SP',
    matchPercentage: 95,
    image: '/placeholder.svg?height=300&width=300&text=Luna',
    personality: ['Carinhosa', 'Ativa', 'Inteligente', 'Sociável'],
    institution: 'Lar dos Animais SP',
    description:
      'Luna é uma golden retriever muito carinhosa e ativa. Adora brincar e é ótima com crianças.',
    vaccinated: true,
    neutered: true,
    specialNeeds: false,
  },
  {
    id: '2',
    name: 'Max',
    breed: 'Labrador Mix',
    age: '3 anos',
    size: 'Grande',
    location: 'São Paulo, SP',
    matchPercentage: 88,
    image: '/placeholder.svg?height=300&width=300&text=Max',
    personality: ['Brincalhão', 'Leal', 'Protetor', 'Energético'],
    institution: 'Amigos de Quatro Patas',
    description:
      'Max é um labrador mix muito leal e protetor. Perfeito para famílias ativas.',
    vaccinated: true,
    neutered: true,
    specialNeeds: false,
  },
  {
    id: '3',
    name: 'Mimi',
    breed: 'Gato Persa',
    age: '1 ano',
    size: 'Pequeno',
    location: 'São Paulo, SP',
    matchPercentage: 92,
    image: '/placeholder.svg?height=300&width=300&text=Mimi',
    personality: ['Calma', 'Carinhosa', 'Independente', 'Elegante'],
    institution: 'Casa dos Felinos',
    description:
      'Mimi é uma gata persa muito elegante e carinhosa. Ideal para quem busca um companheiro tranquilo.',
    vaccinated: true,
    neutered: true,
    specialNeeds: false,
  },
  {
    id: '4',
    name: 'Buddy',
    breed: 'Beagle',
    age: '4 anos',
    size: 'Médio',
    location: 'São Paulo, SP',
    matchPercentage: 85,
    image: '/placeholder.svg?height=300&width=300&text=Buddy',
    personality: ['Amigável', 'Curioso', 'Brincalhão', 'Inteligente'],
    institution: 'Lar dos Animais SP',
    description:
      'Buddy é um beagle muito amigável e curioso. Adora explorar e fazer novos amigos.',
    vaccinated: true,
    neutered: false,
    specialNeeds: false,
  },
];

export default function MatchesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [ageRange, setAgeRange] = useState([0, 10]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [aiMatches, setAiMatches] = useState<any[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);

  useEffect(() => {
    const generateAIMatches = async () => {
      setIsLoadingMatches(true);

      const mockUserProfile = {
        id: '1',
        name: 'João Silva',
        location: 'São Paulo, SP',
        housingType: 'apartment' as const,
        hasYard: false,
        hasOtherPets: false,
        experience: 'some' as const,
        preferredSize: ['Médio', 'Grande'],
        preferredAge: 'young' as const,
        activityLevel: 'moderate' as const,
        timeAvailable: 'moderate' as const,
        budget: 'moderate' as const,
      };

      const userProfile = createUserProfileFromData(mockUserProfile);
      const petProfiles = mockPets.map((pet) => createPetProfileFromData(pet));

      const matches = aiMatchSystem.generateMatches(userProfile, petProfiles);

      const enhancedPets = mockPets
        .map((pet) => {
          const match = matches.find((m) => m.petId === pet.id);
          return {
            ...pet,
            matchPercentage: match?.compatibilityScore || pet.matchPercentage,
            aiMatch: match,
            recommendations: match?.recommendations || [],
            concerns: match?.concerns || [],
          };
        })
        .sort((a, b) => b.matchPercentage - a.matchPercentage);

      setAiMatches(enhancedPets);
      setIsLoadingMatches(false);
    };

    generateAIMatches();
  }, []);

  const toggleFavorite = (petId: string) => {
    setFavorites((prev) =>
      prev.includes(petId)
        ? prev.filter((id) => id !== petId)
        : [...prev, petId],
    );

    const feedback = favorites.includes(petId) ? 'dislike' : 'like';
    aiMatchSystem.updateMatchFeedback(petId, feedback, '1');
  };

  const petsToFilter = aiMatches.length > 0 ? aiMatches : mockPets;

  const filteredPets = petsToFilter.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBreed =
      selectedBreed === 'all' ||
      pet.breed.toLowerCase().includes(selectedBreed.toLowerCase());
    const matchesSize = selectedSize === 'all' || pet.size === selectedSize;
    const petAge = Number.parseInt(pet.age.split(' ')[0]);
    const matchesAge = petAge >= ageRange[0] && petAge <= ageRange[1];

    return matchesSearch && matchesBreed && matchesSize && matchesAge;
  });

  if (isLoadingMatches) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary animate-spin" />
            <span>Gerando Seus Matches</span>
          </h1>
          <p className="text-muted-foreground">
            Nossa IA está analisando seu perfil para encontrar os pets
            perfeitos...
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-muted"></div>
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <span>Seus Matches</span>
        </h1>
        <p className="text-muted-foreground">
          Pets selecionados especialmente para você pela nossa IA
        </p>
        {aiMatches.length > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
            <p className="text-sm text-primary font-medium">
              ✨ Nossa IA analisou {aiMatches.length} pets e encontrou{' '}
              {filteredPets.length} matches perfeitos para você!
            </p>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros de Busca</CardTitle>
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
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtros Avançados
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <label className="text-sm font-medium">Raça</label>
                <Select value={selectedBreed} onValueChange={setSelectedBreed}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as raças" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as raças</SelectItem>
                    <SelectItem value="golden">Golden Retriever</SelectItem>
                    <SelectItem value="labrador">Labrador</SelectItem>
                    <SelectItem value="beagle">Beagle</SelectItem>
                    <SelectItem value="persa">Gato Persa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tamanho</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Idade (anos)</label>
                <div className="px-2">
                  <Slider
                    value={ageRange}
                    onValueChange={setAgeRange}
                    max={10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{ageRange[0]} anos</span>
                    <span>{ageRange[1]} anos</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            {filteredPets.length} pets encontrados
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Ordenado por compatibilidade IA</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <Card
              key={pet.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={pet.image || '/placeholder.svg'}
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Badge
                    className={`${
                      pet.matchPercentage >= 90
                        ? 'bg-green-500'
                        : pet.matchPercentage >= 80
                          ? 'bg-blue-500'
                          : pet.matchPercentage >= 70
                            ? 'bg-yellow-500'
                            : 'bg-gray-500'
                    } text-white flex items-center space-x-1`}
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>{pet.matchPercentage}% match</span>
                  </Badge>
                  <Button
                    size="sm"
                    variant={
                      favorites.includes(pet.id) ? 'default' : 'secondary'
                    }
                    className="h-8 w-8 p-0"
                    onClick={() => toggleFavorite(pet.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(pet.id) ? 'fill-current' : ''}`}
                    />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-heading font-semibold text-lg">
                    {pet.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {pet.breed} • {pet.age}
                  </p>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{pet.location}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {pet.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {pet.personality.slice(0, 3).map((trait: any) => (
                    <Badge key={trait} variant="outline" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
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

                {pet.recommendations && pet.recommendations.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                    <p className="text-xs text-green-700 font-medium mb-1">
                      ✅ Por que é um bom match:
                    </p>
                    <p className="text-xs text-green-600">
                      {pet.recommendations[0]}
                    </p>
                  </div>
                )}

                {pet.concerns && pet.concerns.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                    <p className="text-xs text-yellow-700 font-medium mb-1">
                      ⚠️ Considere:
                    </p>
                    <p className="text-xs text-yellow-600">{pet.concerns[0]}</p>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <Info className="mr-2 h-4 w-4" />
                    Detalhes
                  </Button>
                  <Button size="sm" className="flex-1">
                    Candidatar-se
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Por: {pet.institution}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Nenhum pet encontrado</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar seus filtros de busca para encontrar mais
                    pets.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedBreed('all');
                    setSelectedSize('all');
                    setAgeRange([0, 10]);
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
  );
}
