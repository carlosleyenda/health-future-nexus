export interface DeliveryStaff {
  id: string;
  user_id: string;
  staff_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  profile_photo?: string;
  license_number: string;
  vehicle_type: 'motorcycle' | 'bicycle' | 'car' | 'drone';
  vehicle_brand?: string;
  vehicle_model?: string;
  vehicle_plate?: string;
  rating: number;
  total_deliveries: number;
  completed_deliveries: number;
  cancelled_deliveries: number;
  total_earnings: number;
  average_delivery_time: number;
  completion_rate: number;
  is_active: boolean;
  is_online: boolean;
  current_location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  specializations?: string[];
  documents_verified: boolean;
  background_check_status: 'pending' | 'approved' | 'rejected';
  insurance_policy?: string;
  emergency_contact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  bank_account_info?: {
    bank_name: string;
    account_number: string;
    account_type: string;
  };
  tax_id?: string;
  created_at: string;
  updated_at: string;
}

export interface DeliveryService {
  id: string;
  patient_id?: string;
  delivery_staff_id?: string;
  service_type: string;
  status: 'requested' | 'assigned' | 'accepted' | 'in_transit' | 'arrived' | 'in_progress' | 'completed' | 'cancelled' | 'failed';
  priority: 'low' | 'normal' | 'high' | 'urgent' | 'emergency';
  pickup_address: {
    street: string;
    city: string;
    district: string;
    reference?: string;
    coordinates?: { lat: number; lng: number };
  };
  delivery_address: {
    street: string;
    city: string;
    district: string;
    reference?: string;
    coordinates?: { lat: number; lng: number };
  };
  scheduled_time?: string;
  estimated_arrival?: string;
  actual_pickup_time?: string;
  actual_delivery_time?: string;
  distance_km?: number;
  estimated_duration_minutes?: number;
  actual_duration_minutes?: number;
  base_cost: number;
  distance_cost: number;
  urgency_multiplier: number;
  time_multiplier: number;
  total_cost: number;
  delivery_fee: number;
  platform_fee: number;
  tips: number;
  staff_earnings?: number;
  payment_status: 'pending' | 'authorized' | 'paid' | 'refunded' | 'failed';
  payment_method?: string;
  transaction_id?: string;
  special_instructions?: string;
  equipment_required?: string[];
  medical_conditions?: string[];
  proof_of_delivery?: {
    photo?: string;
    signature?: string;
    notes?: string;
    timestamp?: string;
  };
  patient_signature?: string;
  delivery_photo?: string;
  rating?: number;
  feedback?: string;
  incident_reports?: any[];
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface DeliveryEarnings {
  id: string;
  delivery_staff_id: string;
  delivery_service_id?: string;
  earning_type: 'delivery_fee' | 'bonus' | 'tip' | 'incentive' | 'penalty' | 'adjustment';
  amount: number;
  currency: string;
  description?: string;
  payment_status: 'pending' | 'paid' | 'processing' | 'failed';
  payment_date?: string;
  payment_method?: string;
  transaction_reference?: string;
  tax_withheld: number;
  net_amount?: number;
  created_at: string;
}

export interface DeliveryRating {
  id: string;
  delivery_service_id: string;
  delivery_staff_id: string;
  patient_id?: string;
  overall_rating: number;
  punctuality_rating?: number;
  professionalism_rating?: number;
  communication_rating?: number;
  care_quality_rating?: number;
  feedback?: string;
  tags?: string[];
  is_anonymous: boolean;
  created_at: string;
}

export interface DeliveryPerformanceMetrics {
  id: string;
  delivery_staff_id: string;
  date: string;
  total_deliveries: number;
  completed_deliveries: number;
  cancelled_deliveries: number;
  average_delivery_time?: number;
  total_distance_km: number;
  total_earnings: number;
  total_tips: number;
  average_rating?: number;
  online_hours: number;
  acceptance_rate?: number;
  completion_rate?: number;
  customer_complaints: number;
  positive_feedback: number;
  created_at: string;
}

export interface VehicleStatus {
  id: string;
  delivery_staff_id: string;
  fuel_level: number;
  battery_level?: number;
  maintenance_due_date?: string;
  last_maintenance_date?: string;
  mileage_km: number;
  insurance_expiry?: string;
  registration_expiry?: string;
  vehicle_condition: 'excellent' | 'good' | 'fair' | 'poor';
  current_issues?: string[];
  last_inspection_date?: string;
  is_operational: boolean;
  updated_at: string;
}

export interface EarningsSummary {
  today: number;
  week: number;
  month: number;
  year: number;
  totalTips: number;
  pendingPayments: number;
  averagePerDelivery: number;
  bestDay: {
    date: string;
    amount: number;
  };
  breakdown: {
    deliveryFees: number;
    tips: number;
    bonuses: number;
    penalties: number;
  };
}

export interface DeliveryStats {
  totalDeliveries: number;
  completedToday: number;
  averageRating: number;
  completionRate: number;
  averageDeliveryTime: number;
  totalDistanceThisMonth: number;
  onlineHoursToday: number;
  acceptanceRate: number;
}

export interface PaymentBreakdown {
  basePrice: number;
  distanceCost: number;
  urgencyMultiplier: number;
  timeMultiplier: number;
  weatherMultiplier?: number;
  platformFee: number;
  deliveryPersonEarning: number;
  total: number;
}