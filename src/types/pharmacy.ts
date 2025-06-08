
export interface Medication {
  id: string;
  name: string;
  activeIngredient: string;
  brand: string;
  dosage: string;
  form: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'drops';
  price: number;
  description: string;
  sideEffects: string[];
  contraindications: string[];
  requiresPrescription: boolean;
  inStock: boolean;
  stockQuantity: number;
  image?: string;
  category: string;
}

export interface CartItem {
  medication: Medication;
  quantity: number;
  prescriptionId?: string;
}

export interface MedicationOrder {
  id: string;
  patientId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryAddress?: string;
  prescriptionRequired: boolean;
  pharmacyId: string;
}

export interface DigitalPrescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  medications: Array<{
    medicationId: string;
    medicationName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  issuedDate: string;
  validUntil: string;
  status: 'active' | 'used' | 'expired';
  qrCode?: string;
}
