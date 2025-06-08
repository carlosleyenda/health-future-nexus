
export interface MonitoringDevice {
  id: string;
  patientId: string;
  deviceType: DeviceType;
  brand: string;
  model: string;
  serialNumber: string;
  lastSync: string;
  batteryLevel?: number;
  firmwareVersion?: string;
  isActive: boolean;
  aiAnalyticsEnabled?: boolean;
}

export type DeviceType = 
  | 'smartwatch' 
  | 'glucose_meter' 
  | 'blood_pressure_monitor' 
  | 'scale' 
  | 'pulse_oximeter' 
  | 'thermometer' 
  | 'ecg_monitor'
  | 'cgm'
  | 'holter_monitor'
  | 'sleep_apnea_device'
  | 'stress_monitor'
  | 'medication_sensor'
  | 'fall_detector'
  | 'air_quality_monitor'
  | 'uv_tracker';

export interface HealthMetric {
  id: string;
  patientId: string;
  deviceId?: string;
  metricType: HealthMetricType;
  value: number;
  unit: string;
  recordedAt: string;
  aiAnalysis?: AIAnalysis;
  riskLevel?: RiskLevel;
  trends?: TrendAnalysis;
}

export type HealthMetricType = 
  | 'heart_rate' 
  | 'blood_pressure_systolic' 
  | 'blood_pressure_diastolic'
  | 'glucose_level' 
  | 'weight' 
  | 'temperature' 
  | 'oxygen_saturation'
  | 'steps' 
  | 'sleep_hours' 
  | 'calories_burned'
  | 'stress_level'
  | 'blood_glucose_continuous'
  | 'ecg_rhythm'
  | 'respiratory_rate'
  | 'blood_ketones'
  | 'hydration_level';

export interface AIAnalysis {
  id: string;
  analysisType: AIAnalysisType;
  confidence: number;
  insights: string[];
  recommendations: string[];
  riskFactors?: string[];
  trends?: TrendAnalysis;
  predictiveScores?: PredictiveScore[];
  createdAt: string;
}

export type AIAnalysisType = 
  | 'symptom_analysis'
  | 'risk_prediction'
  | 'treatment_optimization'
  | 'drug_interaction'
  | 'lifestyle_impact'
  | 'genetic_analysis'
  | 'image_analysis'
  | 'ecg_analysis'
  | 'voice_analysis'
  | 'behavior_pattern';

export interface PredictiveScore {
  condition: string;
  score: number;
  timeframe: string;
  confidence: number;
  factors: string[];
}

export interface TrendAnalysis {
  direction: 'increasing' | 'decreasing' | 'stable' | 'fluctuating';
  percentage: number;
  timeframe: string;
  significance: 'low' | 'medium' | 'high';
}

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';
