
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

export interface Availability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timezone: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

import { Address } from './user';
import { Language } from './user';
