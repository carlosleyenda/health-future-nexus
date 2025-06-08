
// Medication Management Types

export interface Medication {
  id: string;
  name: string;
  genericName?: string;
  brandName?: string;
  ndcCode?: string;
  dosage: string;
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'topical' | 'inhaler' | 'patch';
  strength: string;
  manufacturer: string;
  category: 'prescription' | 'otc' | 'controlled';
  controlledSubstanceSchedule?: 'I' | 'II' | 'III' | 'IV' | 'V';
  pregnancyCategory?: 'A' | 'B' | 'C' | 'D' | 'X';
  isGenericAvailable: boolean;
  averagePrice: number;
  currency: string;
  interactions: string[];
  contraindications: string[];
  sideEffects: string[];
  warnings: string[];
  storageInstructions: string;
  expirationDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientMedication {
  id: string;
  patientId: string;
  medicationId: string;
  prescriptionId?: string;
  doctorId: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  adherenceScore: number;
  lastTaken?: string;
  nextDue?: string;
  totalDoses: number;
  takenDoses: number;
  missedDoses: number;
  sideEffectsReported: string[];
  effectivenessRating?: number;
  notes: string;
  autoRefill: boolean;
  refillsRemaining: number;
  pharmacy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SmartDispenser {
  id: string;
  patientId: string;
  deviceId: string;
  name: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  firmwareVersion: string;
  batteryLevel: number;
  connectivity: 'wifi' | 'bluetooth' | 'cellular';
  isOnline: boolean;
  location: string;
  compartments: SmartCompartment[];
  lastSync: string;
  alerts: DispenserAlert[];
  settings: {
    soundAlerts: boolean;
    visualAlerts: boolean;
    dosageReminders: boolean;
    lowStockWarnings: boolean;
    tamperAlerts: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SmartCompartment {
  id: string;
  compartmentNumber: number;
  medicationId?: string;
  pillCount: number;
  capacity: number;
  nextDispenseTime?: string;
  dosesPerDispense: number;
  isLocked: boolean;
  sensorStatus: 'working' | 'error' | 'maintenance';
  lastRefilled: string;
  expirationDate?: string;
}

export interface DispenserAlert {
  id: string;
  type: 'low_stock' | 'missed_dose' | 'tamper_detected' | 'device_offline' | 'battery_low' | 'error';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  isRead: boolean;
  isResolved: boolean;
  createdAt: string;
  resolvedAt?: string;
}

export interface AdherenceReport {
  id: string;
  patientId: string;
  reportPeriod: {
    start: string;
    end: string;
  };
  overallScore: number;
  medicationScores: {
    medicationId: string;
    score: number;
    totalDoses: number;
    takenDoses: number;
    missedDoses: number;
    onTimeDoses: number;
    lateDoses: number;
  }[];
  insights: string[];
  recommendations: string[];
  riskFactors: string[];
  interventions: string[];
  doctorNotified: boolean;
  caregiverNotified: boolean;
  insuranceReported: boolean;
  createdAt: string;
}

export interface MedicationInteraction {
  id: string;
  medication1Id: string;
  medication2Id: string;
  interactionType: 'major' | 'moderate' | 'minor';
  severity: 'contraindicated' | 'serious' | 'significant' | 'minor';
  description: string;
  mechanism: string;
  clinicalEffects: string[];
  management: string;
  monitoring: string[];
  alternatives: string[];
  evidenceLevel: 'established' | 'probable' | 'suspected' | 'possible';
  sources: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdverseEventReport {
  id: string;
  patientId: string;
  medicationId: string;
  eventType: 'side_effect' | 'allergic_reaction' | 'serious_event' | 'death';
  severity: 'mild' | 'moderate' | 'severe' | 'life_threatening' | 'fatal';
  description: string;
  symptoms: string[];
  onset: string;
  duration?: string;
  outcome: 'recovered' | 'recovering' | 'ongoing' | 'fatal' | 'unknown';
  actionTaken: 'none' | 'dose_reduced' | 'discontinued' | 'hospitalized' | 'other';
  dechallenge: boolean;
  rechallenge?: boolean;
  concomitantMedications: string[];
  medicalHistory: string[];
  reportedBy: string;
  reportedTo: 'fda' | 'manufacturer' | 'doctor' | 'none';
  seriousness: boolean;
  fdaReportNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TherapeuticMonitoring {
  id: string;
  patientId: string;
  medicationId: string;
  testType: 'drug_level' | 'efficacy_marker' | 'safety_marker' | 'genetic_test';
  testName: string;
  targetRange: {
    min: number;
    max: number;
    unit: string;
  };
  results: {
    value: number;
    unit: string;
    date: string;
    interpretation: 'below_range' | 'therapeutic' | 'above_range' | 'toxic';
  }[];
  recommendations: string[];
  nextTestDate?: string;
  frequency: string;
  clinicalNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SmartPackaging {
  id: string;
  medicationId: string;
  packageType: 'bottle' | 'blister' | 'pouch' | 'vial' | 'tube';
  rfidTag?: string;
  qrCode?: string;
  nfcEnabled: boolean;
  tamperEvident: boolean;
  childResistant: boolean;
  isAuthentic: boolean;
  manufacturingDate: string;
  expirationDate: string;
  batchNumber: string;
  serialNumber: string;
  temperature: {
    current: number;
    min: number;
    max: number;
    breaches: number;
  };
  humidity: {
    current: number;
    breaches: number;
  };
  lightExposure: {
    current: number;
    breaches: number;
  };
  openingHistory: {
    timestamp: string;
    duration: number;
  }[];
  locationHistory: {
    timestamp: string;
    location: string;
    gps?: {
      latitude: number;
      longitude: number;
    };
  }[];
  isDisposed: boolean;
  disposalMethod?: string;
  disposalDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IoTSensor {
  id: string;
  deviceType: 'pill_dispenser' | 'smart_bottle' | 'wearable' | 'environment_sensor';
  patientId: string;
  name: string;
  model: string;
  firmwareVersion: string;
  batteryLevel: number;
  signalStrength: number;
  isOnline: boolean;
  lastHeartbeat: string;
  metrics: {
    timestamp: string;
    data: Record<string, any>;
  }[];
  alerts: {
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
    acknowledged: boolean;
  }[];
  configuration: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface MedicationAIInsight {
  id: string;
  type: 'adherence_prediction' | 'side_effect_prediction' | 'efficacy_prediction' | 'dosing_optimization' | 'drug_recommendation';
  patientId: string;
  medicationId?: string;
  confidence: number;
  prediction: any;
  reasoning: string[];
  dataPoints: string[];
  recommendations: string[];
  riskFactors: string[];
  followUpActions: string[];
  validUntil: string;
  modelVersion: string;
  createdAt: string;
}
