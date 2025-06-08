
// Tipos para Automatización Avanzada

export interface DroneDelivery {
  id: string;
  orderId: string;
  droneId: string;
  status: 'assigned' | 'in_transit' | 'delivered' | 'returned' | 'failed';
  pickupLocation: Coordinates;
  deliveryLocation: Coordinates;
  estimatedDelivery: string;
  actualDelivery?: string;
  flightPath: Coordinates[];
  weatherConditions: WeatherConditions;
  emergencyProtocols: EmergencyProtocol[];
  batteryLevel: number;
  payloadWeight: number;
  maxPayload: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface WeatherConditions {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  conditions: 'clear' | 'cloudy' | 'rain' | 'snow' | 'fog' | 'storm';
  flyable: boolean;
}

export interface EmergencyProtocol {
  type: 'low_battery' | 'bad_weather' | 'obstacle' | 'system_failure';
  action: string;
  priority: number;
  executed: boolean;
  timestamp?: string;
}

export interface PharmacyRobot {
  id: string;
  robotType: 'dispensing' | 'packaging' | 'inventory' | 'quality_control';
  status: 'idle' | 'working' | 'maintenance' | 'error';
  location: string;
  currentTask?: RobotTask;
  queue: RobotTask[];
  performance: RobotPerformance;
  lastMaintenance: string;
  nextMaintenance: string;
}

export interface RobotTask {
  id: string;
  type: 'dispense' | 'package' | 'count' | 'restock' | 'quality_check';
  medication: MedicationInfo;
  quantity: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedTime: number;
  startTime?: string;
  completionTime?: string;
  status: 'queued' | 'in_progress' | 'completed' | 'failed';
  errorMessage?: string;
}

export interface MedicationInfo {
  id: string;
  name: string;
  dosage: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  location: string;
  barcode: string;
}

export interface RobotPerformance {
  tasksCompleted: number;
  averageTime: number;
  errorRate: number;
  uptime: number;
  efficiency: number;
  accuracy: number;
}

export interface TriageAI {
  id: string;
  patientId: string;
  symptoms: TriageSymptom[];
  vitalSigns: VitalSigns;
  assessment: TriageAssessment;
  recommendation: TriageRecommendation;
  confidence: number;
  timestamp: string;
  reviewedBy?: string;
  overridden: boolean;
}

export interface TriageSymptom {
  symptom: string;
  severity: number;
  duration: string;
  onset: 'sudden' | 'gradual';
  quality: string[];
  location?: string;
  radiation?: string;
  aggravatingFactors?: string[];
  relievingFactors?: string[];
}

export interface VitalSigns {
  temperature?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  heartRate?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  painScale?: number;
  consciousness?: 'alert' | 'confused' | 'drowsy' | 'unconscious';
}

export interface TriageAssessment {
  urgency: 'immediate' | 'urgent' | 'less_urgent' | 'non_urgent';
  category: TriageCategory;
  riskFactors: string[];
  redFlags: string[];
  differentialDiagnosis: string[];
  estimatedWaitTime: number;
}

export interface TriageCategory {
  level: 1 | 2 | 3 | 4 | 5;
  description: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue';
  maxWaitTime: number;
}

export interface TriageRecommendation {
  disposition: 'emergency' | 'urgent_care' | 'primary_care' | 'self_care' | 'specialist';
  specialty?: string;
  timeframe: string;
  instructions: string[];
  followUp: boolean;
  medications?: string[];
  tests?: string[];
}
