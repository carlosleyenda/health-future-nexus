import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NotificationService, type Notification } from '@/services/api/notificationService';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth';
import { supabase } from '@/integrations/supabase/client';

export const useNotifications = (userId?: string) => {
  const { user } = useAuthStore();
  const targetUserId = userId || user?.id;

  return useQuery({
    queryKey: ['notifications', targetUserId],
    queryFn: async () => {
      if (!targetUserId) return [];
      return NotificationService.getNotifications(targetUserId);
    },
    enabled: !!targetUserId,
    refetchInterval: 30000, // Refrescar cada 30 segundos
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (notificationId: string) => {
      return NotificationService.markAsRead(notificationId);
    },
    onSuccess: (_, notificationId) => {
      // Actualizar cache local
      queryClient.setQueryData(['notifications'], (oldData: Notification[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(notification =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        );
      });
      
      // Invalidar y refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      return NotificationService.markAllAsRead(userId);
    },
    onSuccess: (_, userId) => {
      // Invalidar y refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
      toast.success('Todas las notificaciones marcadas como leídas');
    },
    onError: () => {
      toast.error('Error al marcar notificaciones como leídas');
    },
  });
};

export const useSendNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (notification: Omit<Notification, 'id' | 'created_at' | 'updated_at'>) => {
      return NotificationService.sendNotification(notification);
    },
    onSuccess: (_, notification) => {
      // Invalidar y refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['notifications', notification.user_id] });
      toast.success('Notificación enviada');
    },
    onError: () => {
      toast.error('Error al enviar notificación');
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (notificationId: string) => {
      return NotificationService.deleteNotification(notificationId);
    },
    onSuccess: () => {
      // Invalidar y refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notificación eliminada');
    },
    onError: () => {
      toast.error('Error al eliminar notificación');
    },
  });
};

export const useAppointmentReminders = () => {
  return useMutation({
    mutationFn: async ({ appointmentId, userId }: { appointmentId: string; userId: string }) => {
      return NotificationService.sendAppointmentReminder(appointmentId, userId);
    },
    onSuccess: () => {
      toast.success('Recordatorio enviado');
    },
    onError: () => {
      toast.error('Error al enviar recordatorio');
    },
  });
};

// Hook para notificaciones en tiempo real usando Supabase Realtime
export const useRealtimeNotifications = (userId: string) => {
  const queryClient = useQueryClient();
  
  React.useEffect(() => {
    if (!userId) return;

    // Suscribirse a cambios en tiempo real
    const channel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('Nueva notificación:', payload);
          
          // Invalidar cache para refrescar datos
          queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
          
          // Mostrar toast para nueva notificación
          const newNotification = payload.new as Notification;
          if (newNotification) {
            toast(newNotification.title, {
              description: newNotification.message,
              duration: 4000,
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        () => {
          // Invalidar cache cuando se actualiza una notificación
          queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);
};

// Hook para obtener estadísticas de notificaciones
export const useNotificationStats = (userId: string) => {
  return useQuery({
    queryKey: ['notification-stats', userId],
    queryFn: async () => {
      if (!userId) return { total: 0, unread: 0, urgent: 0 };
      
      const notifications = await NotificationService.getNotifications(userId);
      
      return {
        total: notifications.length,
        unread: notifications.filter(n => !n.is_read).length,
        urgent: notifications.filter(n => n.priority === 'urgent' && !n.is_read).length,
      };
    },
    enabled: !!userId,
    refetchInterval: 30000,
  });
};