
// Base de datos simulada en memoria que simula una base de datos real
import type { User } from '@/types';

interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodType: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  medicalHistory: MedicalRecord[];
  allergies: Allergy[];
  currentMedications: Medication[];
}

interface Doctor extends User {
  role: 'doctor';
  medicalLicense: string;
  specialties: string[];
  yearsExperience: number;
  education: Education[];
  consultationFee: number;
  bio: string;
  languages: string[];
  rating: number;
  totalReviews: number;
  availability: DoctorAvailability[];
}

interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  duration: number;
  type: 'virtual' | 'in_person' | 'home_visit';
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
}

interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  date: string;
  chiefComplaint: string;
  diagnosis: string[];
  treatmentPlan: string;
  vitalSigns: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
  };
  prescriptions: Prescription[];
}

interface Allergy {
  id: string;
  patientId: string;
  allergen: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
  diagnosedDate: string;
}

interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
}

interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  medicationName: string;
  dosage: string;
  quantity: number;
  frequency: string;
  duration: number;
  instructions: string;
  status: 'pending' | 'sent_to_pharmacy' | 'dispensed' | 'delivered';
  createdAt: string;
}

interface DoctorAvailability {
  id: string;
  doctorId: string;
  dayOfWeek: number; // 0=Sunday, 6=Saturday
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface Education {
  institution: string;
  degree: string;
  year: number;
  specialty?: string;
}

interface HealthMetric {
  id: string;
  patientId: string;
  type: 'heart_rate' | 'blood_pressure' | 'glucose' | 'weight' | 'temperature';
  value: number;
  unit: string;
  recordedAt: string;
  deviceId?: string;
}

interface Transaction {
  id: string;
  patientId: string;
  appointmentId?: string;
  amount: number;
  currency: string;
  paymentMethod: 'credit_card' | 'debit_card' | 'insurance' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  completedAt?: string;
}

// Base de datos simulada
class SimulatedDatabase {
  private patients: Map<string, Patient> = new Map();
  private doctors: Map<string, Doctor> = new Map();
  private appointments: Map<string, Appointment> = new Map();
  private medicalRecords: Map<string, MedicalRecord> = new Map();
  private allergies: Map<string, Allergy> = new Map();
  private medications: Map<string, Medication> = new Map();
  private prescriptions: Map<string, Prescription> = new Map();
  private healthMetrics: Map<string, HealthMetric> = new Map();
  private transactions: Map<string, Transaction> = new Map();

  constructor() {
    this.seedDatabase();
  }

  // Métodos para pacientes
  getPatient(id: string): Patient | undefined {
    return this.patients.get(id);
  }

  getAllPatients(): Patient[] {
    return Array.from(this.patients.values());
  }

  createPatient(patient: Patient): void {
    this.patients.set(patient.id, patient);
  }

  updatePatient(id: string, updates: Partial<Patient>): Patient | undefined {
    const patient = this.patients.get(id);
    if (patient) {
      const updatedPatient = { ...patient, ...updates, updatedAt: new Date().toISOString() };
      this.patients.set(id, updatedPatient);
      return updatedPatient;
    }
    return undefined;
  }

  // Métodos para doctores
  getDoctor(id: string): Doctor | undefined {
    return this.doctors.get(id);
  }

  getAllDoctors(): Doctor[] {
    return Array.from(this.doctors.values());
  }

  getDoctorsBySpecialty(specialty: string): Doctor[] {
    return Array.from(this.doctors.values()).filter(
      doctor => doctor.specialties.includes(specialty)
    );
  }

  // Métodos para citas
  getAppointment(id: string): Appointment | undefined {
    return this.appointments.get(id);
  }

  getPatientAppointments(patientId: string): Appointment[] {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.patientId === patientId
    );
  }

  getDoctorAppointments(doctorId: string): Appointment[] {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.doctorId === doctorId
    );
  }

  createAppointment(appointment: Appointment): void {
    this.appointments.set(appointment.id, appointment);
  }

  updateAppointment(id: string, updates: Partial<Appointment>): Appointment | undefined {
    const appointment = this.appointments.get(id);
    if (appointment) {
      const updatedAppointment = { ...appointment, ...updates, updatedAt: new Date().toISOString() };
      this.appointments.set(id, updatedAppointment);
      return updatedAppointment;
    }
    return undefined;
  }

  // Métodos para historial médico
  getPatientMedicalRecords(patientId: string): MedicalRecord[] {
    return Array.from(this.medicalRecords.values()).filter(
      record => record.patientId === patientId
    );
  }

  createMedicalRecord(record: MedicalRecord): void {
    this.medicalRecords.set(record.id, record);
  }

  // Métodos para alergias
  getPatientAllergies(patientId: string): Allergy[] {
    return Array.from(this.allergies.values()).filter(
      allergy => allergy.patientId === patientId
    );
  }

  addAllergy(allergy: Allergy): void {
    this.allergies.set(allergy.id, allergy);
  }

  // Métodos para medicamentos
  getPatientMedications(patientId: string): Medication[] {
    return Array.from(this.medications.values()).filter(
      medication => medication.patientId === patientId
    );
  }

  // Métodos para prescripciones
  getPatientPrescriptions(patientId: string): Prescription[] {
    return Array.from(this.prescriptions.values()).filter(
      prescription => prescription.patientId === patientId
    );
  }

  createPrescription(prescription: Prescription): void {
    this.prescriptions.set(prescription.id, prescription);
  }

  // Métodos para métricas de salud
  getPatientHealthMetrics(patientId: string, type?: string): HealthMetric[] {
    const metrics = Array.from(this.healthMetrics.values()).filter(
      metric => metric.patientId === patientId
    );
    return type ? metrics.filter(metric => metric.type === type) : metrics;
  }

  addHealthMetric(metric: HealthMetric): void {
    this.healthMetrics.set(metric.id, metric);
  }

  // Métodos para transacciones
  getPatientTransactions(patientId: string): Transaction[] {
    return Array.from(this.transactions.values()).filter(
      transaction => transaction.patientId === patientId
    );
  }

  createTransaction(transaction: Transaction): void {
    this.transactions.set(transaction.id, transaction);
  }

  // Verificar disponibilidad de cita
  isDoctorAvailable(doctorId: string, date: string, duration: number): boolean {
    const appointmentDate = new Date(date);
    const endTime = new Date(appointmentDate.getTime() + duration * 60000);
    
    const existingAppointments = this.getDoctorAppointments(doctorId).filter(
      appointment => appointment.status !== 'cancelled'
    );

    return !existingAppointments.some(appointment => {
      const existingStart = new Date(appointment.appointmentDate);
      const existingEnd = new Date(existingStart.getTime() + appointment.duration * 60000);
      
      return (appointmentDate < existingEnd) && (endTime > existingStart);
    });
  }

  // Seed de datos iniciales
  private seedDatabase(): void {
    // Pacientes de ejemplo
    const patient1: Patient = {
      id: "1",
      email: "paciente@test.com",
      role: "patient",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "+52 555 0123",
      avatarUrl: null,
      isActive: true,
      onboardingCompleted: true,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      dateOfBirth: "1985-05-15",
      gender: "male",
      bloodType: "O+",
      emergencyContact: {
        name: "María Pérez",
        phone: "+52 555 0124",
        relationship: "Esposa"
      },
      insurance: {
        provider: "IMSS",
        policyNumber: "12345678"
      },
      address: {
        street: "Av. Reforma 123",
        city: "Ciudad de México",
        state: "CDMX",
        zipCode: "06600",
        country: "México"
      },
      medicalHistory: [],
      allergies: [],
      currentMedications: []
    };

    // Doctor de ejemplo
    const doctor1: Doctor = {
      id: "2",
      email: "doctor@test.com",
      role: "doctor",
      firstName: "María",
      lastName: "García",
      phone: "+52 555 0456",
      avatarUrl: null,
      isActive: true,
      onboardingCompleted: true,
      createdAt: "2024-01-10T09:00:00Z",
      updatedAt: "2024-01-10T09:00:00Z",
      medicalLicense: "MED-12345",
      specialties: ["general_medicine", "cardiology"],
      yearsExperience: 15,
      education: [
        {
          institution: "UNAM",
          degree: "Medicina",
          year: 2009,
          specialty: "Medicina General"
        }
      ],
      consultationFee: 800,
      bio: "Doctora especialista en medicina general y cardiología con 15 años de experiencia.",
      languages: ["spanish", "english"],
      rating: 4.8,
      totalReviews: 156,
      availability: [
        {
          id: "av1",
          doctorId: "2",
          dayOfWeek: 1, // Lunes
          startTime: "09:00",
          endTime: "17:00",
          isActive: true
        },
        {
          id: "av2",
          doctorId: "2",
          dayOfWeek: 2, // Martes
          startTime: "09:00",
          endTime: "17:00",
          isActive: true
        }
      ]
    };

    // Cita de ejemplo
    const appointment1: Appointment = {
      id: "apt1",
      patientId: "1",
      doctorId: "2",
      appointmentDate: "2024-06-10T14:00:00Z",
      duration: 30,
      type: "virtual",
      status: "scheduled",
      reason: "Consulta de rutina",
      totalCost: 800,
      createdAt: "2024-06-04T10:00:00Z",
      updatedAt: "2024-06-04T10:00:00Z"
    };

    // Registros médicos de ejemplo
    const medicalRecord1: MedicalRecord = {
      id: "mr1",
      patientId: "1",
      doctorId: "2",
      appointmentId: "apt1",
      date: "2024-05-15T14:30:00Z",
      chiefComplaint: "Dolor de cabeza frecuente",
      diagnosis: ["Cefalea tensional"],
      treatmentPlan: "Manejo del estrés, analgésicos según necesidad",
      vitalSigns: {
        bloodPressure: "120/80",
        heartRate: 72,
        temperature: 36.5,
        weight: 75,
        height: 175
      },
      prescriptions: []
    };

    // Alergias de ejemplo
    const allergy1: Allergy = {
      id: "al1",
      patientId: "1",
      allergen: "Penicilina",
      reaction: "Erupción cutánea",
      severity: "moderate",
      diagnosedDate: "2020-03-15"
    };

    // Métricas de salud de ejemplo
    const healthMetric1: HealthMetric = {
      id: "hm1",
      patientId: "1",
      type: "heart_rate",
      value: 72,
      unit: "bpm",
      recordedAt: "2024-06-04T08:00:00Z"
    };

    // Cargar datos en la base de datos
    this.patients.set(patient1.id, patient1);
    this.doctors.set(doctor1.id, doctor1);
    this.appointments.set(appointment1.id, appointment1);
    this.medicalRecords.set(medicalRecord1.id, medicalRecord1);
    this.allergies.set(allergy1.id, allergy1);
    this.healthMetrics.set(healthMetric1.id, healthMetric1);
  }
}

// Instancia global de la base de datos
export const db = new SimulatedDatabase();

// Tipos exportados
export type {
  Patient,
  Doctor,
  Appointment,
  MedicalRecord,
  Allergy,
  Medication,
  Prescription,
  HealthMetric,
  Transaction,
  DoctorAvailability,
  Education
};
