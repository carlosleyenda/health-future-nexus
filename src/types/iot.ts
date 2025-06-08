
// IoT Medical Device Ecosystem Types

export interface IoTMedicalDevice {
  id: string;
  patientId: string;
  deviceType: IoTDeviceType;
  category: DeviceCategory;
  brand: string;
  model: string;
  serialNumber: string;
  macAddress: string;
  firmwareVersion: string;
  hardwareVersion: string;
  connectivity: ConnectivityType[];
  batteryLevel?: number;
  signalStrength: number;
  isOnline: boolean;
  location: DeviceLocation;
  lastSync: string;
  lastHeartbeat: string;
  certifications: string[];
  fdaApproval?: string;
  ceMarking?: boolean;
  clinicalAccuracy: number;
  calibrationDate?: string;
  maintenanceSchedule: MaintenanceSchedule;
  alerts: DeviceAlert[];
  metrics: DeviceMetric[];
  settings: DeviceSettings;
  createdAt: string;
  updatedAt: string;
}

export type IoTDeviceType = 
  // Wearables
  | 'smartwatch' | 'fitness_tracker' | 'smart_ring' | 'smart_patch' | 'smart_clothing'
  // Monitoring Devices
  | 'holter_monitor' | 'cgm' | 'blood_pressure_monitor' | 'pulse_oximeter' | 'ecg_monitor'
  | 'sleep_monitor' | 'respiratory_monitor' | 'temperature_monitor'
  // Diagnostic Devices
  | 'digital_stethoscope' | 'otoscope' | 'dermascope' | 'spirometer' | 'peak_flow_meter'
  | 'glucometer' | 'coagulation_meter' | 'urine_analyzer'
  // Therapeutic Devices
  | 'tens_unit' | 'nebulizer' | 'cpap_machine' | 'insulin_pump' | 'wound_therapy_device'
  | 'compression_device' | 'light_therapy_device'
  // Environmental Monitors
  | 'air_quality_monitor' | 'uv_tracker' | 'noise_monitor' | 'humidity_monitor'
  | 'allergen_detector' | 'pollution_monitor'
  // Emergency Devices
  | 'fall_detector' | 'panic_button' | 'gps_tracker' | 'emergency_communicator'
  | 'medication_dispenser' | 'pill_reminder'
  // Specialty Devices
  | 'hearing_aid' | 'cochlear_implant' | 'pacemaker' | 'defibrillator'
  | 'prosthetic_device' | 'brain_stimulator';

export type DeviceCategory = 'wearable' | 'monitoring' | 'diagnostic' | 'therapeutic' | 'environmental' | 'emergency' | 'specialty';

export type ConnectivityType = 'bluetooth_le' | 'wifi' | 'cellular_5g' | 'cellular_4g' | 'lora' | 'zigbee' | 'z_wave' | 'nfc' | 'usb' | 'ethernet';

export interface DeviceLocation {
  room?: string;
  bodyPart?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  facility?: string;
}

export interface MaintenanceSchedule {
  calibrationFrequency: number; // days
  cleaningFrequency: number; // days
  batteryReplacementFrequency?: number; // days
  firmwareUpdateFrequency: number; // days
  lastMaintenance: string;
  nextMaintenance: string;
  maintenanceHistory: MaintenanceRecord[];
}

export interface MaintenanceRecord {
  id: string;
  type: 'calibration' | 'cleaning' | 'battery_replacement' | 'firmware_update' | 'repair';
  performedBy: string;
  performedAt: string;
  notes: string;
  cost?: number;
}

export interface DeviceAlert {
  id: string;
  type: AlertType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isResolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  actionRequired?: string;
  escalationLevel: number;
}

export type AlertType = 
  | 'battery_low' | 'battery_critical' | 'connectivity_lost' | 'calibration_needed'
  | 'maintenance_due' | 'anomaly_detected' | 'threshold_exceeded' | 'emergency_triggered'
  | 'firmware_update_available' | 'sensor_malfunction' | 'tampering_detected';

export interface DeviceMetric {
  id: string;
  timestamp: string;
  metricType: MetricType;
  value: number | string | boolean | object;
  unit?: string;
  accuracy: number;
  reliability: number;
  context?: MetricContext;
  aiAnalysis?: AIMetricAnalysis;
}

export type MetricType = 
  | 'heart_rate' | 'blood_pressure' | 'blood_glucose' | 'oxygen_saturation' | 'temperature'
  | 'respiratory_rate' | 'sleep_quality' | 'activity_level' | 'stress_level' | 'pain_level'
  | 'medication_adherence' | 'fall_detected' | 'emergency_alert' | 'air_quality' | 'uv_exposure'
  | 'noise_level' | 'humidity' | 'allergen_level' | 'step_count' | 'calories_burned'
  | 'distance_traveled' | 'heart_rhythm' | 'skin_conductance' | 'muscle_activity'
  | 'cognitive_function' | 'balance' | 'gait_analysis' | 'posture';

export interface MetricContext {
  activity?: string;
  location?: string;
  weather?: string;
  medications?: string[];
  mood?: string;
  stress?: string;
}

export interface AIMetricAnalysis {
  confidence: number;
  insights: string[];
  predictions: string[];
  recommendations: string[];
  riskFactors: string[];
  trendAnalysis: TrendAnalysis;
  anomalyScore: number;
}

export interface TrendAnalysis {
  direction: 'increasing' | 'decreasing' | 'stable' | 'fluctuating';
  slope: number;
  confidence: number;
  timeframe: string;
  significance: 'low' | 'medium' | 'high';
}

export interface DeviceSettings {
  measurementFrequency?: number; // minutes
  alertThresholds?: Record<string, { min?: number; max?: number }>;
  connectivityPreferences?: ConnectivityType[];
  privacySettings?: {
    dataSharing: boolean;
    anonymousAnalytics: boolean;
    emergencyOverride: boolean;
  };
  powerManagement?: {
    mode: 'battery_saver' | 'balanced' | 'performance';
    sleepMode: boolean;
    wakeUpTriggers: string[];
  };
  clinicalSettings?: {
    providerAccess: boolean;
    autoReporting: boolean;
    emergencyContacts: string[];
  };
}

export interface IoTDeviceNetwork {
  id: string;
  name: string;
  type: 'home' | 'clinic' | 'hospital' | 'mobile';
  devices: IoTMedicalDevice[];
  hub?: IoTHub;
  gateway?: IoTGateway;
  connectivity: NetworkConnectivity;
  security: NetworkSecurity;
  analytics: NetworkAnalytics;
  compliance: ComplianceSettings;
}

export interface IoTHub {
  id: string;
  model: string;
  firmware: string;
  connectivity: ConnectivityType[];
  processingPower: number;
  storage: number;
  edgeComputing: boolean;
  aiCapabilities: boolean;
}

export interface IoTGateway {
  id: string;
  type: 'edge' | 'cloud' | 'hybrid';
  protocols: string[];
  encryption: string[];
  throughput: number;
  latency: number;
}

export interface NetworkConnectivity {
  primaryConnection: ConnectivityType;
  backupConnections: ConnectivityType[];
  bandwidth: number;
  latency: number;
  reliability: number;
  coverage: number;
}

export interface NetworkSecurity {
  encryption: string;
  authentication: string;
  authorization: string;
  vpnEnabled: boolean;
  firewallEnabled: boolean;
  intrusionDetection: boolean;
  dataIntegrity: boolean;
  auditLogging: boolean;
}

export interface NetworkAnalytics {
  realTimeProcessing: boolean;
  edgeAnalytics: boolean;
  cloudAnalytics: boolean;
  aiModels: string[];
  dataRetention: number; // days
  analyticsFrequency: number; // minutes
}

export interface ComplianceSettings {
  hipaaCompliant: boolean;
  gdprCompliant: boolean;
  fdaCompliant: boolean;
  iso27001: boolean;
  soc2: boolean;
  dataResidency: string;
  auditTrail: boolean;
}

export interface HealthAnalytics {
  id: string;
  patientId: string;
  timeRange: {
    start: string;
    end: string;
  };
  metrics: AnalyticsMetric[];
  insights: HealthInsight[];
  predictions: HealthPrediction[];
  recommendations: HealthRecommendation[];
  riskAssessment: RiskAssessment;
  trends: HealthTrend[];
  anomalies: HealthAnomaly[];
  compliance: ComplianceMetric[];
  outcomes: HealthOutcome[];
  createdAt: string;
  aiModelVersion: string;
}

export interface AnalyticsMetric {
  type: MetricType;
  value: number;
  unit: string;
  timestamp: string;
  source: string;
  accuracy: number;
  context: MetricContext;
}

export interface HealthInsight {
  id: string;
  category: 'lifestyle' | 'medication' | 'condition' | 'behavior' | 'environment';
  title: string;
  description: string;
  confidence: number;
  evidence: string[];
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  priority: number;
}

export interface HealthPrediction {
  id: string;
  condition: string;
  probability: number;
  timeframe: string;
  confidence: number;
  riskFactors: string[];
  preventiveMeasures: string[];
  monitoringRequired: boolean;
  clinicalConsultation: boolean;
}

export interface HealthRecommendation {
  id: string;
  type: 'lifestyle' | 'medication' | 'monitoring' | 'clinical' | 'emergency';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  evidence: string[];
  expectedOutcome: string;
  timeline: string;
  resources: string[];
}

export interface RiskAssessment {
  overallScore: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  factors: RiskFactor[];
  mitigation: string[];
  monitoring: string[];
  escalation: string[];
}

export interface RiskFactor {
  factor: string;
  impact: number;
  likelihood: number;
  evidence: string[];
  modifiable: boolean;
}

export interface HealthTrend {
  metric: MetricType;
  direction: 'improving' | 'worsening' | 'stable';
  rate: number;
  significance: 'low' | 'medium' | 'high';
  timeframe: string;
  confidence: number;
}

export interface HealthAnomaly {
  id: string;
  metric: MetricType;
  value: number;
  expectedValue: number;
  deviation: number;
  severity: 'mild' | 'moderate' | 'severe';
  timestamp: string;
  possibleCauses: string[];
  recommendations: string[];
}

export interface ComplianceMetric {
  type: 'medication_adherence' | 'appointment_attendance' | 'monitoring_compliance' | 'lifestyle_adherence';
  score: number;
  target: number;
  timeframe: string;
  factors: string[];
  improvements: string[];
}

export interface HealthOutcome {
  metric: string;
  baseline: number;
  current: number;
  improvement: number;
  target: number;
  timeframe: string;
  significance: boolean;
}

export interface ClinicalIntegration {
  id: string;
  patientId: string;
  providerId: string;
  ehrIntegration: EHRIntegration;
  clinicalAlerts: ClinicalAlert[];
  remoteMonitoring: RemoteMonitoringConfig;
  clinicalTrials: ClinicalTrialParticipation[];
  outcomeMeasurement: OutcomeMeasurement;
  populationHealth: PopulationHealthData;
}

export interface EHRIntegration {
  system: 'epic' | 'cerner' | 'allscripts' | 'athenahealth' | 'eclinicalworks' | 'custom';
  hl7FhirEnabled: boolean;
  apiEndpoint: string;
  syncFrequency: number; // minutes
  dataTypes: string[];
  bidirectional: boolean;
  lastSync: string;
}

export interface ClinicalAlert {
  id: string;
  type: 'vital_sign_abnormal' | 'medication_non_adherence' | 'emergency' | 'trend_change' | 'device_malfunction';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  deviceId: string;
  autoGenerated: boolean;
  escalated: boolean;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  response?: string;
}

export interface RemoteMonitoringConfig {
  enabled: boolean;
  monitoringPlan: string;
  frequency: number; // hours
  thresholds: Record<string, { min?: number; max?: number }>;
  alertRecipients: string[];
  billingCodes: string[];
  reimbursementTracking: boolean;
}

export interface ClinicalTrialParticipation {
  trialId: string;
  trialName: string;
  phase: 'I' | 'II' | 'III' | 'IV';
  enrollmentDate: string;
  status: 'screening' | 'enrolled' | 'active' | 'completed' | 'withdrawn';
  dataCollection: TrialDataCollection;
  consentManagement: ConsentManagement;
}

export interface TrialDataCollection {
  endpoints: string[];
  frequency: number;
  devices: string[];
  biomarkers: string[];
  questionnaires: string[];
  compliance: number;
}

export interface ConsentManagement {
  consentDate: string;
  consentVersion: string;
  dataUsePermissions: string[];
  withdrawalDate?: string;
  recontactPermission: boolean;
}

export interface OutcomeMeasurement {
  primaryEndpoints: OutcomeEndpoint[];
  secondaryEndpoints: OutcomeEndpoint[];
  qualityOfLife: QualityOfLifeMetric[];
  clinicalSignificance: ClinicalSignificance;
  patientReportedOutcomes: PatientReportedOutcome[];
}

export interface OutcomeEndpoint {
  name: string;
  description: string;
  measurementType: 'continuous' | 'categorical' | 'binary' | 'time_to_event';
  unit?: string;
  baseline: number | string;
  target: number | string;
  current: number | string;
  significance: boolean;
  pValue?: number;
}

export interface QualityOfLifeMetric {
  instrument: 'SF-36' | 'EQ-5D' | 'WHOQOL' | 'custom';
  score: number;
  domain: string;
  baseline: number;
  change: number;
  minimumImportantDifference: number;
}

export interface ClinicalSignificance {
  statistically: boolean;
  clinically: boolean;
  patientMeaningful: boolean;
  costEffective: boolean;
  evidenceLevel: 'high' | 'moderate' | 'low' | 'very_low';
}

export interface PatientReportedOutcome {
  instrument: string;
  domain: string;
  score: number;
  interpretation: string;
  baseline: number;
  change: number;
  significance: boolean;
}

export interface PopulationHealthData {
  cohortId: string;
  demographics: Demographics;
  prevalence: PrevalenceData;
  outcomes: PopulationOutcome[];
  riskFactors: PopulationRiskFactor[];
  interventions: PopulationIntervention[];
  costEffectiveness: CostEffectivenessData;
}

export interface Demographics {
  ageRange: { min: number; max: number };
  gender: Record<string, number>;
  ethnicity: Record<string, number>;
  geography: Record<string, number>;
  socioeconomic: Record<string, number>;
}

export interface PrevalenceData {
  condition: string;
  prevalence: number;
  incidence: number;
  timeframe: string;
  confidence: number;
  riskFactors: string[];
}

export interface PopulationOutcome {
  metric: string;
  mean: number;
  median: number;
  standardDeviation: number;
  percentiles: Record<string, number>;
  trend: 'improving' | 'worsening' | 'stable';
}

export interface PopulationRiskFactor {
  factor: string;
  prevalence: number;
  relativeRisk: number;
  attributableRisk: number;
  populationAttributableRisk: number;
  confidence: number;
}

export interface PopulationIntervention {
  intervention: string;
  effectiveness: number;
  costPerQALY: number;
  numberNeededToTreat: number;
  adoption: number;
  barriers: string[];
}

export interface CostEffectivenessData {
  costPerPatient: number;
  costSavings: number;
  qualityAdjustedLifeYears: number;
  incrementalCostEffectivenessRatio: number;
  budgetImpact: number;
  roiTimeframe: number;
}
