
export type DeviceType = 'thermometer' | 'scale' | 'blood_pressure' | 'glucose_meter' | 'pulse_oximeter' | 'ecg' | 'wearable' | 'sensor' | 'camera' | 'pill_dispenser' | 'environment_sensor' | 'other';
export type DeviceStatus = 'active' | 'inactive' | 'maintenance' | 'offline' | 'error';
export type ConnectivityType = 'wifi' | 'bluetooth' | 'cellular' | 'ethernet' | 'satellite' | 'lorawan' | 'nb-iot';
export type ComplianceStatus = 'compliant' | 'non-compliant' | 'pending';

export interface IoTDevice {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  isConnected: boolean;
  lastSeen: string;
  batteryLevel?: number;
  version: string;
  isResolved?: boolean;
  location?: string;
  patientId?: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  firmwareVersion: string;
  connectionType: ConnectivityType;
  dataFrequency: number; // minutes
  configuration: DeviceConfiguration;
  capabilities: DeviceCapability[];
  alerts: DeviceAlert[];
  readings: DeviceReading[];
  healthScore: number;
  maintenanceSchedule?: MaintenanceSchedule;
  complianceStatus: ComplianceStatus;
  encryptionEnabled: boolean;
  lastCalibration?: string;
  nextCalibration?: string;
  warrantyExpiry?: string;
  certifications: string[];
  powerSource: 'battery' | 'mains' | 'solar' | 'kinetic';
  expectedLifespan: number; // months
  costPerMonth: number;
  reimbursementCode?: string;
  // Additional properties for extended functionality
  isOnline?: boolean;
  signalStrength?: number;
  lastHeartbeat?: string;
  settings?: Record<string, boolean>;
  compartments?: Array<{
    id: number;
    medication: string;
    pillCount: number;
    capacity: number;
    nextDispense: string | null;
  }>;
  metrics?: Array<{
    timestamp: string;
    heartRate?: number;
    bloodPressure?: { systolic: number; diastolic: number };
    oxygenSaturation?: number;
  }>;
}

export interface IoTMedicalDevice extends IoTDevice {
  medicalSpecialty: string;
  fda510kNumber?: string;
  clinicalValidation: boolean;
  hipaaCompliant: boolean;
  interoperabilityStandards: string[];
}

export interface DeviceReading {
  timestamp: string;
  type: string;
  value: number;
  unit: string;
  deviceId: string;
}

export interface DeviceAlert {
  id: string;
  timestamp: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  deviceId: string;
  isResolved: boolean;
  title?: string;
  isRead?: boolean;
  actionRequired?: string;
  escalationLevel?: number;
}

export interface DeviceConfiguration {
  samplingRate: number;
  dataStorageLimit: number;
  alertThresholds: Record<string, number>;
  encryptionType: string;
  accessControls: string[];
}

export interface DeviceCapability {
  type: string;
  description: string;
  specifications: Record<string, any>;
}

export interface MaintenanceSchedule {
  lastMaintenance: string;
  nextMaintenance: string;
  frequency: string;
  tasks: string[];
  calibrationFrequency?: number;
  cleaningFrequency?: number;
  firmwareUpdateFrequency?: number;
  maintenanceHistory?: any[];
}

export interface HealthAnalytics {
  id: string;
  patientId: string;
  timeRange: {
    start: string;
    end: string;
  };
  metrics: DeviceReading[];
  insights: Array<{
    id: string;
    category: string;
    title: string;
    description: string;
    confidence: number;
    evidence: string[];
    impact: string;
    actionable: boolean;
    priority: number;
  }>;
  predictions: Array<{
    id: string;
    condition: string;
    probability: number;
    timeframe: string;
    confidence: number;
    riskFactors: string[];
    preventiveMeasures: string[];
    monitoringRequired: boolean;
    clinicalConsultation: boolean;
  }>;
  recommendations: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    priority: string;
    evidence: string[];
    expectedOutcome: string;
    timeline: string;
    resources: string[];
  }>;
  riskAssessment: {
    overallScore: number;
    riskLevel: string;
    factors: Array<{
      factor: string;
      impact: number;
      likelihood: number;
      evidence: string[];
      modifiable: boolean;
    }>;
    mitigation: string[];
    monitoring: string[];
    escalation: string[];
  };
  trends: Array<{
    metric: string;
    direction: string;
    rate: number;
    significance: string;
    timeframe: string;
    confidence: number;
  }>;
  anomalies: any[];
  compliance: Array<{
    type: string;
    score: number;
    target: number;
    timeframe: string;
    factors: string[];
    improvements: string[];
  }>;
  outcomes: Array<{
    metric: string;
    baseline: number;
    current: number;
    improvement: number;
    target: number;
    timeframe: string;
    significance: boolean;
  }>;
  createdAt: string;
  aiModelVersion: string;
}

export interface TrendAnalysis {
  metric: string;
  trend: 'improving' | 'stable' | 'declining';
  confidence: number;
  timeframe: string;
  dataPoints: number;
}

export interface RiskScore {
  category: string;
  score: number;
  level: 'low' | 'moderate' | 'high' | 'critical';
  factors: string[];
}

export interface HealthPrediction {
  condition: string;
  probability: number;
  timeframe: string;
  confidence: number;
  contributingFactors: string[];
}

export interface HealthAlert {
  id: string;
  type: 'vital_sign' | 'medication' | 'emergency' | 'trend';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  deviceId?: string;
  actionRequired: boolean;
}

export interface ClinicalIntegration {
  id: string;
  patientId: string;
  providerId: string;
  ehrIntegration: {
    system: string;
    hl7FhirEnabled: boolean;
    apiEndpoint: string;
    syncFrequency: number;
    dataTypes: string[];
    bidirectional: boolean;
    lastSync: string;
  };
  clinicalAlerts: any[];
  remoteMonitoring: {
    enabled: boolean;
    monitoringPlan: string;
    frequency: number;
    thresholds: Record<string, { min: number; max: number }>;
    alertRecipients: string[];
    billingCodes: string[];
    reimbursementTracking: boolean;
  };
  clinicalTrials: any[];
  outcomeMeasurement: {
    primaryEndpoints: any[];
    secondaryEndpoints: any[];
    qualityOfLife: any[];
    clinicalSignificance: {
      statistically: boolean;
      clinically: boolean;
      patientMeaningful: boolean;
      costEffective: boolean;
      evidenceLevel: string;
    };
    patientReportedOutcomes: any[];
  };
  populationHealth: {
    cohortId: string;
    demographics: {
      ageRange: { min: number; max: number };
      gender: { male: number; female: number };
      ethnicity: { hispanic: number; caucasian: number; other: number };
      geography: { urban: number; suburban: number; rural: number };
      socioeconomic: { low: number; middle: number; high: number };
    };
    prevalence: {
      condition: string;
      prevalence: number;
      incidence: number;
      timeframe: string;
      confidence: number;
      riskFactors: string[];
    };
    outcomes: any[];
    riskFactors: any[];
    interventions: any[];
    costEffectiveness: {
      costPerPatient: number;
      costSavings: number;
      qualityAdjustedLifeYears: number;
      incrementalCostEffectivenessRatio: number;
      budgetImpact: number;
      roiTimeframe: number;
    };
  };
}

export interface DataMapping {
  deviceParameter: string;
  fhirResource: string;
  transformation: string;
  validationRules: string[];
}

export interface ClinicalWorkflow {
  id: string;
  name: string;
  triggers: WorkflowTrigger[];
  actions: WorkflowAction[];
  conditions: WorkflowCondition[];
}

export interface WorkflowTrigger {
  type: 'device_reading' | 'alert' | 'time_based' | 'manual';
  parameters: Record<string, any>;
}

export interface WorkflowAction {
  type: 'notification' | 'escalation' | 'auto_order' | 'documentation';
  parameters: Record<string, any>;
}

export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains';
  value: any;
}

export interface BillingIntegration {
  rpmCodes: string[];
  reimbursementRates: Record<string, number>;
  billingFrequency: 'daily' | 'weekly' | 'monthly';
  documentationRequirements: string[];
}

export interface DeviceMetric {
  id: string;
  deviceId?: string;
  metricType: string;
  value: number;
  unit: string;
  timestamp: string;
  qualityScore: number;
  calibrationStatus?: 'valid' | 'expired' | 'pending';
  accuracy?: number;
  reliability?: number;
  context?: {
    activity: string;
    location: string;
  };
  aiAnalysis?: {
    confidence: number;
    insights: string[];
    predictions: string[];
    recommendations: string[];
    riskFactors: string[];
    trendAnalysis: {
      direction: string;
      slope: number;
      confidence: number;
      timeframe: string;
      significance: string;
    };
    anomalyScore: number;
  };
}

export interface EdgeComputingNode {
  id: string;
  location: string;
  connectedDevices: string[];
  processingCapabilities: string[];
  dataRetentionPolicy: string;
  securityLevel: 'basic' | 'enhanced' | 'enterprise';
}
