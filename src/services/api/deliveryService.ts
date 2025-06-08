
import { delay } from '@/lib/delay';

export interface DeliveryRequest {
  patientId: string;
  serviceType: string;
  scheduledDate: string;
  notes: string;
  address: string;
}

export class DeliveryService {
  static async getActiveDeliveries() {
    await delay(300);
    return [
      {
        id: '1',
        patientName: 'Juan Pérez',
        medication: 'Ibuprofeno 400mg',
        status: 'en_camino',
        estimatedTime: '15 min',
        driver: 'Carlos García',
        trackingNumber: 'DEL001'
      },
      {
        id: '2',
        patientName: 'María González',
        medication: 'Antibiótico',
        status: 'preparando',
        estimatedTime: '45 min',
        driver: 'Ana López',
        trackingNumber: 'DEL002'
      }
    ];
  }

  static async requestDelivery(request: DeliveryRequest) {
    await delay(500);
    return {
      id: Date.now().toString(),
      ...request,
      status: 'pending',
      trackingNumber: `DEL${Date.now()}`,
      estimatedTime: '30-45 min'
    };
  }

  static async trackDelivery(trackingNumber: string) {
    await delay(200);
    return {
      trackingNumber,
      status: 'en_camino',
      location: 'Cerca de tu ubicación',
      estimatedTime: '10 min',
      driver: {
        name: 'Carlos García',
        phone: '+1234567890',
        rating: 4.8
      },
      history: [
        { time: '14:30', status: 'Pedido confirmado' },
        { time: '14:45', status: 'En preparación' },
        { time: '15:00', status: 'En camino' }
      ]
    };
  }
}
