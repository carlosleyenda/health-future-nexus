
export const APP_CONFIG = {
  name: 'Clínica Virtual',
  version: '1.0.0',
  description: 'Plataforma integral de telemedicina',
  support: {
    email: 'soporte@clinicavirtual.com',
    phone: '+52 (55) 1234-5678'
  },
  social: {
    website: 'https://clinicavirtual.com',
    facebook: 'https://facebook.com/clinicavirtual',
    twitter: 'https://twitter.com/clinicavirtual',
    instagram: 'https://instagram.com/clinicavirtual'
  }
};

export const SPECIALTIES = {
  general_medicine: 'Medicina General',
  cardiology: 'Cardiología',
  dermatology: 'Dermatología',
  endocrinology: 'Endocrinología',
  gynecology: 'Ginecología',
  neurology: 'Neurología',
  pediatrics: 'Pediatría',
  psychiatry: 'Psiquiatría',
  ophthalmology: 'Oftalmología',
  otolaryngology: 'Otorrinolaringología',
  traumatology: 'Traumatología',
  urology: 'Urología',
  oncology: 'Oncología',
  pneumology: 'Neumología',
  gastroenterology: 'Gastroenterología',
  rheumatology: 'Reumatología'
} as const;

export const LANGUAGES = {
  spanish: 'Español',
  english: 'Inglés',
  french: 'Francés',
  portuguese: 'Portugués'
} as const;

export const APPOINTMENT_TYPES = {
  virtual: 'Consulta Virtual',
  in_person: 'Consulta Presencial',
  home_visit: 'Visita Domiciliaria',
  emergency: 'Emergencia'
} as const;

export const APPOINTMENT_STATUS = {
  scheduled: 'Programada',
  confirmed: 'Confirmada',
  in_progress: 'En Progreso',
  completed: 'Completada',
  cancelled: 'Cancelada',
  no_show: 'No Asistió',
  rescheduled: 'Reprogramada'
} as const;

export const BLOOD_TYPES = {
  'A+': 'A+',
  'A-': 'A-',
  'B+': 'B+',
  'B-': 'B-',
  'AB+': 'AB+',
  'AB-': 'AB-',
  'O+': 'O+',
  'O-': 'O-'
} as const;

export const GENDER_OPTIONS = {
  male: 'Masculino',
  female: 'Femenino',
  other: 'Otro'
} as const;

export const DEVICE_TYPES = {
  smartwatch: 'Reloj Inteligente',
  glucose_meter: 'Glucómetro',
  blood_pressure_monitor: 'Monitor de Presión',
  scale: 'Báscula',
  pulse_oximeter: 'Oxímetro',
  thermometer: 'Termómetro',
  ecg_monitor: 'Monitor ECG'
} as const;

export const HEALTH_METRICS = {
  heart_rate: 'Frecuencia Cardíaca',
  blood_pressure_systolic: 'Presión Sistólica',
  blood_pressure_diastolic: 'Presión Diastólica',
  glucose_level: 'Nivel de Glucosa',
  weight: 'Peso',
  temperature: 'Temperatura',
  oxygen_saturation: 'Saturación de Oxígeno',
  steps: 'Pasos',
  sleep_hours: 'Horas de Sueño',
  calories_burned: 'Calorías Quemadas'
} as const;

export const DELIVERY_SERVICES = {
  home_consultation: 'Consulta Domiciliaria',
  nursing_care: 'Cuidado de Enfermería',
  sample_collection: 'Toma de Muestras',
  medication_delivery: 'Entrega de Medicamentos',
  device_installation: 'Instalación de Dispositivos',
  emergency_care: 'Atención de Emergencia',
  specialist_visit: 'Visita de Especialista',
  mobile_lab: 'Laboratorio Móvil',
  mobile_imaging: 'Imagenología Móvil',
  mobile_surgery: 'Cirugía Móvil',
  icu_transport: 'Transporte UCI',
  dialysis_mobile: 'Diálisis Móvil',
  mental_health_crisis: 'Crisis de Salud Mental',
  addiction_treatment: 'Tratamiento de Adicciones',
  geriatric_care: 'Cuidado Geriátrico',
  pediatric_care: 'Cuidado Pediátrico'
} as const;

export const PAYMENT_METHODS = {
  credit_card: 'Tarjeta de Crédito',
  debit_card: 'Tarjeta de Débito',
  bank_transfer: 'Transferencia Bancaria',
  digital_wallet: 'Cartera Digital',
  cryptocurrency: 'Criptomonedas',
  health_coins: 'Health Coins',
  insurance: 'Seguro Médico',
  hsa_fsa: 'HSA/FSA',
  medical_financing: 'Financiamiento Médico',
  cash: 'Efectivo'
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  
  // Pacientes
  PATIENT_DASHBOARD: '/patient/dashboard',
  PATIENT_PROFILE: '/patient/profile',
  PATIENT_APPOINTMENTS: '/patient/appointments',
  PATIENT_HEALTH: '/patient/health',
  PATIENT_PRESCRIPTIONS: '/patient/prescriptions',
  PATIENT_PAYMENTS: '/patient/payments',
  
  // Médicos
  DOCTOR_DASHBOARD: '/doctor/dashboard',
  DOCTOR_PROFILE: '/doctor/profile',
  DOCTOR_PATIENTS: '/doctor/patients',
  DOCTOR_SCHEDULE: '/doctor/schedule',
  DOCTOR_CONSULTATIONS: '/doctor/consultations',
  
  // Administración
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_SETTINGS: '/admin/settings',
  
  // Otros
  SEARCH_DOCTORS: '/search/doctors',
  PHARMACY: '/pharmacy',
  DELIVERY: '/delivery',
  HELP: '/help',
  ABOUT: '/about',
  CONTACT: '/contact'
} as const;

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  BIO_MAX_LENGTH: 1000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp']
} as const;

export const DEFAULT_VALUES = {
  CONSULTATION_DURATION: 30,
  PAGINATION_LIMIT: 20,
  SEARCH_DEBOUNCE_MS: 300,
  SESSION_TIMEOUT_MS: 30 * 60 * 1000,
  HEALTH_ALERT_THRESHOLD: {
    HIGH_HEART_RATE: 100,
    LOW_HEART_RATE: 60,
    HIGH_SYSTOLIC_BP: 140,
    LOW_SYSTOLIC_BP: 90,
    HIGH_GLUCOSE: 200,
    LOW_GLUCOSE: 70
  }
} as const;

export const FEATURE_FLAGS = {
  ENABLE_VIDEO_CALLS: true,
  ENABLE_PRESCRIPTION_DELIVERY: true,
  ENABLE_HOME_VISITS: true,
  ENABLE_HEALTH_MONITORING: true,
  ENABLE_PAYMENT_PROCESSING: true,
  ENABLE_ADMIN_PANEL: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: true
} as const;
