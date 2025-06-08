
// Sistema de IA personalizada para cada usuario en la clínica virtual
import type { User } from '@/types';

export interface AIPersonality {
  id: string;
  userId: string;
  userRole: 'patient' | 'doctor' | 'admin';
  personalityType: 'empathetic' | 'analytical' | 'direct' | 'supportive';
  communicationStyle: 'formal' | 'casual' | 'medical' | 'friendly';
  expertise: string[];
  preferences: {
    language: 'es' | 'en';
    tone: 'professional' | 'warm' | 'encouraging';
    complexity: 'simple' | 'moderate' | 'advanced';
    responseLength: 'brief' | 'detailed' | 'comprehensive';
  };
  learningData: {
    interactionHistory: AIInteraction[];
    medicalPreferences: string[];
    behaviorPatterns: string[];
    successfulApproaches: string[];
  };
  capabilities: AICapability[];
  constraints: AIConstraint[];
  createdAt: string;
  updatedAt: string;
}

export interface AIInteraction {
  id: string;
  timestamp: string;
  context: 'consultation' | 'appointment' | 'health_monitoring' | 'general';
  userInput: string;
  aiResponse: string;
  feedback: 'positive' | 'negative' | 'neutral' | null;
  effectiveness: number; // 1-10
  followUpRequired: boolean;
}

export interface AICapability {
  type: 'medical_diagnosis' | 'symptom_analysis' | 'drug_interaction' | 'health_education' | 'emergency_detection' | 'appointment_optimization' | 'treatment_recommendation';
  level: 'basic' | 'intermediate' | 'advanced' | 'expert';
  specialization?: string;
  accuracy: number;
  confidence: number;
}

export interface AIConstraint {
  type: 'medical_advice' | 'prescription' | 'diagnosis' | 'emergency_response';
  description: string;
  severity: 'warning' | 'restriction' | 'prohibition';
}

export class AIPersonalizationService {
  private static instance: AIPersonalizationService;
  private personalities: Map<string, AIPersonality> = new Map();

  static getInstance(): AIPersonalizationService {
    if (!AIPersonalizationService.instance) {
      AIPersonalizationService.instance = new AIPersonalizationService();
    }
    return AIPersonalizationService.instance;
  }

  // Crear perfil de IA personalizado para nuevo usuario
  async createUserAI(user: User): Promise<AIPersonality> {
    const personality: AIPersonality = {
      id: crypto.randomUUID(),
      userId: user.id,
      userRole: user.role as 'patient' | 'doctor' | 'admin',
      personalityType: this.determinePersonalityType(user),
      communicationStyle: this.determineCommunicationStyle(user),
      expertise: this.determineExpertise(user),
      preferences: {
        language: 'es',
        tone: user.role === 'patient' ? 'warm' : 'professional',
        complexity: user.role === 'doctor' ? 'advanced' : 'moderate',
        responseLength: user.role === 'admin' ? 'comprehensive' : 'detailed'
      },
      learningData: {
        interactionHistory: [],
        medicalPreferences: [],
        behaviorPatterns: [],
        successfulApproaches: []
      },
      capabilities: this.getCapabilitiesByRole(user.role as any),
      constraints: this.getConstraintsByRole(user.role as any),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.personalities.set(user.id, personality);
    return personality;
  }

  // Obtener IA personalizada del usuario
  async getUserAI(userId: string): Promise<AIPersonality | null> {
    return this.personalities.get(userId) || null;
  }

  // Actualizar perfil de IA basado en interacciones
  async updateAIPersonality(userId: string, interaction: AIInteraction): Promise<void> {
    const personality = this.personalities.get(userId);
    if (!personality) return;

    // Agregar interacción al historial
    personality.learningData.interactionHistory.push(interaction);

    // Mantener solo las últimas 1000 interacciones
    if (personality.learningData.interactionHistory.length > 1000) {
      personality.learningData.interactionHistory = personality.learningData.interactionHistory.slice(-1000);
    }

    // Analizar patrones y actualizar personalidad
    this.analyzeAndUpdatePatterns(personality, interaction);

    personality.updatedAt = new Date().toISOString();
    this.personalities.set(userId, personality);
  }

  // Generar respuesta personalizada
  async generatePersonalizedResponse(
    userId: string, 
    context: string, 
    userInput: string
  ): Promise<string> {
    const personality = await this.getUserAI(userId);
    if (!personality) {
      throw new Error('No se encontró perfil de IA para el usuario');
    }

    // Simular generación de respuesta personalizada
    const response = await this.processWithPersonalizedAI(personality, context, userInput);
    
    // Registrar interacción
    const interaction: AIInteraction = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      context: context as any,
      userInput,
      aiResponse: response,
      feedback: null,
      effectiveness: 8, // Se actualizará con feedback del usuario
      followUpRequired: this.shouldFollowUp(context, userInput)
    };

    await this.updateAIPersonality(userId, interaction);
    
    return response;
  }

  // Procesar con IA personalizada
  private async processWithPersonalizedAI(
    personality: AIPersonality, 
    context: string, 
    userInput: string
  ): Promise<string> {
    // Simular diferentes respuestas basadas en personalidad
    const baseResponses = {
      patient: {
        empathetic: "Entiendo tu preocupación. Es completamente normal sentirse así...",
        analytical: "Basándome en los síntomas que describes, las posibles causas podrían ser...",
        direct: "Te recomiendo que...",
        supportive: "Estoy aquí para ayudarte. Juntos podemos..."
      },
      doctor: {
        empathetic: "Considera el aspecto emocional del paciente...",
        analytical: "Los datos clínicos sugieren...",
        direct: "El protocolo recomendado es...",
        supportive: "Esta es una situación compleja, pero manejable..."
      },
      admin: {
        empathetic: "Entiendo las preocupaciones del equipo...",
        analytical: "Los indicadores muestran...",
        direct: "La acción inmediata requerida es...",
        supportive: "Podemos optimizar este proceso..."
      }
    };

    const roleResponses = baseResponses[personality.userRole];
    let response = roleResponses[personality.personalityType];

    // Personalizar según preferencias
    if (personality.preferences.complexity === 'simple') {
      response = this.simplifyResponse(response);
    } else if (personality.preferences.complexity === 'advanced') {
      response = this.enhanceResponse(response, personality.expertise);
    }

    return response;
  }

  // Determinar tipo de personalidad basado en el usuario
  private determinePersonalityType(user: User): AIPersonality['personalityType'] {
    // Lógica para determinar personalidad basada en rol y datos del usuario
    switch (user.role) {
      case 'patient':
        return 'empathetic';
      case 'doctor':
        return 'analytical';
      case 'admin':
        return 'direct';
      default:
        return 'supportive';
    }
  }

  // Determinar estilo de comunicación
  private determineCommunicationStyle(user: User): AIPersonality['communicationStyle'] {
    switch (user.role) {
      case 'patient':
        return 'friendly';
      case 'doctor':
        return 'medical';
      case 'admin':
        return 'formal';
      default:
        return 'casual';
    }
  }

  // Determinar áreas de expertise
  private determineExpertise(user: User): string[] {
    switch (user.role) {
      case 'patient':
        return ['health_education', 'symptom_guidance', 'wellness_tips'];
      case 'doctor':
        return ['clinical_support', 'diagnosis_assistance', 'treatment_optimization'];
      case 'admin':
        return ['operational_efficiency', 'quality_metrics', 'resource_optimization'];
      default:
        return ['general_assistance'];
    }
  }

  // Obtener capacidades por rol
  private getCapabilitiesByRole(role: string): AICapability[] {
    const commonCapabilities: AICapability[] = [
      {
        type: 'health_education',
        level: 'intermediate',
        accuracy: 0.9,
        confidence: 0.85
      }
    ];

    switch (role) {
      case 'patient':
        return [
          ...commonCapabilities,
          {
            type: 'symptom_analysis',
            level: 'basic',
            accuracy: 0.75,
            confidence: 0.7
          },
          {
            type: 'emergency_detection',
            level: 'intermediate',
            accuracy: 0.9,
            confidence: 0.85
          }
        ];
      
      case 'doctor':
        return [
          ...commonCapabilities,
          {
            type: 'medical_diagnosis',
            level: 'advanced',
            accuracy: 0.85,
            confidence: 0.8
          },
          {
            type: 'drug_interaction',
            level: 'expert',
            accuracy: 0.95,
            confidence: 0.9
          },
          {
            type: 'treatment_recommendation',
            level: 'advanced',
            accuracy: 0.88,
            confidence: 0.82
          }
        ];
      
      case 'admin':
        return [
          ...commonCapabilities,
          {
            type: 'appointment_optimization',
            level: 'expert',
            accuracy: 0.92,
            confidence: 0.88
          }
        ];
      
      default:
        return commonCapabilities;
    }
  }

  // Obtener restricciones por rol
  private getConstraintsByRole(role: string): AIConstraint[] {
    const commonConstraints: AIConstraint[] = [
      {
        type: 'emergency_response',
        description: 'En caso de emergencia, dirigir inmediatamente a servicios médicos',
        severity: 'prohibition'
      }
    ];

    switch (role) {
      case 'patient':
        return [
          ...commonConstraints,
          {
            type: 'medical_advice',
            description: 'No proporcionar diagnósticos definitivos',
            severity: 'restriction'
          },
          {
            type: 'prescription',
            description: 'No recomendar medicamentos específicos',
            severity: 'prohibition'
          }
        ];
      
      case 'doctor':
        return [
          ...commonConstraints,
          {
            type: 'diagnosis',
            description: 'Proporcionar solo asistencia diagnóstica, no diagnósticos finales',
            severity: 'warning'
          }
        ];
      
      default:
        return commonConstraints;
    }
  }

  // Analizar patrones y actualizar personalidad
  private analyzeAndUpdatePatterns(personality: AIPersonality, interaction: AIInteraction): void {
    // Analizar efectividad de respuestas
    const recentInteractions = personality.learningData.interactionHistory.slice(-50);
    const avgEffectiveness = recentInteractions.reduce((sum, int) => sum + int.effectiveness, 0) / recentInteractions.length;

    // Ajustar estilo de comunicación basado en efectividad
    if (avgEffectiveness < 6) {
      // Cambiar enfoque si la efectividad es baja
      this.adjustCommunicationStyle(personality);
    }

    // Identificar patrones exitosos
    const successfulInteractions = recentInteractions.filter(int => int.effectiveness >= 8);
    const successPatterns = successfulInteractions.map(int => int.context);
    
    personality.learningData.successfulApproaches = [...new Set([
      ...personality.learningData.successfulApproaches,
      ...successPatterns
    ])].slice(-20); // Mantener solo los últimos 20 patrones exitosos
  }

  // Ajustar estilo de comunicación
  private adjustCommunicationStyle(personality: AIPersonality): void {
    // Rotar entre estilos si el actual no es efectivo
    const styles: AIPersonality['communicationStyle'][] = ['formal', 'casual', 'medical', 'friendly'];
    const currentIndex = styles.indexOf(personality.communicationStyle);
    const nextIndex = (currentIndex + 1) % styles.length;
    personality.communicationStyle = styles[nextIndex];
  }

  // Simplificar respuesta
  private simplifyResponse(response: string): string {
    // Lógica para simplificar el lenguaje médico
    return response.replace(/términos médicos complejos/g, 'términos simples');
  }

  // Mejorar respuesta con expertise
  private enhanceResponse(response: string, expertise: string[]): string {
    // Agregar información técnica relevante basada en expertise
    return `${response} [Información técnica adicional basada en ${expertise.join(', ')}]`;
  }

  // Determinar si se requiere seguimiento
  private shouldFollowUp(context: string, userInput: string): boolean {
    const followUpContexts = ['consultation', 'health_monitoring'];
    const urgentKeywords = ['dolor', 'emergencia', 'grave', 'urgente'];
    
    return followUpContexts.includes(context) || 
           urgentKeywords.some(keyword => userInput.toLowerCase().includes(keyword));
  }
}
