
import { db } from '@/lib/database';
import type { Transaction } from '@/lib/database';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class PaymentService {
  static async createPaymentIntent(amount: number, appointmentId?: string): Promise<{ clientSecret: string; paymentIntentId: string }> {
    await delay(800);
    
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
      amount: 800,
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
