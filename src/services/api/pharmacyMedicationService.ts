
import { delay } from '@/lib/delay';
import type { Medication, MedicationOrder, DigitalPrescription, CartItem } from '@/types/pharmacy';

const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Paracetamol',
    activeIngredient: 'Acetaminofén',
    brand: 'Tylenol',
    dosage: '500mg',
    form: 'tablet',
    price: 45.50,
    description: 'Analgésico y antipirético para el alivio del dolor y la fiebre',
    sideEffects: ['Náuseas leves', 'Somnolencia'],
    contraindications: ['Alergia al acetaminofén', 'Enfermedad hepática grave'],
    requiresPrescription: false,
    inStock: true,
    stockQuantity: 150,
    category: 'Analgésicos'
  },
  {
    id: '2',
    name: 'Amoxicilina',
    activeIngredient: 'Amoxicilina',
    brand: 'Amoxil',
    dosage: '250mg',
    form: 'capsule',
    price: 89.90,
    description: 'Antibiótico de amplio espectro para infecciones bacterianas',
    sideEffects: ['Diarrea', 'Náuseas', 'Reacciones alérgicas'],
    contraindications: ['Alergia a penicilinas', 'Mononucleosis'],
    requiresPrescription: true,
    inStock: true,
    stockQuantity: 75,
    category: 'Antibióticos'
  },
  {
    id: '3',
    name: 'Loratadina',
    activeIngredient: 'Loratadina',
    brand: 'Claritin',
    dosage: '10mg',
    form: 'tablet',
    price: 32.80,
    description: 'Antihistamínico para alergias y rinitis',
    sideEffects: ['Somnolencia leve', 'Sequedad bucal'],
    contraindications: ['Hipersensibilidad conocida'],
    requiresPrescription: false,
    inStock: true,
    stockQuantity: 200,
    category: 'Antihistamínicos'
  },
];

const mockPrescriptions: DigitalPrescription[] = [
  {
    id: 'rx-001',
    patientId: 'patient-1',
    doctorId: 'doctor-1',
    doctorName: 'Dr. María González',
    medications: [
      {
        medicationId: '2',
        medicationName: 'Amoxicilina 250mg',
        dosage: '250mg',
        frequency: 'Cada 8 horas',
        duration: '7 días',
        instructions: 'Tomar con alimentos'
      }
    ],
    issuedDate: new Date().toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  }
];

export class PharmacyMedicationService {
  static async searchMedications(query: string, category?: string): Promise<Medication[]> {
    await delay(300);
    let filtered = mockMedications;
    
    if (query) {
      filtered = filtered.filter(med => 
        med.name.toLowerCase().includes(query.toLowerCase()) ||
        med.activeIngredient.toLowerCase().includes(query.toLowerCase()) ||
        med.brand.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(med => med.category === category);
    }
    
    return filtered;
  }

  static async getMedicationById(id: string): Promise<Medication | null> {
    await delay(200);
    return mockMedications.find(med => med.id === id) || null;
  }

  static async getPatientPrescriptions(patientId: string): Promise<DigitalPrescription[]> {
    await delay(300);
    return mockPrescriptions.filter(rx => rx.patientId === patientId);
  }

  static async createOrder(order: Omit<MedicationOrder, 'id' | 'orderDate' | 'status'>): Promise<MedicationOrder> {
    await delay(500);
    const newOrder: MedicationOrder = {
      ...order,
      id: crypto.randomUUID(),
      orderDate: new Date().toISOString(),
      status: 'pending'
    };
    return newOrder;
  }

  static async getOrderHistory(patientId: string): Promise<MedicationOrder[]> {
    await delay(300);
    // Mock order history
    return [
      {
        id: 'order-001',
        patientId,
        items: [
          {
            medication: mockMedications[0],
            quantity: 2,
          }
        ],
        totalAmount: 91.00,
        status: 'delivered',
        orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        prescriptionRequired: false,
        pharmacyId: 'pharmacy-1'
      }
    ];
  }
}
