
import { delay } from '@/lib/delay';

export class DeliveryService {
  static async scheduleHomeConsultation(data: any) {
    await delay(300);
    console.log('Scheduling home consultation:', data);
    return { success: true, appointmentId: 'home-' + Date.now() };
  }

  static async scheduleLabCollection(data: any) {
    await delay(300);
    console.log('Scheduling lab collection:', data);
    return { success: true, collectionId: 'lab-' + Date.now() };
  }

  static async getDeliveryHistory(userId: string) {
    await delay(200);
    return [
      {
        id: '1',
        type: 'home_consultation',
        date: '2024-06-07',
        status: 'completed',
        doctor: 'Dr. María García',
      },
      {
        id: '2',
        type: 'lab_collection',
        date: '2024-06-05',
        status: 'pending',
        service: 'Análisis de sangre',
      },
    ];
  }
}
