import {
  aiMatchSystem,
  createPetProfileFromData,
  createUserProfileFromData,
} from '@/lib/ai-match-system';
import { type NextRequest, NextResponse } from 'next/server';

// Mock data - in real app, this would come from database
const mockPets = [
  {
    id: '1',
    name: 'Luna',
    breed: 'Golden Retriever',
    age: '2 anos',
    size: 'Grande',
    location: 'São Paulo, SP',
    personality: ['Carinhosa', 'Ativa', 'Inteligente', 'Sociável'],
    institution: 'Lar dos Animais SP',
    specialNeeds: false,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: '2',
    name: 'Max',
    breed: 'Labrador Mix',
    age: '3 anos',
    size: 'Grande',
    location: 'São Paulo, SP',
    personality: ['Brincalhão', 'Leal', 'Protetor', 'Energético'],
    institution: 'Amigos de Quatro Patas',
    specialNeeds: false,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: '3',
    name: 'Mimi',
    breed: 'Gato Persa',
    age: '1 ano',
    size: 'Pequeno',
    location: 'São Paulo, SP',
    personality: ['Calma', 'Carinhosa', 'Independente', 'Elegante'],
    institution: 'Casa dos Felinos',
    specialNeeds: false,
    goodWithKids: true,
    goodWithPets: false,
  },
];

export async function POST(request: NextRequest) {
  try {
    const { userProfile } = await request.json();

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile is required' },
        { status: 400 },
      );
    }

    // Convert user data to AI system format
    const aiUserProfile = createUserProfileFromData(userProfile);

    // Convert pet data to AI system format
    const petProfiles = mockPets.map((pet) => createPetProfileFromData(pet));

    // Generate matches using AI system
    const matches = aiMatchSystem.generateMatches(aiUserProfile, petProfiles);

    // Enhance pet data with match information
    const enhancedPets = mockPets
      .map((pet) => {
        const match = matches.find((m) => m.petId === pet.id);
        return {
          ...pet,
          matchPercentage: match?.compatibilityScore || 0,
          aiMatch: match,
          recommendations: match?.recommendations || [],
          concerns: match?.concerns || [],
          matchFactors: match?.matchFactors || {},
        };
      })
      .filter((pet) => pet.matchPercentage >= 60) // Only return pets with 60%+ compatibility
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    return NextResponse.json({
      success: true,
      matches: enhancedPets,
      totalMatches: enhancedPets.length,
    });
  } catch (error) {
    console.error('Error generating matches:', error);
    return NextResponse.json(
      { error: 'Failed to generate matches' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { matchId, feedback, userId } = await request.json();

    if (!matchId || !feedback || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Update match feedback in AI system
    aiMatchSystem.updateMatchFeedback(matchId, feedback, userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating match feedback:', error);
    return NextResponse.json(
      { error: 'Failed to update feedback' },
      { status: 500 },
    );
  }
}
