
import { delay } from '@/lib/utils';

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  isOpen: boolean;
  distance: number;
  deliveryAvailable: boolean;
  rating: number;
}

export interface Medication {
  id: string;
  name: string;
  price: number;
  availability: 'in_stock' | 'low_stock' | 'out_of_stock';
  pharmacyId: string;
}

export class PharmacyService {
  static async getNearbyPharmacies(location: { lat: number; lng: number }): Promise<Pharmacy[]> {
    await delay(500);
    return [
      {
        id: 'ph1',
        name: 'Farmacia San Pablo',
        address: 'Av. Insurgentes 456',
        phone: '+52 55 2345 6789',
        isOpen: true,
        distance: 0.8,
        deliveryAvailable: true,
        rating: 4.5
      },
      {
        id: 'ph2',
        name: 'Farmacias del Ahorro',
        address: 'Calle Madero 789',
        phone: '+52 55 3456 7890',
        isOpen: true,
        distance: 1.2,
        deliveryAvailable: false,
        rating: 4.2
      }
    ];
  }

  static async searchMedications(query: string): Promise<Medication[]> {
    await delay(400);
    return [
      {
        id: 'med1',
        name: 'Paracetamol 500mg',
        price: 25.50,
        availability: 'in_stock',
        pharmacyId: 'ph1'
      }
    ];
  }

  static async sendPrescriptionToPharmacy(prescriptionId: string, pharmacyId: string): Promise<boolean> {
    await delay(600);
    return true;
  }
}
