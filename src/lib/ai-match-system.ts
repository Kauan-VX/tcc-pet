// AI Match System for Adota Match
// This system analyzes user preferences and pet characteristics to generate compatibility scores

export interface UserProfile {
  id: string;
  name: string;
  location: string;
  housingType: 'apartment' | 'house' | 'condo' | 'farm';
  hasYard: boolean;
  hasOtherPets: boolean;
  experience: 'none' | 'some' | 'experienced';
  preferredSize: string[];
  preferredAge: 'puppy' | 'young' | 'adult' | 'senior' | 'any';
  activityLevel: 'low' | 'moderate' | 'high';
  timeAvailable: 'limited' | 'moderate' | 'full';
  budget: 'basic' | 'moderate' | 'premium';
  lifestyle: 'active' | 'calm' | 'social' | 'independent';
}

export interface PetProfile {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  breed: string;
  age: number;
  size: 'Pequeno' | 'Médio' | 'Grande';
  personality: string[];
  energyLevel: 'low' | 'moderate' | 'high';
  socialLevel: 'shy' | 'moderate' | 'social';
  trainingLevel: 'none' | 'basic' | 'advanced';
  specialNeeds: boolean;
  goodWithKids: boolean;
  goodWithPets: boolean;
  location: string;
  institution: string;
}

export interface MatchResult {
  petId: string;
  userId: string;
  compatibilityScore: number;
  matchFactors: {
    lifestyle: number;
    housing: number;
    experience: number;
    activity: number;
    size: number;
    location: number;
    personality: number;
  };
  recommendations: string[];
  concerns: string[];
}

class AIMatchSystem {
  // Main matching algorithm
  calculateMatch(user: UserProfile, pet: PetProfile): MatchResult {
    const factors = {
      lifestyle: this.calculateLifestyleMatch(user, pet),
      housing: this.calculateHousingMatch(user, pet),
      experience: this.calculateExperienceMatch(user, pet),
      activity: this.calculateActivityMatch(user, pet),
      size: this.calculateSizeMatch(user, pet),
      location: this.calculateLocationMatch(user, pet),
      personality: this.calculatePersonalityMatch(user, pet),
    };

    // Weighted average calculation
    const weights = {
      lifestyle: 0.2,
      housing: 0.15,
      experience: 0.15,
      activity: 0.15,
      size: 0.1,
      location: 0.1,
      personality: 0.15,
    };

    const compatibilityScore = Math.round(
      Object.entries(factors).reduce((total, [key, score]) => {
        return total + score * weights[key as keyof typeof weights];
      }, 0),
    );

    const recommendations = this.generateRecommendations(user, pet, factors);
    const concerns = this.generateConcerns(user, pet, factors);

    return {
      petId: pet.id,
      userId: user.id,
      compatibilityScore,
      matchFactors: factors,
      recommendations,
      concerns,
    };
  }

  private calculateLifestyleMatch(user: UserProfile, pet: PetProfile): number {
    let score = 100;

    // Activity level compatibility
    if (user.activityLevel === 'high' && pet.energyLevel === 'high')
      score += 10;
    if (user.activityLevel === 'low' && pet.energyLevel === 'low') score += 10;
    if (user.activityLevel === 'moderate') score += 5;

    // Time availability vs pet needs
    if (user.timeAvailable === 'full' && pet.energyLevel === 'high')
      score += 15;
    if (user.timeAvailable === 'limited' && pet.energyLevel === 'low')
      score += 10;

    // Social compatibility
    if (pet.socialLevel === 'social' && user.hasOtherPets) score += 5;
    if (pet.socialLevel === 'shy' && !user.hasOtherPets) score += 5;

    return Math.min(score, 100);
  }

  private calculateHousingMatch(user: UserProfile, pet: PetProfile): number {
    let score = 80;

    // Housing type compatibility
    if (user.housingType === 'apartment' && pet.size === 'Grande') score -= 20;
    if (user.housingType === 'house' && pet.size === 'Grande') score += 15;
    if (user.housingType === 'farm') score += 20;

    // Yard requirements
    if (user.hasYard && pet.energyLevel === 'high') score += 15;
    if (!user.hasYard && pet.size === 'Grande' && pet.energyLevel === 'high')
      score -= 25;

    // Other pets compatibility
    if (user.hasOtherPets && !pet.goodWithPets) score -= 30;
    if (user.hasOtherPets && pet.goodWithPets) score += 10;

    return Math.max(Math.min(score, 100), 0);
  }

  private calculateExperienceMatch(user: UserProfile, pet: PetProfile): number {
    let score = 85;

    // Experience vs pet training needs
    if (user.experience === 'none' && pet.trainingLevel === 'none') score -= 15;
    if (user.experience === 'experienced' && pet.trainingLevel === 'none')
      score += 15;
    if (user.experience === 'none' && pet.specialNeeds) score -= 25;

    // First-time owner considerations
    if (user.experience === 'none') {
      if (
        pet.personality.includes('Calma') ||
        pet.personality.includes('Dócil')
      )
        score += 10;
      if (
        pet.personality.includes('Teimoso') ||
        pet.personality.includes('Dominante')
      )
        score -= 15;
    }

    return Math.max(Math.min(score, 100), 0);
  }

  private calculateActivityMatch(user: UserProfile, pet: PetProfile): number {
    let score = 90;

    const activityMap = {
      low: 1,
      moderate: 2,
      high: 3,
    };

    const userActivity = activityMap[user.activityLevel];
    const petActivity = activityMap[pet.energyLevel];

    // Perfect match
    if (userActivity === petActivity) score = 100;
    // One level difference
    else if (Math.abs(userActivity - petActivity) === 1) score = 85;
    // Two levels difference
    else score = 60;

    // Time availability bonus/penalty
    if (user.timeAvailable === 'full' && pet.energyLevel === 'high')
      score += 10;
    if (user.timeAvailable === 'limited' && pet.energyLevel === 'high')
      score -= 20;

    return Math.max(Math.min(score, 100), 0);
  }

  private calculateSizeMatch(user: UserProfile, pet: PetProfile): number {
    if (user.preferredSize.length === 0) return 85; // No preference

    if (user.preferredSize.includes(pet.size)) return 100;

    // Partial match for adjacent sizes
    if (user.preferredSize.includes('Médio')) {
      if (pet.size === 'Pequeno' || pet.size === 'Grande') return 75;
    }

    return 50;
  }

  private calculateLocationMatch(user: UserProfile, pet: PetProfile): number {
    // Simple location matching - in real app, would use geolocation
    const userCity = user.location.split(',')[0].trim();
    const petCity = pet.location.split(',')[0].trim();

    if (userCity === petCity) return 100;

    // Same state
    const userState = user.location.split(',')[1]?.trim();
    const petState = pet.location.split(',')[1]?.trim();
    if (userState === petState) return 75;

    return 40; // Different states
  }

  private calculatePersonalityMatch(
    user: UserProfile,
    pet: PetProfile,
  ): number {
    let score = 80;

    // Personality compatibility matrix
    const personalityBonus: { [key: string]: string[] } = {
      Calma: ['calm', 'independent'],
      Ativa: ['active', 'social'],
      Carinhosa: ['social', 'calm'],
      Brincalhona: ['active', 'social'],
      Independente: ['independent', 'calm'],
      Sociável: ['social', 'active'],
      Protetora: ['experienced'],
      Inteligente: ['experienced', 'active'],
    };

    pet.personality.forEach((trait) => {
      const compatibleTypes = personalityBonus[trait] || [];
      if (compatibleTypes.includes(user.activityLevel)) score += 5;
      if (
        user.experience === 'experienced' &&
        compatibleTypes.includes('experienced')
      )
        score += 10;
    });

    return Math.min(score, 100);
  }

  private generateRecommendations(
    user: UserProfile,
    pet: PetProfile,
    factors: any,
  ): string[] {
    const recommendations: string[] = [];

    if (factors.activity > 90) {
      recommendations.push(
        `${pet.name} tem o nível de energia perfeito para seu estilo de vida!`,
      );
    }

    if (factors.housing > 90) {
      recommendations.push(`Sua moradia é ideal para ${pet.name}`);
    }

    if (user.experience === 'none' && pet.personality.includes('Calma')) {
      recommendations.push(
        `${pet.name} é perfeito para quem está adotando pela primeira vez`,
      );
    }

    if (factors.personality > 85) {
      recommendations.push(
        `A personalidade de ${pet.name} combina muito bem com você`,
      );
    }

    if (factors.location > 90) {
      recommendations.push(
        `${pet.name} está bem próximo de você, facilitando visitas`,
      );
    }

    return recommendations;
  }

  private generateConcerns(
    user: UserProfile,
    pet: PetProfile,
    factors: any,
  ): string[] {
    const concerns: string[] = [];

    if (factors.housing < 60) {
      concerns.push(
        `Considere se sua moradia atual é adequada para ${pet.name}`,
      );
    }

    if (factors.activity < 60) {
      concerns.push(
        `${pet.name} pode precisar de mais/menos atividade do que você está acostumado`,
      );
    }

    if (user.experience === 'none' && pet.specialNeeds) {
      concerns.push(
        `${pet.name} tem necessidades especiais que podem exigir experiência`,
      );
    }

    if (factors.location < 50) {
      concerns.push(
        `${pet.name} está em uma localização distante, considere os custos de transporte`,
      );
    }

    if (user.hasOtherPets && !pet.goodWithPets) {
      concerns.push(
        `${pet.name} pode precisar de socialização com seus outros pets`,
      );
    }

    return concerns;
  }

  // Generate matches for a user
  generateMatches(
    user: UserProfile,
    availablePets: PetProfile[],
  ): MatchResult[] {
    const matches = availablePets
      .map((pet) => this.calculateMatch(user, pet))
      .filter((match) => match.compatibilityScore >= 60) // Minimum threshold
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    return matches.slice(0, 20); // Return top 20 matches
  }

  // Update match scores based on user feedback
  updateMatchFeedback(
    matchId: string,
    feedback: 'like' | 'dislike' | 'adopt',
    userId: string,
  ) {
    // In a real implementation, this would update the ML model
    // For now, we'll just log the feedback
    console.log(
      `[AI Match System] User ${userId} gave ${feedback} feedback for match ${matchId}`,
    );

    // This feedback would be used to:
    // 1. Retrain the matching algorithm
    // 2. Adjust user preferences automatically
    // 3. Improve future match quality
  }
}

export const aiMatchSystem = new AIMatchSystem();

// Helper function to convert user profile data to the format expected by the AI system
export function createUserProfileFromData(userData: any): UserProfile {
  return {
    id: userData.id || '1',
    name: userData.name || '',
    location: userData.location || 'São Paulo, SP',
    housingType: userData.housingType || 'apartment',
    hasYard: userData.hasYard || false,
    hasOtherPets: userData.hasOtherPets || false,
    experience: userData.experience || 'none',
    preferredSize: userData.preferredSize || [],
    preferredAge: userData.preferredAge || 'any',
    activityLevel: userData.activityLevel || 'moderate',
    timeAvailable: userData.timeAvailable || 'moderate',
    budget: userData.budget || 'moderate',
    lifestyle:
      userData.activityLevel === 'high'
        ? 'active'
        : userData.activityLevel === 'low'
          ? 'calm'
          : 'social',
  };
}

// Helper function to create pet profiles from mock data
export function createPetProfileFromData(petData: any): PetProfile {
  return {
    id: petData.id,
    name: petData.name,
    species:
      petData.breed.toLowerCase().includes('gato') ||
      petData.breed.toLowerCase().includes('persa')
        ? 'cat'
        : 'dog',
    breed: petData.breed,
    age: Number.parseInt(petData.age.split(' ')[0]),
    size: petData.size,
    personality: petData.personality || [],
    energyLevel:
      petData.personality?.includes('Ativa') ||
      petData.personality?.includes('Energético')
        ? 'high'
        : petData.personality?.includes('Calma')
          ? 'low'
          : 'moderate',
    socialLevel: petData.personality?.includes('Sociável')
      ? 'social'
      : petData.personality?.includes('Tímido')
        ? 'shy'
        : 'moderate',
    trainingLevel: petData.personality?.includes('Inteligente')
      ? 'advanced'
      : 'basic',
    specialNeeds: petData.specialNeeds || false,
    goodWithKids: petData.goodWithKids !== false,
    goodWithPets: petData.goodWithPets !== false,
    location: petData.location,
    institution: petData.institution,
  };
}
