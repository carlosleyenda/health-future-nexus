
import { delay } from '@/lib/delay';

export interface DeliveryRequest {
  patientId: string;
  serviceType: string;
  address: string;
  scheduledDate: string;
  notes?: string;
}

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

  static async getDeliveryServices(patientId: string) {
    await delay(300);
    console.log('Getting delivery services for patient:', patientId);
    return [
      {
        id: '1',
        patientId,
        serviceType: 'home_consultation',
        status: 'scheduled',
        scheduledDate: '2024-06-10',
        doctor: 'Dr. María García',
        deliveryAddress: 'Calle Principal 123, Ciudad',
        estimatedArrival: '10:00 AM'
      },
      {
        id: '2',
        patientId,
        serviceType: 'lab_collection',
        status: 'pending',
        scheduledDate: '2024-06-08',
        service: 'Análisis de sangre',
        deliveryAddress: 'Calle Principal 123, Ciudad',
        estimatedArrival: '2:00 PM'
      }
    ];
  }

  static async requestDelivery(request: DeliveryRequest) {
    await delay(400);
    console.log('Requesting delivery service:', request);
    return {
      id: 'delivery-' + Date.now(),
      patientId: request.patientId,
      serviceType: request.serviceType,
      status: 'requested',
      scheduledDate: request.scheduledDate,
      address: request.address,
      notes: request.notes,
      deliveryAddress: request.address,
      estimatedArrival: '30 minutos'
    };
  }

  static async getDeliveryTracking(deliveryId: string) {
    await delay(200);
    console.log('Getting delivery tracking for:', deliveryId);
    return {
      id: deliveryId,
      status: 'in_transit',
      location: 'En camino a tu ubicación',
      estimatedArrival: '15 minutos',
      driver: {
        name: 'Carlos Rodríguez',
        phone: '+52 555 123 4567'
      },
      driverName: 'Carlos Rodríguez',
      driverPhone: '+52 555 123 4567'
    };
  }
}
