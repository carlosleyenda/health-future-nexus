
// Tipos para Mercado Global de Salud

export interface GlobalDoctor {
  id: string;
  userId: string;
  licenseNumber: string;
  country: string;
  languages: string[];
  specialties: string[];
  certifications: Certification[];
  rating: number;
  consultationFee: Money;
  availability: GlobalAvailability;
  insuranceAccepted: string[];
  timeZone: string;
  virtualConsultationEnabled: boolean;
  crossBorderLicenses: CrossBorderLicense[];
}

export interface Certification {
  name: string;
  issuingOrganization: string;
  issuedDate: string;
  expiryDate?: string;
  credentialId?: string;
  verified: boolean;
}

export interface CrossBorderLicense {
  country: string;
  licenseNumber: string;
  issuedDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'suspended';
}

export interface GlobalAvailability {
  timeZone: string;
  schedule: WeeklySchedule;
  blackoutDates: string[];
  emergencyAvailable: boolean;
  consultationTypes: ConsultationType[];
}

export interface WeeklySchedule {
  [key: string]: DaySchedule;
}

export interface DaySchedule {
  available: boolean;
  slots: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
  type: 'consultation' | 'emergency' | 'follow_up';
}

export interface ConsultationType {
  type: 'video' | 'audio' | 'chat' | 'in_person';
  fee: Money;
  duration: number;
  description: string;
}

export interface Money {
  amount: number;
  currency: string;
}

export interface MedicalTourismPackage {
  id: string;
  providerId: string;
  destination: string;
  procedures: MedicalProcedure[];
  inclusions: TourismInclusion[];
  totalCost: Money;
  duration: number;
  language: string[];
  rating: number;
  reviews: TourismReview[];
  availability: string[];
}

export interface MedicalProcedure {
  name: string;
  description: string;
  duration: number;
  cost: Money;
  requirements: string[];
  recovery: string;
}

export interface TourismInclusion {
  type: 'medical' | 'accommodation' | 'transport' | 'food' | 'translation';
  description: string;
  included: boolean;
  cost?: Money;
}

export interface TourismReview {
  id: string;
  patientId: string;
  rating: number;
  comment: string;
  procedure: string;
  createdAt: string;
  verified: boolean;
}

export interface SpecialistExchange {
  id: string;
  requesterDoctorId: string;
  specialistDoctorId: string;
  caseId: string;
  exchangeType: 'consultation' | 'second_opinion' | 'collaboration' | 'referral';
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  description: string;
  attachments: string[];
  fee?: Money;
  scheduledAt?: string;
  completedAt?: string;
  notes?: string;
}

export interface GlobalConsultation {
  id: string;
  patientId: string;
  doctorId: string;
  type: 'video' | 'audio' | 'chat';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduledAt: string;
  duration: number;
  fee: Money;
  translation: TranslationService;
  timeZone: string;
  legalConsiderations: LegalConsideration[];
}

export interface TranslationService {
  enabled: boolean;
  sourceLanguage: string;
  targetLanguage: string;
  service: 'google' | 'microsoft' | 'human';
  cost?: Money;
}

export interface LegalConsideration {
  type: 'licensing' | 'liability' | 'prescription' | 'data_privacy';
  description: string;
  compliance: boolean;
  jurisdiction: string;
}
