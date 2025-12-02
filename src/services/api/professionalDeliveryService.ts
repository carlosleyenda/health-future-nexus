import { supabase } from '@/integrations/supabase/client';
import type { 
  DeliveryStaff, 
  DeliveryService, 
  DeliveryEarnings, 
  DeliveryRating,
  DeliveryPerformanceMetrics,
  VehicleStatus 
} from '@/types/professionalDelivery';

export class ProfessionalDeliveryService {
  // Get delivery staff profile
  static async getDeliveryStaffProfile(userId: string): Promise<DeliveryStaff | null> {
    const { data, error } = await supabase
      .from('delivery_staff')
      .select(`
        *,
        delivery_vehicle_status(*),
        delivery_performance_metrics!inner(*)
      `)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching delivery staff profile:', error);
      return null;
    }

    if (!data) return null;
    
    // Transform the data to match DeliveryStaff type
    const transformedData: DeliveryStaff = {
      ...data,
      current_location: data.current_location as { lat: number; lng: number; address?: string } | null,
      emergency_contact: data.emergency_contact as { name: string; phone: string; relationship: string } | null,
      bank_account_info: data.bank_account_info as { bank_name: string; account_number: string; account_holder: string; account_type: string } | null,
      vehicle_type: data.vehicle_type as "bicycle" | "car" | "drone" | "motorcycle",
      background_check_status: data.background_check_status as "pending" | "approved" | "rejected",
    };
    
    return transformedData;
  }

  // Get delivery services for staff
  static async getDeliveryServices(staffId: string, status?: string) {
    let query = supabase
      .from('delivery_services')
      .select('*')
      .eq('delivery_staff_id', staffId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching delivery services:', error);
      return [];
    }

    return data;
  }

  // Accept delivery service
  static async acceptDeliveryService(serviceId: string) {
    const { data, error } = await supabase
      .from('delivery_services')
      .update({
        status: 'accepted',
        actual_pickup_time: new Date().toISOString()
      })
      .eq('id', serviceId)
      .select()
      .single();

    if (error) {
      console.error('Error accepting delivery service:', error);
      throw error;
    }

    return data;
  }

  // Update delivery status
  static async updateDeliveryStatus(serviceId: string, status: string, location?: { lat: number; lng: number }) {
    const updates: any = { status };

    if (status === 'in_transit') {
      updates.actual_pickup_time = new Date().toISOString();
    } else if (status === 'completed') {
      updates.actual_delivery_time = new Date().toISOString();
      updates.payment_status = 'paid';
    }

    const { data, error } = await supabase
      .from('delivery_services')
      .update(updates)
      .eq('id', serviceId)
      .select()
      .single();

    if (error) {
      console.error('Error updating delivery status:', error);
      throw error;
    }

    return data;
  }

  // Get earnings data
  static async getEarnings(staffId: string, period: 'today' | 'week' | 'month' | 'year' = 'today') {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    const { data, error } = await supabase
      .from('delivery_earnings')
      .select('*')
      .eq('delivery_staff_id', staffId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching earnings:', error);
      return [];
    }

    return data;
  }

  // Calculate dynamic pricing
  static calculateDeliveryPrice(
    distance: number,
    priority: string,
    timeOfDay: number,
    weather?: string
  ): { basePrice: number; totalPrice: number; breakdown: any } {
    const basePrice = 5.00; // Base price in PEN
    const distanceRate = 1.50; // Per km
    
    let distanceCost = distance * distanceRate;
    let urgencyMultiplier = 1.0;
    let timeMultiplier = 1.0;
    let weatherMultiplier = 1.0;

    // Priority multipliers
    switch (priority) {
      case 'urgent':
        urgencyMultiplier = 1.5;
        break;
      case 'emergency':
        urgencyMultiplier = 2.0;
        break;
      case 'high':
        urgencyMultiplier = 1.2;
        break;
    }

    // Time of day multipliers (rush hours)
    if ((timeOfDay >= 7 && timeOfDay <= 9) || (timeOfDay >= 17 && timeOfDay <= 19)) {
      timeMultiplier = 1.3; // Rush hour
    } else if (timeOfDay >= 22 || timeOfDay <= 6) {
      timeMultiplier = 1.5; // Night time
    }

    // Weather conditions
    if (weather === 'rain' || weather === 'storm') {
      weatherMultiplier = 1.4;
    }

    const totalPrice = (basePrice + distanceCost) * urgencyMultiplier * timeMultiplier * weatherMultiplier;

    return {
      basePrice,
      totalPrice: Math.round(totalPrice * 100) / 100,
      breakdown: {
        basePrice,
        distanceCost,
        urgencyMultiplier,
        timeMultiplier,
        weatherMultiplier,
        distance
      }
    };
  }

  // Get ratings and reviews
  static async getRatings(staffId: string) {
    const { data, error } = await supabase
      .from('delivery_ratings')
      .select(`
        *,
        delivery_services(service_type),
        profiles!delivery_ratings_patient_id_fkey(first_name, last_name)
      `)
      .eq('delivery_staff_id', staffId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching ratings:', error);
      return [];
    }

    return data;
  }

  // Update vehicle status
  static async updateVehicleStatus(staffId: string, updates: Partial<VehicleStatus>) {
    const { data, error } = await supabase
      .from('delivery_vehicle_status')
      .upsert({
        delivery_staff_id: staffId,
        ...updates,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'delivery_staff_id'
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating vehicle status:', error);
      throw error;
    }

    return data;
  }

  // Get performance metrics
  static async getPerformanceMetrics(staffId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('delivery_performance_metrics')
      .select('*')
      .eq('delivery_staff_id', staffId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching performance metrics:', error);
      return [];
    }

    return data;
  }

  // Create delivery staff profile
  static async createDeliveryStaffProfile(profileData: any) {
    const { data, error } = await supabase
      .from('delivery_staff')
      .insert(profileData)
      .select()
      .single();

    if (error) {
      console.error('Error creating delivery staff profile:', error);
      throw error;
    }

    return data;
  }

  // Update online status
  static async updateOnlineStatus(staffId: string, isOnline: boolean) {
    const { data, error } = await supabase
      .from('delivery_staff')
      .update({
        is_online: isOnline,
        updated_at: new Date().toISOString()
      })
      .eq('id', staffId)
      .select()
      .single();

    if (error) {
      console.error('Error updating online status:', error);
      throw error;
    }

    return data;
  }

  // Submit proof of delivery
  static async submitProofOfDelivery(
    serviceId: string, 
    proof: { photo?: string; signature?: string; notes?: string }
  ) {
    const { data, error } = await supabase
      .from('delivery_services')
      .update({
        proof_of_delivery: proof,
        delivery_photo: proof.photo,
        patient_signature: proof.signature,
        status: 'completed',
        actual_delivery_time: new Date().toISOString()
      })
      .eq('id', serviceId)
      .select()
      .single();

    if (error) {
      console.error('Error submitting proof of delivery:', error);
      throw error;
    }

    return data;
  }
}