
export interface DeliveryService {
  id: string;
  patientId: string;
  serviceType: DeliveryServiceType;
  staffId?: string;
  scheduledDate: string;
  address: Address;
  coordinates?: Coordinates;
  status: DeliveryStatus;
  priority: ServicePriority;
  estimatedCost: number;
  actualCost?: number;
  notes?: string;
  equipmentRequired?: string[];
  specialInstructions?: string;
  trackingUrl?: string;
  rating?: number;
  createdAt: string;
  estimatedArrival?: string;
  currentLocation?: string;
}

export type DeliveryStatus = 
  | 'requested'
  | 'assigned'
  | 'in_transit'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type DeliveryServiceType = 
  | 'medication_delivery'
  | 'sample_collection'
  | 'home_consultation'
  | 'nursing_care'
  | 'medical_equipment'
  | 'oxygen_delivery'
  | 'nebulizer_delivery'
  | 'emergency_care';

export type ServicePriority = 'low' | 'normal' | 'high' | 'urgent' | 'emergency';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface DeliveryTracking {
  id: string;
  serviceId: string;
  currentLocation: string;
  coordinates: Coordinates;
  estimatedArrival: string;
  status: DeliveryStatus;
  events: TrackingEvent[];
}

export interface TrackingEvent {
  id: string;
  timestamp: string;
  status: DeliveryStatus;
  description: string;
  location: string;
}

export interface DeliveryStaff {
  id: string;
  name: string;
  phone: string;
  specialization: string[];
  rating: number;
  isAvailable: boolean;
  currentLocation?: Coordinates;
}
