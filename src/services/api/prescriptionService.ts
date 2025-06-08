
import { db } from '@/lib/database';
import type { Prescription } from '@/lib/database';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
    return true;
  }
}
