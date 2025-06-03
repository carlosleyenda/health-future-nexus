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
  emergency_care: 'Atención de Emergencia'
} as const;

export const PAYMENT_METHODS = {
  credit_card: 'Tarjeta de Crédito',
  debit_card: 'Tarjeta de Débito',
  bank_transfer: 'Transferencia Bancaria',
  cash: 'Efectivo',
  insurance: 'Seguro Médico'
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

export const API_ENDPOINTS = {
  // Autenticación
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_REFRESH: '/api/auth/refresh',
  
  // Usuarios
  PROFILE: '/api/profile',
  PROFILE_AVATAR: '/api/profile/avatar',
  
  // Pacientes
  PATIENTS: '/api/patients',
  PATIENT_DEVICES: (id: string) => `/api/patients/${id}/devices`,
  PATIENT_HEALTH_METRICS: (id: string) => `/api/patients/${id}/health-metrics`,
  PATIENT_ALLERGIES: (id: string) => `/api/patients/${id}/allergies`,
  
  // Médicos
  DOCTORS: '/api/doctors',
  DOCTOR_AVAILABILITY: (id: string) => `/api/doctors/${id}/availability`,
  DOCTOR_PATIENTS: (id: string) => `/api/doctors/${id}/patients`,
  
  // Citas
  APPOINTMENTS: '/api/appointments',
  APPOINTMENT_CONFIRM: (id: string) => `/api/appointments/${id}/confirm`,
  APPOINTMENT_RESCHEDULE: (id: string) => `/api/appointments/${id}/reschedule`,
  
  // Prescripciones
  PRESCRIPTIONS: '/api/prescriptions',
  PRESCRIPTIONS_SEND_PHARMACY: (id: string) => `/api/prescriptions/${id}/send-to-pharmacy`,
  
  // Farmacias
  PHARMACIES: '/api/pharmacies',
  PHARMACIES_NEARBY: '/api/pharmacies/nearby',
  
  // Delivery
  DELIVERY_REQUEST: '/api/delivery/request',
  DELIVERY_SERVICES: '/api/delivery/services',
  
  // Pagos
  PAYMENTS_CREATE_INTENT: '/api/payments/create-intent',
  PAYMENTS_CONFIRM: '/api/payments/confirm',
  
  // Búsqueda
  SEARCH_DOCTORS: '/api/search/doctors',
  SEARCH_GLOBAL: '/api/search/global'
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
  CONSULTATION_DURATION: 30, // minutos
  PAGINATION_LIMIT: 20,
  SEARCH_DEBOUNCE_MS: 300,
  SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutos
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

// Servicios del Marketplace Expandido
export const MARKETPLACE_SERVICES = {
  SECOND_OPINION: 'second_opinion',
  WELLNESS_COACHING: 'wellness_coaching',
  NUTRITION_CONSULTING: 'nutrition_consulting',
  FITNESS_TRAINING: 'fitness_training',
  MENTAL_HEALTH: 'mental_health',
  AESTHETIC_MEDICINE: 'aesthetic_medicine',
  MEDICAL_TOURISM: 'medical_tourism',
  GENETIC_COUNSELING: 'genetic_counseling',
  ALTERNATIVE_MEDICINE: 'alternative_medicine',
  CHRONIC_CARE_MANAGEMENT: 'chronic_care_management',
  ELDERCARE_SERVICES: 'eldercare_services',
  PEDIATRIC_DEVELOPMENT: 'pediatric_development',
} as const;

// Dispositivos IoT Expandidos
export const IOT_DEVICES = {
  // Dispositivos básicos
  SMARTWATCH: 'smartwatch',
  GLUCOSE_METER: 'glucose_meter',
  BLOOD_PRESSURE_MONITOR: 'blood_pressure_monitor',
  SCALE: 'scale',
  PULSE_OXIMETER: 'pulse_oximeter',
  THERMOMETER: 'thermometer',
  ECG_MONITOR: 'ecg_monitor',
  
  // Dispositivos avanzados
  CGM: 'cgm', // Continuous Glucose Monitor
  HOLTER_MONITOR: 'holter_monitor',
  SLEEP_APNEA_DEVICE: 'sleep_apnea_device',
  STRESS_MONITOR: 'stress_monitor',
  MEDICATION_SENSOR: 'medication_sensor',
  FALL_DETECTOR: 'fall_detector',
  AIR_QUALITY_MONITOR: 'air_quality_monitor',
  UV_TRACKER: 'uv_tracker',
} as const;

// Servicios de Delivery Médico Premium
export const DELIVERY_SERVICES = {
  // Servicios básicos
  HOME_CONSULTATION: 'home_consultation',
  NURSING_CARE: 'nursing_care',
  SAMPLE_COLLECTION: 'sample_collection',
  MEDICATION_DELIVERY: 'medication_delivery',
  DEVICE_INSTALLATION: 'device_installation',
  EMERGENCY_CARE: 'emergency_care',
  
  // Servicios premium
  SPECIALIST_VISIT: 'specialist_visit',
  MOBILE_LAB: 'mobile_lab',
  MOBILE_IMAGING: 'mobile_imaging',
  MOBILE_SURGERY: 'mobile_surgery',
  ICU_TRANSPORT: 'icu_transport',
  DIALYSIS_MOBILE: 'dialysis_mobile',
  MENTAL_HEALTH_CRISIS: 'mental_health_crisis',
  ADDICTION_TREATMENT: 'addiction_treatment',
  GERIATRIC_CARE: 'geriatric_care',
  PEDIATRIC_CARE: 'pediatric_care',
} as const;

// Métodos de Pago Expandidos
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  BANK_TRANSFER: 'bank_transfer',
  DIGITAL_WALLET: 'digital_wallet',
  CRYPTOCURRENCY: 'cryptocurrency',
  HEALTH_COINS: 'health_coins',
  INSURANCE: 'insurance',
  HSA_FSA: 'hsa_fsa',
  MEDICAL_FINANCING: 'medical_financing',
} as const;

// Servicios de Farmacia
export const PHARMACY_SERVICES = {
  PRESCRIPTION_FILLING: 'prescription_filling',
  OTC_MEDICATIONS: 'otc_medications',
  MEDICAL_DEVICES: 'medical_devices',
  VACCINATIONS: 'vaccinations',
  HEALTH_SCREENINGS: 'health_screenings',
  COMPOUNDING: 'compounding',
  SPECIALTY_DRUGS: 'specialty_drugs',
  HOME_INFUSION: 'home_infusion',
  VETERINARY_MEDS: 'veterinary_meds',
  MEDICATION_THERAPY: 'medication_therapy',
  ADHERENCE_MONITORING: 'adherence_monitoring',
  CLINICAL_SERVICES: 'clinical_services',
} as const;

// Métodos de Entrega
export const DELIVERY_METHODS = {
  PICKUP: 'pickup',
  DELIVERY: 'delivery',
  DRONE: 'drone',
  MAIL: 'mail',
  COURIER: 'courier',
} as const;

// Niveles de Lealtad
export const LOYALTY_TIERS = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
  DIAMOND: 'diamond',
} as const;

// Tipos de Análisis IA
export const AI_ANALYSIS_TYPES = {
  SYMPTOM_ANALYSIS: 'symptom_analysis',
  RISK_PREDICTION: 'risk_prediction',
  TREATMENT_OPTIMIZATION: 'treatment_optimization',
  DRUG_INTERACTION: 'drug_interaction',
  LIFESTYLE_IMPACT: 'lifestyle_impact',
  GENETIC_ANALYSIS: 'genetic_analysis',
  IMAGE_ANALYSIS: 'image_analysis',
  ECG_ANALYSIS: 'ecg_analysis',
  VOICE_ANALYSIS: 'voice_analysis',
  BEHAVIOR_PATTERN: 'behavior_pattern',
} as const;

// Prioridades de Servicio
export const SERVICE_PRIORITIES = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
  EMERGENCY: 'emergency',
} as const;

// Configuración de Gamificación
export const GAMIFICATION = {
  HEALTH_COINS_PER_CONSULTATION: 100,
  HEALTH_COINS_PER_METRIC_LOG: 10,
  HEALTH_COINS_PER_MEDICATION_TAKEN: 5,
  HEALTH_COINS_PER_EXERCISE_SESSION: 25,
  HEALTH_COINS_PER_REFERRAL: 500,
  
  LOYALTY_THRESHOLDS: {
    BRONZE: 0,
    SILVER: 1000,
    GOLD: 5000,
    PLATINUM: 15000,
    DIAMOND: 50000,
  },
  
  CASHBACK_RATES: {
    BRONZE: 0.01, // 1%
    SILVER: 0.02, // 2%
    GOLD: 0.03,   // 3%
    PLATINUM: 0.05, // 5%
    DIAMOND: 0.08,  // 8%
  },
} as const;

// Configuración de IA y Machine Learning
export const AI_CONFIGURATION = {
  RISK_PREDICTION_MODELS: [
    'cardiovascular_risk',
    'diabetes_progression',
    'mental_health_deterioration',
    'medication_adherence',
    'hospital_readmission',
    'fall_risk',
    'cognitive_decline',
  ],
  
  CONFIDENCE_THRESHOLDS: {
    HIGH: 0.8,
    MEDIUM: 0.6,
    LOW: 0.4,
  },
  
  ALERT_TRIGGERS: {
    CRITICAL: 0.9,
    HIGH: 0.7,
    MEDIUM: 0.5,
  },
} as const;

// Configuración de Telemedicina Avanzada
export const TELEMEDICINE_FEATURES = {
  VIDEO_QUALITY: ['480p', '720p', '1080p', '4K'],
  RECORDING_FORMATS: ['mp4', 'webm', 'avi'],
  SCREEN_SHARING: true,
  VIRTUAL_BACKGROUNDS: true,
  AI_TRANSCRIPTION: true,
  REAL_TIME_TRANSLATION: true,
  DIGITAL_STETHOSCOPE: true,
  REMOTE_VITAL_MONITORING: true,
  AR_ASSISTANCE: true,
  VR_THERAPY_SESSIONS: true,
} as const;

// Configuración Regional y de Compliance
export const COMPLIANCE_REGIONS = {
  US: {
    regulations: ['HIPAA', 'FDA', 'DEA'],
    currency: 'USD',
    timezone: 'America/New_York',
    languages: ['en', 'es'],
  },
  EU: {
    regulations: ['GDPR', 'EMA', 'MDR'],
    currency: 'EUR',
    timezone: 'Europe/London',
    languages: ['en', 'de', 'fr', 'es', 'it'],
  },
  LATAM: {
    regulations: ['LGPD', 'ANVISA', 'COFEPRIS'],
    currency: 'USD',
    timezone: 'America/Mexico_City',
    languages: ['es', 'pt'],
  },
  ASIA: {
    regulations: ['PMDA', 'NMPA', 'TGA'],
    currency: 'USD',
    timezone: 'Asia/Tokyo',
    languages: ['en', 'ja', 'zh', 'ko'],
  },
} as const;

// URLs y Endpoints para Integraciones
export const INTEGRATION_ENDPOINTS = {
  STRIPE_PUBLIC_KEY: 'pk_test_...',
  AGORA_APP_ID: 'your_agora_app_id',
  MAPBOX_TOKEN: 'pk.eyJ1...',
  TWILIO_ACCOUNT_SID: 'AC...',
  SENDGRID_API_KEY: 'SG...',
  BLOCKCHAIN_NETWORK: 'polygon',
  FHIR_SERVER_URL: 'https://your-fhir-server.com',
  HL7_ENDPOINT: 'https://your-hl7-endpoint.com',
} as const;
