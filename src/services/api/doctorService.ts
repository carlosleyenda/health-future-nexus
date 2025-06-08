
import { db } from '@/lib/database';
import type { Doctor, Patient } from '@/lib/database';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
