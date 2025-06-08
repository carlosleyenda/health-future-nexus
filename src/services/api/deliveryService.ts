
import { delay } from '@/lib/utils';

export interface DeliveryRequest {
  patientId: string;
  serviceType: string;
  scheduledDate: string;
  notes: string;
}

export interface Delivery {
  id: string;
  patientId: string;
  serviceType: string;
  status: 'scheduled' | 'in_transit' | 'delivered';
  deliveryAddress: string;
  estimatedArrival: string;
  driverName?: string;
  driverPhone?: string;
}

export class DeliveryService {
  static async getDeliveryServices(patientId: string): Promise<Delivery[]> {
    await delay(400);
    return [
      {
        id: 'del1',
        patientId,
        serviceType: 'medication',
        status: 'in_transit',
        deliveryAddress: 'Av. Reforma 123, CDMX',
        estimatedArrival: '2024-06-08T16:30:00Z',
        driverName: 'Carlos Mendoza',
        driverPhone: '+52 55 1234 5678'
      }
    ];
  }

  static async requestDelivery(request: DeliveryRequest): Promise<Delivery> {
    await delay(600);
    return {
      id: crypto.randomUUID(),
      patientId: request.patientId,
      serviceType: request.serviceType,
      status: 'scheduled',
      deliveryAddress: 'Av. Reforma 123, CDMX',
      estimatedArrival: new Date(Date.now() + 60 * 60 * 1000).toISOString()
    };
  }

  static async getDeliveryTracking(deliveryId: string) {
    await delay(300);
    return {
      deliveryId,
      driverName: 'Carlos Mendoza',
      driverPhone: '+52 55 1234 5678',
      estimatedArrival: '15 minutos',
      currentLocation: { lat: 19.4326, lng: -99.1332 }
    };
  }
}
