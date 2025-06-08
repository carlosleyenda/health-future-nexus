
export type DeviceType = 'thermometer' | 'scale' | 'blood_pressure' | 'glucose_meter' | 'pulse_oximeter' | 'ecg' | 'wearable' | 'sensor' | 'camera' | 'other';
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
}

export interface HealthAnalytics {
  patientId: string;
  deviceData: DeviceReading[];
  trendAnalysis: TrendAnalysis[];
  riskScores: RiskScore[];
  predictions: HealthPrediction[];
  alerts: HealthAlert[];
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
  ehrSystemId: string;
  fhirCompliant: boolean;
  hl7Version: string;
  dataMapping: DataMapping[];
  clinicalWorkflows: ClinicalWorkflow[];
  billingIntegration: BillingIntegration;
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
  deviceId: string;
  metricType: string;
  value: number;
  unit: string;
  timestamp: string;
  qualityScore: number;
  calibrationStatus: 'valid' | 'expired' | 'pending';
}

export interface EdgeComputingNode {
  id: string;
  location: string;
  connectedDevices: string[];
  processingCapabilities: string[];
  dataRetentionPolicy: string;
  securityLevel: 'basic' | 'enhanced' | 'enterprise';
}
