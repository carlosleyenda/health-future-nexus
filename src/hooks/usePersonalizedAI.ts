
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AIPersonalizationService, type AIPersonality, type AIInteraction } from '@/services/ai/aiPersonalization';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';


export const usePersonalizedAI = () => {
  const { user } = useAuthStore();
  const [aiService] = useState(() => AIPersonalizationService.getInstance());
  const queryClient = useQueryClient();

  // Obtener perfil de IA del usuario
  const { data: aiPersonality, isLoading } = useQuery({
    queryKey: ['ai-personality', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      let personality = await aiService.getUserAI(user.id);
      if (!personality) {
        // Crear perfil de IA si no existe - usar datos básicos del usuario
        const userForAI = {
          id: user.id,
          email: user.email || '',
          role: 'patient' as const,
          firstName: user.user_metadata?.firstName || '',
          lastName: user.user_metadata?.lastName || '',
          isActive: true,
          onboardingCompleted: false,
          createdAt: user.created_at,
          updatedAt: user.updated_at || user.created_at
        };
        personality = await aiService.createUserAI(userForAI);
      }
      return personality;
    },
    enabled: !!user,
  });

  // Generar respuesta de IA personalizada
  const generateResponse = useMutation({
    mutationFn: async ({ context, userInput }: { context: string; userInput: string }) => {
      if (!user) throw new Error('Usuario no autenticado');
      return aiService.generatePersonalizedResponse(user.id, context, userInput);
    },
    onSuccess: () => {
      // Invalidar caché para obtener personalidad actualizada
      queryClient.invalidateQueries({ queryKey: ['ai-personality', user?.id] });
    },
    onError: (error) => {
      toast.error(`Error en IA: ${error.message}`);
    },
  });

  // Proporcionar feedback sobre respuesta de IA
  const provideFeedback = useMutation({
    mutationFn: async ({ 
      interactionId, 
      feedback, 
      effectiveness 
    }: { 
      interactionId: string; 
      feedback: 'positive' | 'negative' | 'neutral'; 
      effectiveness: number;
    }) => {
      if (!user || !aiPersonality) return;
      
      // Buscar y actualizar la interacción en el historial
      const interaction = aiPersonality.learningData.interactionHistory.find(
        int => int.id === interactionId
      );
      
      if (interaction) {
        interaction.feedback = feedback;
        interaction.effectiveness = effectiveness;
        await aiService.updateAIPersonality(user.id, interaction);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-personality', user?.id] });
      toast.success('Feedback registrado. La IA mejorará sus respuestas.');
    },
  });

  // Obtener estadísticas de la IA
  const getAIStats = () => {
    if (!aiPersonality) return null;

    const interactions = aiPersonality.learningData.interactionHistory;
    const totalInteractions = interactions.length;
    const avgEffectiveness = totalInteractions > 0 
      ? interactions.reduce((sum, int) => sum + int.effectiveness, 0) / totalInteractions 
      : 0;
    
    const positiveFeedback = interactions.filter(int => int.feedback === 'positive').length;
    const satisfactionRate = totalInteractions > 0 ? (positiveFeedback / totalInteractions) * 100 : 0;

    return {
      totalInteractions,
      avgEffectiveness: Math.round(avgEffectiveness * 10) / 10,
      satisfactionRate: Math.round(satisfactionRate),
      personalityType: aiPersonality.personalityType,
      communicationStyle: aiPersonality.communicationStyle,
      capabilities: aiPersonality.capabilities.length,
      lastUpdated: aiPersonality.updatedAt
    };
  };

  return {
    aiPersonality,
    isLoading,
    generateResponse,
    provideFeedback,
    getAIStats,
    isGenerating: generateResponse.isPending,
    error: generateResponse.error
  };
};

// Hook específico para diferentes contextos
export const useAIAssistant = (context: 'medical' | 'appointment' | 'general' | 'emergency') => {
  const { generateResponse, isGenerating } = usePersonalizedAI();

  const askAI = async (question: string) => {
    return generateResponse.mutateAsync({
      context,
      userInput: question
    });
  };

  return {
    askAI,
    isGenerating
  };
};

// Hook para IA médica especializada
export const useMedicalAI = () => {
  const { user } = useAuthStore();
  const { generateResponse } = usePersonalizedAI();

  const analyzeSymptoms = async (symptoms: string[]) => {
    const symptomsText = symptoms.join(', ');
    return generateResponse.mutateAsync({
      context: 'consultation',
      userInput: `Analizar síntomas: ${symptomsText}`
    });
  };

  const checkDrugInteractions = async (medications: string[]) => {
    const medsText = medications.join(', ');
    return generateResponse.mutateAsync({
      context: 'consultation',
      userInput: `Verificar interacciones entre medicamentos: ${medsText}`
    });
  };

  const getHealthEducation = async (topic: string) => {
    return generateResponse.mutateAsync({
      context: 'general',
      userInput: `Información educativa sobre: ${topic}`
    });
  };

  const detectEmergency = async (description: string) => {
    return generateResponse.mutateAsync({
      context: 'emergency',
      userInput: `Evaluar urgencia: ${description}`
    });
  };

  return {
    analyzeSymptoms,
    checkDrugInteractions,
    getHealthEducation,
    detectEmergency,
    canUseMedicalAI: user?.role === 'doctor' || user?.role === 'patient'
  };
};
