
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotificationService } from '@/services/api';
import { toast } from 'sonner';

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'prescription' | 'reminder' | 'alert' | 'general';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Simulación de notificaciones para el ejemplo
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Cita confirmada',
    message: 'Tu cita con Dr. García ha sido confirmada para mañana a las 14:00',
    type: 'appointment',
    isRead: false,
    createdAt: new Date().toISOString(),
    actionUrl: '/appointments'
  },
  {
    id: '2',
    userId: '1',
    title: 'Receta disponible',
    message: 'Tu receta médica está lista para recoger en la farmacia',
    type: 'prescription',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    actionUrl: '/prescriptions'
  }
];

export const useNotifications = (userId: string) => {
  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      // Simulación de delay de red
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockNotifications.filter(n => n.userId === userId);
    },
    enabled: !!userId,
  });
};

export const useMarkNotificationAsRead = () => {
  return useMutation({
    mutationFn: async (notificationId: string) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      // Aquí iría la lógica real para marcar como leída
      return true;
    },
    onSuccess: () => {
      // Invalidar cache de notificaciones
    },
  });
};

export const useSendNotification = () => {
  return useMutation({
    mutationFn: async ({ 
      userId, 
      title, 
      message, 
      type 
    }: { 
      userId: string; 
      title: string; 
      message: string; 
      type: Notification['type'];
    }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Lógica para enviar notificación
      return true;
    },
    onSuccess: () => {
      toast.success('Notificación enviada');
    },
    onError: () => {
      toast.error('Error al enviar notificación');
    },
  });
};

export const useAppointmentReminders = () => {
  return useMutation({
    mutationFn: async (appointmentId: string) => {
      return NotificationService.sendAppointmentReminder(appointmentId);
    },
    onSuccess: () => {
      toast.success('Recordatorio enviado');
    },
  });
};
