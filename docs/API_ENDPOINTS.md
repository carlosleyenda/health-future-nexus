
# API ENDPOINTS DOCUMENTATION

## 1. AUTENTICACIÓN Y USUARIOS

### 1.1 Autenticación
```typescript
// Registro de usuario
POST /api/auth/register
Body: {
  email: string,
  password: string,
  role: 'patient' | 'doctor' | 'admin',
  firstName: string,
  lastName: string,
  phone?: string
}

// Login
POST /api/auth/login
Body: {
  email: string,
  password: string
}

// Logout
POST /api/auth/logout

// Refresh token
POST /api/auth/refresh
```

### 1.2 Gestión de Perfiles
```typescript
// Obtener perfil actual
GET /api/profile

// Actualizar perfil
PUT /api/profile
Body: ProfileUpdateData

// Completar onboarding
POST /api/profile/complete-onboarding
Body: OnboardingData

// Subir avatar
POST /api/profile/avatar
Body: FormData (file)
```

## 2. PACIENTES

### 2.1 Gestión de Pacientes
```typescript
// Obtener información del paciente
GET /api/patients/:id

// Actualizar perfil médico del paciente
PUT /api/patients/:id/medical-profile
Body: {
  dateOfBirth: string,
  gender: Gender,
  bloodType: BloodType,
  emergencyContact: EmergencyContact,
  insurance: InsuranceInfo,
  address: Address
}

// Obtener historial médico
GET /api/patients/:id/medical-history

// Obtener alergias
GET /api/patients/:id/allergies

// Agregar alergia
POST /api/patients/:id/allergies
Body: {
  allergen: string,
  reaction: string,
  severity: AllergySeverity,
  diagnosedDate: string
}
```

### 2.2 Monitoreo de Salud
```typescript
// Obtener dispositivos del paciente
GET /api/patients/:id/devices

// Registrar nuevo dispositivo
POST /api/patients/:id/devices
Body: {
  deviceType: DeviceType,
  deviceId: string,
  brand: string,
  model: string
}

// Obtener métricas de salud
GET /api/patients/:id/health-metrics
Query: {
  type?: HealthMetricType,
  startDate?: string,
  endDate?: string,
  limit?: number
}

// Registrar métricas de salud
POST /api/patients/:id/health-metrics
Body: {
  deviceId?: string,
  metricType: HealthMetricType,
  value: number,
  unit: string,
  recordedAt: string
}

// Obtener alertas de salud
GET /api/patients/:id/health-alerts
```

## 3. MÉDICOS

### 3.1 Gestión de Médicos
```typescript
// Obtener información del médico
GET /api/doctors/:id

// Actualizar perfil profesional
PUT /api/doctors/:id/professional-profile
Body: {
  medicalLicense: string,
  specialties: Specialty[],
  yearsExperience: number,
  education: Education[],
  certifications: Certification[],
  consultationFee: number,
  bio: string,
  languages: Language[]
}

// Obtener estadísticas del médico
GET /api/doctors/:id/stats

// Obtener pacientes del médico
GET /api/doctors/:id/patients
Query: {
  search?: string,
  status?: string,
  limit?: number,
  offset?: number
}
```

### 3.2 Disponibilidad
```typescript
// Obtener disponibilidad
GET /api/doctors/:id/availability

// Configurar disponibilidad
PUT /api/doctors/:id/availability
Body: {
  schedule: {
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    isActive: boolean
  }[]
}

// Obtener horarios disponibles
GET /api/doctors/:id/available-slots
Query: {
  date: string,
  duration?: number
}

// Bloquear horarios
POST /api/doctors/:id/block-time
Body: {
  startDate: string,
  endDate: string,
  reason: string
}
```

## 4. CITAS MÉDICAS

### 4.1 Gestión de Citas
```typescript
// Obtener citas
GET /api/appointments
Query: {
  patientId?: string,
  doctorId?: string,
  status?: AppointmentStatus,
  startDate?: string,
  endDate?: string,
  type?: AppointmentType
}

// Crear cita
POST /api/appointments
Body: {
  patientId: string,
  doctorId: string,
  appointmentDate: string,
  duration: number,
  type: AppointmentType,
  reason: string
}

// Obtener cita específica
GET /api/appointments/:id

// Actualizar cita
PUT /api/appointments/:id
Body: Partial<AppointmentData>

// Cancelar cita
DELETE /api/appointments/:id
Body: {
  reason: string
}

// Confirmar cita
POST /api/appointments/:id/confirm

// Reagendar cita
POST /api/appointments/:id/reschedule
Body: {
  newDate: string,
  reason: string
}
```

### 4.2 Consultas Virtuales
```typescript
// Iniciar consulta virtual
POST /api/appointments/:id/start-consultation

// Obtener token de video llamada
GET /api/appointments/:id/video-token

// Finalizar consulta
POST /api/appointments/:id/end-consultation
Body: {
  duration: number,
  notes: string
}

// Grabar consulta
POST /api/appointments/:id/record
Body: {
  recordingUrl: string
}
```

## 5. PRESCRIPCIONES Y FARMACIA

### 5.1 Prescripciones
```typescript
// Obtener prescripciones del paciente
GET /api/patients/:id/prescriptions

// Crear prescripción
POST /api/prescriptions
Body: {
  patientId: string,
  doctorId: string,
  appointmentId?: string,
  medicationName: string,
  dosage: string,
  quantity: number,
  frequency: string,
  duration: number,
  instructions: string
}

// Actualizar estado de prescripción
PUT /api/prescriptions/:id/status
Body: {
  status: PrescriptionStatus,
  pharmacyId?: string
}

// Enviar a farmacia
POST /api/prescriptions/:id/send-to-pharmacy
Body: {
  pharmacyId: string
}
```

### 5.2 Red de Farmacias
```typescript
// Obtener farmacias cercanas
GET /api/pharmacies/nearby
Query: {
  lat: number,
  lng: number,
  radius?: number
}

// Obtener farmacia específica
GET /api/pharmacies/:id

// Verificar disponibilidad de medicamento
GET /api/pharmacies/:id/medication-availability
Query: {
  medicationName: string
}

// Solicitar delivery de medicamentos
POST /api/pharmacies/delivery
Body: {
  prescriptionIds: string[],
  deliveryAddress: Address,
  notes?: string
}
```

## 6. DELIVERY MÉDICO

### 6.1 Servicios de Delivery
```typescript
// Solicitar servicio de delivery
POST /api/delivery/request
Body: {
  patientId: string,
  serviceType: DeliveryServiceType,
  scheduledDate: string,
  address: Address,
  notes?: string
}

// Obtener servicios de delivery
GET /api/delivery/services
Query: {
  patientId?: string,
  status?: DeliveryStatus,
  date?: string
}

// Actualizar estado del servicio
PUT /api/delivery/:id/status
Body: {
  status: DeliveryStatus,
  notes?: string,
  location?: Coordinates
}

// Asignar personal
POST /api/delivery/:id/assign
Body: {
  staffId: string
}

// Obtener ubicación en tiempo real
GET /api/delivery/:id/location
```

### 6.2 Personal de Delivery
```typescript
// Obtener servicios asignados
GET /api/delivery/staff/:id/assignments

// Actualizar ubicación
POST /api/delivery/staff/:id/location
Body: {
  lat: number,
  lng: number
}

// Marcar llegada
POST /api/delivery/:id/arrival

// Completar servicio
POST /api/delivery/:id/complete
Body: {
  notes: string,
  timeSpent: number
}
```

## 7. PAGOS Y FACTURACIÓN

### 7.1 Transacciones
```typescript
// Crear intención de pago
POST /api/payments/create-intent
Body: {
  amount: number,
  currency: string,
  appointmentId?: string,
  deliveryServiceId?: string,
  description: string
}

// Confirmar pago
POST /api/payments/confirm
Body: {
  paymentIntentId: string
}

// Obtener historial de transacciones
GET /api/payments/transactions
Query: {
  patientId?: string,
  status?: PaymentStatus,
  startDate?: string,
  endDate?: string
}

// Procesar reembolso
POST /api/payments/:id/refund
Body: {
  amount?: number,
  reason: string
}
```

### 7.2 Facturación
```typescript
// Generar factura
POST /api/invoices/generate
Body: {
  transactionId: string
}

// Obtener facturas
GET /api/invoices
Query: {
  patientId?: string,
  startDate?: string,
  endDate?: string
}

// Descargar factura PDF
GET /api/invoices/:id/pdf

// Enviar factura por email
POST /api/invoices/:id/send-email
```

## 8. ADMINISTRACIÓN

### 8.1 Dashboard Administrativo
```typescript
// Obtener métricas generales
GET /api/admin/dashboard

// Obtener usuarios
GET /api/admin/users
Query: {
  role?: UserRole,
  status?: string,
  search?: string,
  limit?: number,
  offset?: number
}

// Activar/desactivar usuario
PUT /api/admin/users/:id/status
Body: {
  isActive: boolean,
  reason?: string
}

// Obtener reportes
GET /api/admin/reports
Query: {
  type: ReportType,
  startDate: string,
  endDate: string,
  format?: 'json' | 'csv' | 'pdf'
}
```

### 8.2 Gestión de Calidad
```typescript
// Obtener métricas de calidad
GET /api/admin/quality-metrics

// Obtener reviews y ratings
GET /api/admin/reviews
Query: {
  doctorId?: string,
  rating?: number,
  startDate?: string,
  endDate?: string
}

// Responder a review
POST /api/admin/reviews/:id/respond
Body: {
  response: string
}
```

## 9. NOTIFICACIONES

### 9.1 Gestión de Notificaciones
```typescript
// Obtener notificaciones del usuario
GET /api/notifications

// Marcar como leída
PUT /api/notifications/:id/read

// Configurar preferencias
PUT /api/notifications/preferences
Body: {
  email: boolean,
  push: boolean,
  sms: boolean,
  types: NotificationType[]
}

// Enviar notificación
POST /api/notifications/send
Body: {
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  data?: any
}
```

## 10. BÚSQUEDA Y FILTROS

### 10.1 Búsqueda General
```typescript
// Búsqueda de médicos
GET /api/search/doctors
Query: {
  q?: string,
  specialty?: Specialty,
  location?: string,
  rating?: number,
  availability?: boolean,
  language?: Language,
  priceRange?: string
}

// Búsqueda de pacientes (solo para médicos/admin)
GET /api/search/patients
Query: {
  q?: string,
  age?: string,
  condition?: string,
  lastVisit?: string
}

// Búsqueda global
GET /api/search/global
Query: {
  q: string,
  type?: 'doctors' | 'patients' | 'appointments' | 'prescriptions'
}
```

## 11. TIPOS DE DATOS TYPESCRIPT

```typescript
// Interfaces principales que se usarán en toda la aplicación
interface User {
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

interface PatientProfile extends User {
  dateOfBirth: string;
  gender: Gender;
  bloodType: BloodType;
  emergencyContact: EmergencyContact;
  insurance: InsuranceInfo;
  address: Address;
}

interface DoctorProfile extends User {
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

interface Appointment {
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
}

// ... más interfaces según necesidad
```
