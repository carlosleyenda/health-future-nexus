
// Tipos para funcionalidades de IA avanzadas

export interface MedicalImageAnalysis {
  id: string;
  patientId: string;
  imageUrl: string;
  imageType: 'xray' | 'mri' | 'ct' | 'ultrasound' | 'dermoscopy' | 'fundoscopy';
  analysisResults: {
    findings: AIFinding[];
    confidence: number;
    processingTime: number;
    model: string;
    version: string;
  };
  doctorReview?: {
    doctorId: string;
    approved: boolean;
    comments: string;
    reviewedAt: string;
  };
  createdAt: string;
}

export interface AIFinding {
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  recommendation: string;
}

export interface SymptomAnalysis {
  id: string;
  patientId: string;
  symptoms: PatientSymptom[];
  analysis: {
    possibleConditions: PossibleCondition[];
    urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
    recommendations: string[];
    nextSteps: string[];
    disclaimers: string[];
  };
  createdAt: string;
}

export interface PatientSymptom {
  symptom: string;
  severity: number; // 1-10 scale
  duration: string;
  frequency: string;
  triggers?: string[];
  alleviatingFactors?: string[];
}

export interface PossibleCondition {
  condition: string;
  icd10Code?: string;
  snomedCode?: string;
  probability: number;
  severity: 'minor' | 'moderate' | 'serious' | 'severe';
  description: string;
  commonTreatments: string[];
}

export interface PredictiveHealthModel {
  id: string;
  patientId: string;
  modelType: 'cardiovascular_risk' | 'diabetes_progression' | 'medication_adherence' | 'readmission_risk';
  inputFeatures: Record<string, any>;
  predictions: {
    riskScore: number;
    timeframe: string;
    confidence: number;
    riskFactors: string[];
    preventiveActions: string[];
  };
  lastUpdated: string;
  nextUpdateDue: string;
}

export interface PersonalizedRecommendation {
  id: string;
  patientId: string;
  type: 'lifestyle' | 'medication' | 'follow_up' | 'preventive_care';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  evidence: {
    sources: string[];
    studyLevel: 'expert_opinion' | 'case_series' | 'cohort' | 'rct' | 'meta_analysis';
    strength: 'weak' | 'moderate' | 'strong';
  };
  actionItems: ActionItem[];
  expectedOutcome: string;
  createdAt: string;
  expiresAt?: string;
}

export interface ActionItem {
  action: string;
  frequency: string;
  duration: string;
  measurableGoal?: string;
  trackingMethod?: string;
}
