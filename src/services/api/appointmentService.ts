
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  duration: number;
  type: string;
  status: string;
  reason: string;
  notes?: string;
  total_cost: number;
  payment_status: string;
  video_call_url?: string;
  is_emergency: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentData {
  doctor_id: string;
  appointment_date: string;
  duration?: number;
  type?: string;
  reason: string;
  notes?: string;
  is_emergency?: boolean;
}

export class AppointmentService {
  // Get user's appointments
  static async getUserAppointments(userId: string, userRole: 'patient' | 'doctor'): Promise<Appointment[]> {
    try {
      const column = userRole === 'patient' ? 'patient_id' : 'doctor_id';
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patient_profile:profiles!appointments_patient_id_fkey(first_name, last_name),
          doctor_profile:profiles!appointments_doctor_id_fkey(first_name, last_name)
        `)
        .eq(column, userId)
        .order('appointment_date', { ascending: true });

      if (error) {
        console.error('Error fetching appointments:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserAppointments:', error);
      throw error;
    }
  }

  // Create new appointment
  static async createAppointment(appointmentData: CreateAppointmentData): Promise<Appointment> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const newAppointment = {
        ...appointmentData,
        patient_id: user.id,
        duration: appointmentData.duration || 30,
        type: appointmentData.type || 'consultation',
        status: 'scheduled',
        total_cost: AppointmentService.calculateCost(appointmentData.duration || 30, appointmentData.type || 'consultation'),
        payment_status: 'pending',
        is_emergency: appointmentData.is_emergency || false
      };

      const { data, error } = await supabase
        .from('appointments')
        .insert([newAppointment])
        .select()
        .single();

      if (error) {
        console.error('Error creating appointment:', error);
        throw error;
      }

      toast.success('Cita agendada exitosamente');
      return data;
    } catch (error) {
      console.error('Error in createAppointment:', error);
      toast.error('Error al agendar la cita');
      throw error;
    }
  }

  // Update appointment
  static async updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating appointment:', error);
        throw error;
      }

      toast.success('Cita actualizada exitosamente');
      return data;
    } catch (error) {
      console.error('Error in updateAppointment:', error);
      toast.error('Error al actualizar la cita');
      throw error;
    }
  }

  // Cancel appointment
  static async cancelAppointment(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', id);

      if (error) {
        console.error('Error cancelling appointment:', error);
        throw error;
      }

      toast.success('Cita cancelada exitosamente');
    } catch (error) {
      console.error('Error in cancelAppointment:', error);
      toast.error('Error al cancelar la cita');
      throw error;
    }
  }

  // Get available time slots for a doctor on a specific date
  static async getAvailableTimeSlots(doctorId: string, date: string): Promise<string[]> {
    try {
      const dayOfWeek = new Date(date).getDay();
      
      // Get doctor availability for the day
      const { data: availability, error: availError } = await supabase
        .from('doctor_availability')
        .select('*')
        .eq('doctor_id', doctorId)
        .eq('day_of_week', dayOfWeek)
        .eq('is_available', true);

      if (availError) {
        console.error('Error fetching availability:', availError);
        throw availError;
      }

      if (!availability || availability.length === 0) {
        return [];
      }

      // Get existing appointments for the date
      const { data: appointments, error: apptError } = await supabase
        .from('appointments')
        .select('appointment_date, duration')
        .eq('doctor_id', doctorId)
        .gte('appointment_date', `${date}T00:00:00`)
        .lt('appointment_date', `${date}T23:59:59`)
        .neq('status', 'cancelled');

      if (apptError) {
        console.error('Error fetching appointments:', apptError);
        throw apptError;
      }

      // Generate available time slots
      const timeSlots: string[] = [];
      const slot = availability[0];
      const startTime = new Date(`${date}T${slot.start_time}`);
      const endTime = new Date(`${date}T${slot.end_time}`);

      // Generate 30-minute slots
      const current = new Date(startTime);
      while (current < endTime) {
        const timeString = current.toTimeString().slice(0, 5);
        
        // Check if slot is not booked
        const isBooked = appointments?.some(apt => {
          const aptTime = new Date(apt.appointment_date);
          const aptEndTime = new Date(aptTime.getTime() + apt.duration * 60000);
          return current >= aptTime && current < aptEndTime;
        });

        if (!isBooked) {
          timeSlots.push(timeString);
        }

        current.setMinutes(current.getMinutes() + 30);
      }

      return timeSlots;
    } catch (error) {
      console.error('Error in getAvailableTimeSlots:', error);
      throw error;
    }
  }

  // Calculate appointment cost
  private static calculateCost(duration: number, type: string): number {
    const baseCost = 100; // Base cost in MXN
    const durationMultiplier = duration / 30;
    
    const typeMultipliers = {
      consultation: 1.5,
      follow_up: 1.0,
      emergency: 2.0,
      specialist: 2.5
    };

    return baseCost * durationMultiplier * (typeMultipliers[type as keyof typeof typeMultipliers] || 1);
  }
}
