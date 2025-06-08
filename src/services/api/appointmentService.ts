
import { db } from '@/lib/database';
import type { Appointment } from '@/lib/database';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
