export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  isActive: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole =
  | 'patient'
  | 'doctor'
  | 'specialist'
  | 'admin'
  | 'coordinator'
  | 'delivery_staff'
  | 'pharmacist';

// Nuevos tipos para el sistema expandido
export interface PatientProfile extends User {
  dateOfBirth: string;
  gender: Gender;
  bloodType: BloodType;
  emergencyContact: EmergencyContact;
  insurance: InsuranceInfo;
  address: Address;
  healthScore?: number;
  riskPredictions?: RiskPrediction[];
  familyConnections?: string[];
  virtualAssistantEnabled?: boolean;
}

export interface DoctorProfile extends User {
  medicalLicense: string;
  specialties: Specialty[];
  yearsExperience: number;
  education: Education[];
  certifications: Certification[];
  consultationFee: number;
  bio: string;
  languages: Language[];
  isVerified: boolean;
  rating: number;
  totalReviews: number;
  practiceType: PracticeType;
  internationalLicense?: boolean;
  researchInterests?: string[];
  aiToolsEnabled?: boolean;
}

// Sistemas de Monitoreo IoT Expandido
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

// Sistema Financiero Integral
export interface HealthWallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  healthCoins: number;
  cashbackEarned: number;
  loyaltyTier: LoyaltyTier;
  hsaConnected?: boolean;
  cryptoEnabled?: boolean;
  autoPayEnabled?: boolean;
}

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface FinancialTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description: string;
  appointmentId?: string;
  deliveryServiceId?: string;
  pharmacyOrderId?: string;
  createdAt: string;
  completedAt?: string;
  paymentMethod: PaymentMethod;
  healthCoinsEarned?: number;
}

export type TransactionType = 
  | 'consultation'
  | 'prescription'
  | 'delivery_service'
  | 'pharmacy_order'
  | 'insurance_claim'
  | 'refund'
  | 'cashback'
  | 'health_coins'
  | 'subscription'
  | 'medical_loan';

export type PaymentMethod = 
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'digital_wallet'
  | 'cryptocurrency'
  | 'health_coins'
  | 'insurance'
  | 'hsa_fsa'
  | 'medical_financing';

// Delivery Médico Premium
export interface DeliveryService {
  id: string;
  patientId: string;
  serviceType: DeliveryServiceType;
  staffId?: string;
  scheduledDate: string;
  address: Address;
  coordinates?: Coordinates;
  status: DeliveryStatus;
  priority: ServicePriority;
  estimatedCost: number;
  actualCost?: number;
  notes?: string;
  equipmentRequired?: string[];
  specialInstructions?: string;
  trackingUrl?: string;
  rating?: number;
  createdAt: string;
}

export type DeliveryStatus = 
  | 'requested'
  | 'assigned'
  | 'in_transit'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type DeliveryServiceType = 
  | 'home_consultation'
  | 'specialist_visit'
  | 'nursing_care'
  | 'sample_collection'
  | 'medication_delivery'
  | 'device_installation'
  | 'emergency_care'
  | 'mobile_lab'
  | 'mobile_imaging'
  | 'mobile_surgery'
  | 'icu_transport'
  | 'dialysis_mobile'
  | 'mental_health_crisis'
  | 'addiction_treatment'
  | 'geriatric_care'
  | 'pediatric_care';

export type ServicePriority = 'low' | 'normal' | 'high' | 'urgent' | 'emergency';

// Red de Farmacias Avanzada
export interface Pharmacy {
  id: string;
  name: string;
  chain?: string;
  address: Address;
  coordinates: Coordinates;
  phone: string;
  email?: string;
  workingHours: WorkingHours;
  services: PharmacyService[];
  deliveryAvailable: boolean;
  droneDeliveryEnabled?: boolean;
  coldChainCapable?: boolean;
  compoundingServices?: boolean;
  specialtyMedications?: boolean;
  vaccinations?: boolean;
  rating: number;
  totalReviews: number;
  isActive: boolean;
}

export type PharmacyService = 
  | 'prescription_filling'
  | 'otc_medications'
  | 'medical_devices'
  | 'vaccinations'
  | 'health_screenings'
  | 'compounding'
  | 'specialty_drugs'
  | 'home_infusion'
  | 'veterinary_meds'
  | 'medication_therapy'
  | 'adherence_monitoring'
  | 'clinical_services';

export interface PharmacyOrder {
  id: string;
  patientId: string;
  pharmacyId: string;
  prescriptionIds: string[];
  orderItems: OrderItem[];
  totalAmount: number;
  deliveryAddress?: Address;
  deliveryMethod: DeliveryMethod;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  notes?: string;
  createdAt: string;
}

export type DeliveryMethod = 'pickup' | 'delivery' | 'drone' | 'mail' | 'courier';
export type OrderStatus = 'pending' | 'processing' | 'ready' | 'shipped' | 'delivered' | 'cancelled';

// Inteligencia Artificial y Analytics
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

// Servicios Premium y Marketplace
export interface MarketplaceService {
  id: string;
  providerId: string;
  serviceType: MarketplaceServiceType;
  title: string;
  description: string;
  price: number;
  currency: string;
  duration?: number;
  availability: Availability[];
  rating: number;
  totalBookings: number;
  languages: Language[];
  certifications?: string[];
  isActive: boolean;
}

export type MarketplaceServiceType = 
  | 'second_opinion'
  | 'wellness_coaching'
  | 'nutrition_consulting'
  | 'fitness_training'
  | 'mental_health'
  | 'aesthetic_medicine'
  | 'medical_tourism'
  | 'genetic_counseling'
  | 'alternative_medicine'
  | 'chronic_care_management'
  | 'eldercare_services'
  | 'pediatric_development';

// Sistema de Investigación y Educación
export interface ClinicalTrial {
  id: string;
  title: string;
  description: string;
  phase: TrialPhase;
  condition: string;
  eligibilityCriteria: string[];
  principalInvestigator: string;
  institution: string;
  startDate: string;
  endDate?: string;
  status: TrialStatus;
  participantCount: number;
  maxParticipants: number;
  compensation?: number;
  location: Address;
  contactInfo: ContactInfo;
}

export type TrialPhase = 'preclinical' | 'phase_1' | 'phase_2' | 'phase_3' | 'phase_4';
export type TrialStatus = 'recruiting' | 'active' | 'completed' | 'suspended' | 'terminated';

// Tipos de apoyo y utilidad
export interface WorkingHours {
  [key: string]: {
    open: string;
    close: string;
    isOpen: boolean;
  };
}

export interface Availability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timezone: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

export interface OrderItem {
  medicationName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  prescriptionId?: string;
}

export interface TrendAnalysis {
  direction: 'increasing' | 'decreasing' | 'stable' | 'fluctuating';
  percentage: number;
  timeframe: string;
  significance: 'low' | 'medium' | 'high';
}

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';
export type PracticeType = 'individual' | 'group' | 'hospital' | 'clinic' | 'telemedicine_only';

// Interfaces existentes expandidas
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: Coordinates;
}

export interface RiskPrediction {
  condition: string;
  probability: number;
  timeframe: string;
  riskFactors: string[];
  preventiveMeasures: string[];
}

export type Gender = 'male' | 'female' | 'other';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
}

export type Specialty =
  | 'general_medicine'
  | 'cardiology'
  | 'dermatology'
  | 'endocrinology'
  | 'gynecology'
  | 'neurology'
  | 'pediatrics'
  | 'psychiatry';

export type Language = 'spanish' | 'english' | 'french' | 'portuguese';

export interface Education {
  institution: string;
  degree: string;
  graduationDate: string;
}

export interface Certification {
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
}

export type AppointmentType = 'virtual' | 'in_person' | 'home_visit' | 'emergency';
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show' | 'rescheduled';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
