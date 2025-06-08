
import { delay } from '@/lib/delay';

export class PharmacyService {
  static async getNearbyPharmacies() {
    await delay(300);
    return [
      { id: '1', name: 'Farmacia San Pablo', address: 'Av. Insurgentes 123', distance: '0.5 km', isOpen: true },
      { id: '2', name: 'Farmacia Guadalajara', address: 'Calle Reforma 456', distance: '1.2 km', isOpen: true },
      { id: '3', name: 'Farmacia del Ahorro', address: 'Blvd. Centro 789', distance: '2.1 km', isOpen: false },
    ];
  }

  static async searchPharmacies(searchTerm: string) {
    await delay(200);
    const allPharmacies = await this.getNearbyPharmacies();
    return allPharmacies.filter(pharmacy => 
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  static async sendPrescriptionToPharmacy(prescriptionId: string, pharmacyId: string) {
    await delay(400);
    console.log(`Sending prescription ${prescriptionId} to pharmacy ${pharmacyId}`);
    return { success: true, estimatedTime: '30 minutes' };
  }
}
