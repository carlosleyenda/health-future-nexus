
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

export type Gender = 'male' | 'female' | 'other';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type PracticeType = 'individual' | 'group' | 'hospital' | 'clinic' | 'telemedicine_only';

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RiskPrediction {
  condition: string;
  probability: number;
  timeframe: string;
  riskFactors: string[];
  preventiveMeasures: string[];
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
