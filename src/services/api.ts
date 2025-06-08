import { db } from '@/lib/database';
import type { 
  Patient, 
  Doctor, 
  Appointment, 
  MedicalRecord, 
  Allergy, 
  Prescription,
  HealthMetric,
  Transaction
} from '@/lib/database';

// Simulación de delays de red para mayor realismo
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class PatientService {
  static async getProfile(patientId: string): Promise<Patient | null> {
    await delay(300);
    const patient = db.getPatient(patientId);
    return patient || null;
  }

  static async updateProfile(patientId: string, updates: Partial<Patient>): Promise<Patient | null> {
    await delay(500);
    return db.updatePatient(patientId, updates) || null;
  }

  static async getMedicalHistory(patientId: string): Promise<MedicalRecord[]> {
    await delay(400);
    return db.getPatientMedicalRecords(patientId);
  }

  static async getAllergies(patientId: string): Promise<Allergy[]> {
    await delay(200);
    return db.getPatientAllergies(patientId);
  }

  static async addAllergy(allergy: Omit<Allergy, 'id'>): Promise<Allergy> {
    await delay(300);
    const newAllergy = { ...allergy, id: crypto.randomUUID() };
    db.addAllergy(newAllergy);
    return newAllergy;
  }

  static async getPrescriptions(patientId: string): Promise<Prescription[]> {
    await delay(350);
    return db.getPatientPrescriptions(patientId);
  }

  static async getHealthMetrics(patientId: string, type?: string): Promise<HealthMetric[]> {
    await delay(400);
    return db.getPatientHealthMetrics(patientId, type);
  }

  static async addHealthMetric(metric: Omit<HealthMetric, 'id'>): Promise<HealthMetric> {
    await delay(200);
    const newMetric = { ...metric, id: crypto.randomUUID() };
    db.addHealthMetric(newMetric);
    return newMetric;
  }

  static async getTransactions(patientId: string): Promise<Transaction[]> {
    await delay(350);
    return db.getPatientTransactions(patientId);
  }
}

export class DoctorService {
  static async getProfile(doctorId: string): Promise<Doctor | null> {
    await delay(300);
    return db.getDoctor(doctorId) || null;
  }

  static async getAllDoctors(): Promise<Doctor[]> {
    await delay(400);
    return db.getAllDoctors();
  }

  static async getDoctorsBySpecialty(specialty: string): Promise<Doctor[]> {
    await delay(350);
    return db.getDoctorsBySpecialty(specialty);
  }

  static async getPatients(doctorId: string): Promise<Patient[]> {
    await delay(400);
    const appointments = db.getDoctorAppointments(doctorId);
    const patientIds = [...new Set(appointments.map(apt => apt.patientId))];
    return patientIds.map(id => db.getPatient(id)!).filter(Boolean);
  }

  static async updateAvailability(doctorId: string, availability: any): Promise<boolean> {
    await delay(500);
    return true;
  }
}

export class AppointmentService {
  static async getAppointment(appointmentId: string): Promise<Appointment | null> {
    await delay(200);
    return db.getAppointment(appointmentId) || null;
  }

  static async getPatientAppointments(patientId: string): Promise<Appointment[]> {
    await delay(300);
    return db.getPatientAppointments(patientId);
  }

  static async getDoctorAppointments(doctorId: string): Promise<Appointment[]> {
    await delay(300);
    return db.getDoctorAppointments(doctorId);
  }

  static async createAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
    await delay(600);
    
    const isAvailable = db.isDoctorAvailable(
      appointmentData.doctorId,
      appointmentData.appointmentDate,
      appointmentData.duration
    );

    if (!isAvailable) {
      throw new Error('El horario seleccionado no está disponible');
    }

    const newAppointment: Appointment = {
      ...appointmentData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.createAppointment(newAppointment);
    return newAppointment;
  }

  static async updateAppointment(appointmentId: string, updates: Partial<Appointment>): Promise<Appointment | null> {
    await delay(400);
    return db.updateAppointment(appointmentId, updates) || null;
  }

  static async cancelAppointment(appointmentId: string, reason: string): Promise<boolean> {
    await delay(300);
    const updated = db.updateAppointment(appointmentId, { 
      status: 'cancelled', 
      notes: reason 
    });
    return !!updated;
  }

  static async getAvailableSlots(doctorId: string, date: string): Promise<string[]> {
    await delay(400);
    
    const doctor = db.getDoctor(doctorId);
    if (!doctor) return [];

    const targetDate = new Date(date);
    const dayOfWeek = targetDate.getDay();
    
    const availability = doctor.availability.find(av => av.dayOfWeek === dayOfWeek && av.isActive);
    if (!availability) return [];

    const slots: string[] = [];
    const startTime = new Date(`${date}T${availability.startTime}:00`);
    const endTime = new Date(`${date}T${availability.endTime}:00`);

    for (let time = new Date(startTime); time < endTime; time.setMinutes(time.getMinutes() + 30)) {
      const slotTime = time.toISOString();
      if (db.isDoctorAvailable(doctorId, slotTime, 30)) {
        slots.push(time.toTimeString().substring(0, 5));
      }
    }

    return slots;
  }
}

export class PrescriptionService {
  static async createPrescription(prescriptionData: Omit<Prescription, 'id' | 'createdAt'>): Promise<Prescription> {
    await delay(400);
    
    const newPrescription: Prescription = {
      ...prescriptionData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    db.createPrescription(newPrescription);
    return newPrescription;
  }

  static async updatePrescriptionStatus(prescriptionId: string, status: Prescription['status']): Promise<boolean> {
    await delay(300);
    // Simular actualización de estado
    return true;
  }
}

export class PaymentService {
  static async createPaymentIntent(amount: number, appointmentId?: string): Promise<{ clientSecret: string; paymentIntentId: string }> {
    await delay(800);
    
    // Simular creación de intención de pago
    return {
      clientSecret: `pi_${crypto.randomUUID()}_secret`,
      paymentIntentId: `pi_${crypto.randomUUID()}`
    };
  }

  static async confirmPayment(paymentIntentId: string, patientId: string, appointmentId?: string): Promise<Transaction> {
    await delay(1000);

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      patientId,
      appointmentId,
      amount: 800, // Precio de consulta por defecto
      currency: 'MXN',
      paymentMethod: 'credit_card',
      status: 'completed',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };

    db.createTransaction(transaction);
    return transaction;
  }
}

// Servicio de notificaciones
export class NotificationService {
  static async sendAppointmentConfirmation(appointmentId: string): Promise<boolean> {
    await delay(200);
    console.log(`Enviando confirmación de cita: ${appointmentId}`);
    return true;
  }

  static async sendAppointmentReminder(appointmentId: string): Promise<boolean> {
    await delay(200);
    console.log(`Enviando recordatorio de cita: ${appointmentId}`);
    return true;
  }

  static async sendPrescriptionNotification(prescriptionId: string): Promise<boolean> {
    await delay(200);
    console.log(`Enviando notificación de prescripción: ${prescriptionId}`);
    return true;
  }
}
