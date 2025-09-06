'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth-context';
import { Camera, Heart, Home, MapPin, Save, User } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: 'São Paulo, SP',
    bio: '',
    housingType: '',
    hasYard: false,
    hasOtherPets: false,
    experience: '',
    preferredSize: [] as string[],
    preferredAge: '',
    activityLevel: '',
    timeAvailable: '',
    budget: '',
  });

  const [profileCompletion, setProfileCompletion] = useState(75);

  const handleInputChange = (field: string, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Here you would save the profile data
    console.log('Saving profile:', profileData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground flex items-center space-x-2">
          <User className="h-8 w-8 text-primary" />
          <span>Meu Perfil</span>
        </h1>
        <p className="text-muted-foreground">
          Complete seu perfil para receber matches mais precisos
        </p>
      </div>

      {/* Profile Completion */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Completude do Perfil</CardTitle>
          <CardDescription>
            Quanto mais completo seu perfil, melhores serão seus matches
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Foto do Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar || '/placeholder.svg'}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
              <Button variant="outline" size="sm">
                <Camera className="mr-2 h-4 w-4" />
                Alterar Foto
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) =>
                        handleInputChange('location', e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Sobre Mim</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Conte um pouco sobre você e por que quer adotar um pet..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Housing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Informações de Moradia</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="housingType">Tipo de Moradia</Label>
                  <Select
                    value={profileData.housingType}
                    onValueChange={(value) =>
                      handleInputChange('housingType', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartamento</SelectItem>
                      <SelectItem value="house">Casa</SelectItem>
                      <SelectItem value="condo">Condomínio</SelectItem>
                      <SelectItem value="farm">Sítio/Chácara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experiência com Pets</Label>
                  <Select
                    value={profileData.experience}
                    onValueChange={(value) =>
                      handleInputChange('experience', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione sua experiência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Primeira vez</SelectItem>
                      <SelectItem value="some">Alguma experiência</SelectItem>
                      <SelectItem value="experienced">
                        Muito experiente
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasYard"
                  checked={profileData.hasYard}
                  onCheckedChange={(checked) =>
                    handleInputChange('hasYard', checked)
                  }
                />
                <Label htmlFor="hasYard">Tenho quintal ou área externa</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasOtherPets"
                  checked={profileData.hasOtherPets}
                  onCheckedChange={(checked) =>
                    handleInputChange('hasOtherPets', checked)
                  }
                />
                <Label htmlFor="hasOtherPets">Já tenho outros pets</Label>
              </div>
            </CardContent>
          </Card>

          {/* Pet Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Preferências de Pet</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredAge">Idade Preferida</Label>
                  <Select
                    value={profileData.preferredAge}
                    onValueChange={(value) =>
                      handleInputChange('preferredAge', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a idade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="puppy">Filhote (0-1 ano)</SelectItem>
                      <SelectItem value="young">Jovem (1-3 anos)</SelectItem>
                      <SelectItem value="adult">Adulto (3-7 anos)</SelectItem>
                      <SelectItem value="senior">Idoso (7+ anos)</SelectItem>
                      <SelectItem value="any">Qualquer idade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Nível de Atividade</Label>
                  <Select
                    value={profileData.activityLevel}
                    onValueChange={(value) =>
                      handleInputChange('activityLevel', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        Baixo - Prefiro pets calmos
                      </SelectItem>
                      <SelectItem value="moderate">
                        Moderado - Equilibrio entre atividade e descanso
                      </SelectItem>
                      <SelectItem value="high">
                        Alto - Adoro pets ativos e brincalhões
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeAvailable">Tempo Disponível</Label>
                  <Select
                    value={profileData.timeAvailable}
                    onValueChange={(value) =>
                      handleInputChange('timeAvailable', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Quanto tempo você tem?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="limited">
                        Limitado - Algumas horas por dia
                      </SelectItem>
                      <SelectItem value="moderate">
                        Moderado - Meio período
                      </SelectItem>
                      <SelectItem value="full">
                        Muito - Período integral
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Orçamento Mensal</Label>
                  <Select
                    value={profileData.budget}
                    onValueChange={(value) =>
                      handleInputChange('budget', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Orçamento para cuidados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básico - R$ 100-300</SelectItem>
                      <SelectItem value="moderate">
                        Moderado - R$ 300-600
                      </SelectItem>
                      <SelectItem value="premium">Premium - R$ 600+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tamanhos Preferidos</Label>
                <div className="flex flex-wrap gap-2">
                  {['Pequeno', 'Médio', 'Grande'].map((size) => (
                    <Badge
                      key={size}
                      variant={
                        profileData.preferredSize.includes(size)
                          ? 'default'
                          : 'outline'
                      }
                      className="cursor-pointer"
                      onClick={() => {
                        const newSizes = profileData.preferredSize.includes(
                          size,
                        )
                          ? profileData.preferredSize.filter((s) => s !== size)
                          : [...profileData.preferredSize, size];
                        handleInputChange('preferredSize', newSizes);
                      }}
                    >
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
              <Save className="mr-2 h-4 w-4" />
              Salvar Perfil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
