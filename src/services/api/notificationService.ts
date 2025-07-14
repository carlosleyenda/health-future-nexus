
import { supabase } from '@/integrations/supabase/client';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'appointment' | 'prescription' | 'reminder' | 'emergency' | 'system' | 'user' | 'health' | 'delivery' | 'patient_message' | 'health_alert' | 'technical' | 'metrics' | 'general';
  priority: 'urgent' | 'important' | 'normal';
  is_read: boolean;
  action_url?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export class NotificationService {
  static async getNotifications(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return data || [];
  }

  static async markAsRead(notificationId: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, updated_at: new Date().toISOString() })
      .eq('id', notificationId);

    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }

    return true;
  }

  static async markAllAsRead(userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }

    return true;
  }

  static async sendNotification(notification: Omit<Notification, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .insert([{
        ...notification,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error sending notification:', error);
      return false;
    }

    return true;
  }

  static async sendAppointmentConfirmation(appointmentId: string, userId: string): Promise<boolean> {
    return this.sendNotification({
      user_id: userId,
      title: 'Cita confirmada',
      message: `Su cita ha sido confirmada. ID: ${appointmentId}`,
      type: 'appointment',
      priority: 'important',
      is_read: false,
      action_url: `/appointments`,
      metadata: { appointmentId }
    });
  }

  static async sendAppointmentReminder(appointmentId: string, userId: string): Promise<boolean> {
    return this.sendNotification({
      user_id: userId,
      title: 'Recordatorio de cita',
      message: 'Tienes una cita programada en las próximas horas',
      type: 'reminder',
      priority: 'important',
      is_read: false,
      action_url: `/appointments`,
      metadata: { appointmentId }
    });
  }

  static async sendPrescriptionNotification(prescriptionId: string, userId: string): Promise<boolean> {
    return this.sendNotification({
      user_id: userId,
      title: 'Nueva prescripción',
      message: 'Se ha generado una nueva prescripción médica',
      type: 'prescription',
      priority: 'normal',
      is_read: false,
      action_url: `/medications`,
      metadata: { prescriptionId }
    });
  }

  static async deleteNotification(notificationId: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) {
      console.error('Error deleting notification:', error);
      return false;
    }

    return true;
  }
}
