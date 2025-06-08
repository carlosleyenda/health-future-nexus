
import { db } from '@/lib/database';
import type { 
  Patient, 
  MedicalRecord, 
  Allergy, 
  Prescription,
  HealthMetric,
  Transaction
} from '@/lib/database';

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
