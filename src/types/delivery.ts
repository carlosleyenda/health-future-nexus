
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
  | 'home_consultation'
  | 'specialist_visit'
  | 'nursing_care'
  | 'sample_collection'
  | 'medication_delivery'
  | 'device_installation'
  | 'emergency_care'
  | 'mobile_lab'
  | 'mobile_imaging'
  | 'mobile_surgery'
  | 'icu_transport'
  | 'dialysis_mobile'
  | 'mental_health_crisis'
  | 'addiction_treatment'
  | 'geriatric_care'
  | 'pediatric_care';

export type ServicePriority = 'low' | 'normal' | 'high' | 'urgent' | 'emergency';

import { Address, Coordinates } from './user';
