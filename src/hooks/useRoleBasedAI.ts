import { useAuthStore } from '@/store/auth';
import { useMemo } from 'react';

export type AICapability = 
  | 'symptom_analysis' 
  | 'drug_interactions'
  | 'medical_diagnosis'
  | 'appointment_scheduling'
  | 'patient_management'
  | 'medical_documentation'
  | 'prescription_writing'
  | 'clinical_decision_support'
  | 'inventory_management'
  | 'financial_analysis'
  | 'system_monitoring'
  | 'user_management'
  | 'analytics_reporting'
  | 'medication_dispensing'
  | 'insurance_processing'
  | 'health_education'
  | 'wellness_tracking'
  | 'emergency_detection'
  | 'patient_counseling';

export interface RoleAIConfig {
  capabilities: AICapability[];
  title: string;
  description: string;
  contextPrompt: string;
  limitations: string[];
  mainFeatures: string[];
}

export const useRoleBasedAI = () => {
  const { profile } = useAuthStore();

  const roleConfigs: Record<string, RoleAIConfig> = {
    patient: {
      capabilities: [
        'symptom_analysis', 
        'health_education', 
        'wellness_tracking',
        'appointment_scheduling',
        'emergency_detection'
      ],
      title: 'Asistente Personal de Salud',
      description: 'Tu compañero inteligente para el cuidado de tu salud',
      contextPrompt: 'Actúa como un asistente de salud personal amigable y educativo. Proporciona información de salud general, ayuda con síntomas básicos y fomenta hábitos saludables.',
      limitations: [
        'No puede prescribir medicamentos',
        'No reemplaza consulta médica profesional',
        'Solo proporciona información educativa'
      ],
      mainFeatures: [
        'Análisis básico de síntomas',
        'Educación de salud personalizada',
        'Seguimiento de bienestar',
        'Programación de citas',
        'Detección de emergencias'
      ]
    },
    doctor: {
      capabilities: [
        'medical_diagnosis',
        'prescription_writing',
        'clinical_decision_support',
        'patient_management',
        'medical_documentation',
        'drug_interactions',
        'symptom_analysis'
      ],
      title: 'Asistente Médico Profesional',
      description: 'IA avanzada para apoyo clínico y diagnóstico',
      contextPrompt: 'Actúa como un asistente médico especializado. Proporciona apoyo diagnóstico basado en evidencia, sugiere tratamientos apropiados y ayuda con documentación médica.',
      limitations: [
        'Siempre verificar diagnósticos independientemente',
        'Responsabilidad final del médico',
        'Seguir protocolos institucionales'
      ],
      mainFeatures: [
        'Diagnóstico asistido por IA',
        'Apoyo en prescripciones',
        'Documentación SOAP automática',
        'Análisis de imágenes médicas',
        'Guías clínicas actualizadas'
      ]
    },
    admin: {
      capabilities: [
        'system_monitoring',
        'user_management',
        'analytics_reporting',
        'financial_analysis',
        'inventory_management'
      ],
      title: 'Asistente Administrativo Inteligente',
      description: 'IA para gestión y análisis del sistema de salud',
      contextPrompt: 'Actúa como un asistente administrativo experto en gestión de sistemas de salud. Proporciona análisis, reportes y insights para optimización operacional.',
      limitations: [
        'Acceso limitado a datos sensibles según permisos',
        'Decisiones críticas requieren supervisión humana',
        'Cumplimiento de regulaciones de privacidad'
      ],
      mainFeatures: [
        'Monitoreo del sistema',
        'Análisis de rendimiento',
        'Reportes automatizados',
        'Gestión de usuarios',
        'Optimización de recursos'
      ]
    },
    pharmacy: {
      capabilities: [
        'medication_dispensing',
        'drug_interactions',
        'inventory_management',
        'insurance_processing',
        'patient_counseling'
      ],
      title: 'Asistente Farmacéutico Digital',
      description: 'IA especializada en farmacia y medicamentos',
      contextPrompt: 'Actúa como un asistente farmacéutico profesional. Ayuda con dispensación de medicamentos, interacciones, inventario y counseling de pacientes.',
      limitations: [
        'Verificar prescripciones médicas válidas',
        'Cumplir regulaciones farmacéuticas',
        'Supervisión profesional requerida'
      ],
      mainFeatures: [
        'Verificación de recetas',
        'Análisis de interacciones',
        'Gestión de inventario',
        'Procesamiento de seguros',
        'Educación al paciente'
      ]
    },
    enterprise: {
      capabilities: [
        'analytics_reporting',
        'financial_analysis',
        'system_monitoring',
        'user_management',
        'inventory_management'
      ],
      title: 'Asistente Empresarial de Salud',
      description: 'IA para análisis y gestión empresarial en salud',
      contextPrompt: 'Actúa como un consultor de negocios especializado en healthcare. Proporciona análisis estratégicos, métricas de rendimiento y insights empresariales.',
      limitations: [
        'Datos agregados y anonimizados',
        'Cumplimiento de regulaciones empresariales',
        'Validación de decisiones estratégicas'
      ],
      mainFeatures: [
        'Análisis de mercado',
        'Métricas de rendimiento',
        'Optimización de costos',
        'Reportes ejecutivos',
        'Planificación estratégica'
      ]
    }
  };

  const currentConfig = useMemo(() => {
    const role = profile?.role || 'patient';
    return roleConfigs[role] || roleConfigs.patient;
  }, [profile?.role]);

  const hasCapability = (capability: AICapability): boolean => {
    return currentConfig.capabilities.includes(capability);
  };

  const getContextPrompt = (additionalContext?: string): string => {
    let prompt = currentConfig.contextPrompt;
    
    if (additionalContext) {
      prompt += ` Contexto adicional: ${additionalContext}`;
    }
    
    prompt += ` Limitaciones importantes: ${currentConfig.limitations.join('. ')}.`;
    
    return prompt;
  };

  return {
    config: currentConfig,
    hasCapability,
    getContextPrompt,
    userRole: profile?.role || 'patient',
    capabilities: currentConfig.capabilities,
    isLoading: !profile
  };
};