
import type { DeliveryService as DeliveryServiceType } from '@/types/index';

export interface DeliveryRequest {
  patientId: string;
  serviceType: string;
  scheduledDate: string;
  address: string;
  notes?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class DeliveryService {
  static async getDeliveryServices(patientId: string): Promise<DeliveryServiceType[]> {
    await delay(300);
    // Mock data for now
    return [];
  }

  static async requestDelivery(request: DeliveryRequest): Promise<DeliveryServiceType> {
    await delay(500);
    const newDelivery: DeliveryServiceType = {
      id: crypto.randomUUID(),
      patientId: request.patientId,
      serviceType: request.serviceType as any,
      scheduledDate: request.scheduledDate,
      address: request.address,
      status: 'requested',
      priority: 'normal',
      estimatedCost: 50,
      createdAt: new Date().toISOString(),
      notes: request.notes
    };
    return newDelivery;
  }

  static async getDeliveryTracking(deliveryId: string): Promise<any> {
    await delay(200);
    return {
      id: deliveryId,
      status: 'in_transit',
      estimatedArrival: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      currentLocation: 'En camino'
    };
  }
}
