
// Tipos principales del sistema
export type UserRole = 
  | 'patient' 
  | 'doctor' 
  | 'specialist' 
  | 'admin' 
  | 'coordinator' 
  | 'delivery_staff' 
  | 'pharmacist';

export type Gender = 'male' | 'female' | 'other';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type Specialty = 
  | 'general_medicine'
  | 'cardiology'
  | 'dermatology' 
  | 'endocrinology'
  | 'gynecology'
  | 'neurology'
  | 'pediatrics'
  | 'psychiatry'
  | 'ophthalmology'
  | 'otolaryngology'
  | 'traumatology'
  | 'urology'
  | 'oncology'
  | 'pneumology'
  | 'gastroenterology'
  | 'rheumatology';

export type Language = 'spanish' | 'english' | 'french' | 'portuguese';

export type AppointmentType = 'virtual' | 'in_person' | 'home_visit' | 'emergency';
export type AppointmentStatus = 
  | 'scheduled' 
  | 'confirmed' 
  | 'in_progress' 
  | 'completed'
  | 'cancelled' 
  | 'no_show' 
  | 'rescheduled';

export type AllergySeverity = 'mild' | 'moderate' | 'severe' | 'life_threatening';

export type PrescriptionStatus = 
  | 'pending' 
  | 'sent_to_pharmacy' 
  | 'dispensed' 
  | 'delivered' 
  | 'cancelled';

export type DeviceType = 
  | 'smartwatch'
  | 'glucose_meter'
  | 'blood_pressure_monitor'
  | 'scale'
  | 'pulse_oximeter'
  | 'thermometer'
  | 'ecg_monitor';

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
  | 'calories_burned';

export type DeliveryServiceType = 
  | 'home_consultation'
  | 'nursing_care'
  | 'sample_collection'
  | 'medication_delivery'
  | 'device_installation'
  | 'emergency_care';

export type DeliveryStatus = 
  | 'requested'
  | 'assigned'
  | 'in_transit'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type PaymentMethodType = 
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'cash'
  | 'insurance';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

// Interfaces principales
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

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface InsuranceInfo {
  provider: string;
  number: string;
  groupNumber?: string;
  memberName?: string;
}

export interface Education {
  institution: string;
  degree: string;
  graduationYear: number;
  country: string;
}

export interface Certification {
  name: string;
  issuingBody: string;
  issueDate: string;
  expiryDate?: string;
  certificateUrl?: string;
}

export interface PatientProfile extends User {
  dateOfBirth: string;
  gender: Gender;
  bloodType: BloodType;
  emergencyContact: EmergencyContact;
  insurance: InsuranceInfo;
  address: Address;
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
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  duration: number;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
  // Datos expandidos para vistas
  patient?: PatientProfile;
  doctor?: DoctorProfile;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  chiefComplaint: string;
  diagnosis: any;
  treatmentPlan: string;
  vitalSigns: any;
  createdAt: string;
}

export interface Allergy {
  id: string;
  patientId: string;
  allergen: string;
  reaction: string;
  severity: AllergySeverity;
  diagnosedDate: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  medicationName: string;
  dosage: string;
  quantity: number;
  frequency: string;
  durationDays?: number;
  instructions: string;
  status: PrescriptionStatus;
  createdAt: string;
  dispensedAt?: string;
  pharmacyId?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: Address;
  phone: string;
  email: string;
  workingHours: any;
  isActive: boolean;
  deliveryAvailable: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface MonitoringDevice {
  id: string;
  patientId: string;
  deviceType: DeviceType;
  deviceId: string;
  brand: string;
  model: string;
  lastSync?: string;
  isActive: boolean;
}

export interface HealthMetric {
  id: string;
  patientId: string;
  deviceId?: string;
  metricType: HealthMetricType;
  value: number;
  unit: string;
  recordedAt: string;
  createdAt: string;
}

export interface DeliveryService {
  id: string;
  patientId: string;
  serviceType: DeliveryServiceType;
  staffId?: string;
  scheduledDate: string;
  address: Address;
  status: DeliveryStatus;
  estimatedCost?: number;
  actualCost?: number;
  notes?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  patientId: string;
  appointmentId?: string;
  deliveryServiceId?: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethodType;
  stripePaymentIntentId?: string;
  status: PaymentStatus;
  createdAt: string;
  completedAt?: string;
}

export interface Invoice {
  id: string;
  transactionId: string;
  invoiceNumber: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  dueDate: string;
  pdfUrl?: string;
  createdAt: string;
}

// Tipos para formularios y requests
export interface CreateAppointmentRequest {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  duration: number;
  type: AppointmentType;
  reason: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface CreatePrescriptionRequest {
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  medicationName: string;
  dosage: string;
  quantity: number;
  frequency: string;
  durationDays?: number;
  instructions: string;
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Tipos para filtros y búsquedas
export interface DoctorSearchFilters {
  q?: string;
  specialty?: Specialty;
  location?: string;
  rating?: number;
  availability?: boolean;
  language?: Language;
  priceRange?: string;
}

export interface AppointmentFilters {
  patientId?: string;
  doctorId?: string;
  status?: AppointmentStatus;
  startDate?: string;
  endDate?: string;
  type?: AppointmentType;
}

// Tipos para dashboard y estadísticas
export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
  revenue: number;
  growthRate: number;
}

export interface DoctorStats {
  totalPatients: number;
  totalConsultations: number;
  averageRating: number;
  monthlyRevenue: number;
  upcomingAppointments: number;
}

export interface PatientStats {
  totalConsultations: number;
  lastConsultation?: string;
  activePrescriptions: number;
  healthScore: number;
  nextAppointment?: string;
}
