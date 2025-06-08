
import type { DeliveryService as DeliveryServiceType, DeliveryTracking, DeliveryStaff } from '@/types/delivery';

export interface DeliveryRequest {
  patientId: string;
  serviceType: string;
  scheduledDate: string;
  address: string;
  notes?: string;
  priority?: string;
  specialInstructions?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class DeliveryService {
  static async getDeliveryServices(patientId: string): Promise<DeliveryServiceType[]> {
    await delay(300);
    
    // Mock data
    return [
      {
        id: 'del-1',
        patientId,
        serviceType: 'medication_delivery',
        scheduledDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        address: {
          street: 'Av. Reforma 123, Col. Centro',
          city: 'Ciudad de México',
          state: 'CDMX',
          zipCode: '06000',
          country: 'México',
          coordinates: { lat: 19.4326, lng: -99.1332 }
        },
        status: 'in_transit',
        priority: 'normal',
        estimatedCost: 150,
        createdAt: new Date().toISOString(),
        estimatedArrival: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        currentLocation: 'En camino - Av. Insurgentes'
      },
      {
        id: 'del-2',
        patientId,
        serviceType: 'sample_collection',
        scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        address: {
          street: 'Calle Madero 456, Col. Roma',
          city: 'Ciudad de México',
          state: 'CDMX',
          zipCode: '06700',
          country: 'México'
        },
        status: 'assigned',
        priority: 'high',
        estimatedCost: 300,
        createdAt: new Date().toISOString()
      }
    ];
  }

  static async requestDelivery(request: DeliveryRequest): Promise<DeliveryServiceType> {
    await delay(500);
    
    const newDelivery: DeliveryServiceType = {
      id: crypto.randomUUID(),
      patientId: request.patientId,
      serviceType: request.serviceType as any,
      scheduledDate: request.scheduledDate,
      address: {
        street: request.address,
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '06000',
        country: 'México'
      },
      status: 'requested',
      priority: (request.priority as any) || 'normal',
      estimatedCost: this.calculateCost(request.serviceType),
      createdAt: new Date().toISOString(),
      notes: request.notes,
      specialInstructions: request.specialInstructions
    };
    
    return newDelivery;
  }

  static async getDeliveryTracking(deliveryId: string): Promise<DeliveryTracking> {
    await delay(200);
    
    return {
      id: crypto.randomUUID(),
      serviceId: deliveryId,
      currentLocation: 'Av. Insurgentes Sur 1234',
      coordinates: { lat: 19.4326, lng: -99.1332 },
      estimatedArrival: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      status: 'in_transit',
      events: [
        {
          id: '1',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          status: 'assigned',
          description: 'Pedido asignado al repartidor',
          location: 'Farmacia Central'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          status: 'in_transit',
          description: 'En camino hacia su ubicación',
          location: 'Av. Insurgentes'
        }
      ]
    };
  }

  static async getAvailableStaff(serviceType: string): Promise<DeliveryStaff[]> {
    await delay(300);
    
    return [
      {
        id: 'staff-1',
        name: 'Carlos Mendoza',
        phone: '+52 55 1234 5678',
        specialization: ['medication_delivery', 'sample_collection'],
        rating: 4.8,
        isAvailable: true,
        currentLocation: { lat: 19.4284, lng: -99.1276 }
      },
      {
        id: 'staff-2',
        name: 'Dra. Ana Rodríguez',
        phone: '+52 55 8765 4321',
        specialization: ['home_consultation', 'nursing_care'],
        rating: 4.9,
        isAvailable: true,
        currentLocation: { lat: 19.4326, lng: -99.1332 }
      }
    ];
  }

  static async rateService(deliveryId: string, rating: number, feedback?: string): Promise<boolean> {
    await delay(200);
    console.log(`Rating service ${deliveryId}: ${rating} stars`);
    return true;
  }

  private static calculateCost(serviceType: string): number {
    const baseCosts = {
      medication_delivery: 50,
      sample_collection: 200,
      home_consultation: 800,
      nursing_care: 600,
      medical_equipment: 300,
      oxygen_delivery: 400,
      nebulizer_delivery: 250,
      emergency_care: 1500
    };
    
    return baseCosts[serviceType as keyof typeof baseCosts] || 100;
  }
}
