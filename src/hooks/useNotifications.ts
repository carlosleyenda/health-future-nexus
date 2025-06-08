
import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NotificationService } from '@/services/api';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth';

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'prescription' | 'reminder' | 'emergency' | 'system' | 'user' | 'health' | 'delivery' | 'patient_message' | 'health_alert' | 'technical' | 'metrics' | 'general';
  priority: 'urgent' | 'important' | 'normal';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Simulación de notificaciones por rol
const generateMockNotifications = (userId: string, userRole: string): Notification[] => {
  const baseNotifications: Partial<Notification>[] = [];
  
  // Notificaciones para pacientes
  if (userRole === 'patient') {
    baseNotifications.push(
      {
        title: 'Cita confirmada',
        message: 'Tu cita con Dr. García ha sido confirmada para mañana a las 14:00',
        type: 'appointment',
        priority: 'important',
        actionUrl: '/appointments'
      },
      {
        title: 'Recordatorio de medicamento',
        message: 'Es hora de tomar tu medicamento: Paracetamol 500mg',
        type: 'prescription',
        priority: 'urgent',
        actionUrl: '/pharmacy'
      },
      {
        title: 'Resultados disponibles',
        message: 'Los resultados de tu análisis de sangre están listos',
        type: 'health',
        priority: 'important',
        actionUrl: '/medical-history'
      },
      {
        title: 'Entrega programada',
        message: 'Tu pedido de medicamentos será entregado hoy entre 2-4 PM',
        type: 'delivery',
        priority: 'normal',
        actionUrl: '/pharmacy'
      }
    );
  }
  
  // Notificaciones para doctores
  if (userRole === 'doctor') {
    baseNotifications.push(
      {
        title: 'Nueva cita programada',
        message: 'Ana López ha programado una cita para mañana a las 10:00',
        type: 'appointment',
        priority: 'important',
        actionUrl: '/schedule'
      },
      {
        title: '⚠️ Alerta de emergencia',
        message: 'Paciente Juan Pérez reporta dolor de pecho intenso',
        type: 'emergency',
        priority: 'urgent',
        actionUrl: '/patients'
      },
      {
        title: 'Mensaje de paciente',
        message: 'María González ha enviado un mensaje sobre sus síntomas',
        type: 'patient_message',
        priority: 'important',
        actionUrl: '/patients'
      },
      {
        title: 'Parámetros críticos',
        message: 'Presión arterial elevada detectada en paciente Carlos Ruiz',
        type: 'health_alert',
        priority: 'urgent',
        actionUrl: '/patients'
      }
    );
  }
  
  // Notificaciones para admins
  if (userRole === 'admin') {
    baseNotifications.push(
      {
        title: 'Nuevo registro de usuario',
        message: 'Dr. Patricia Méndez se ha registrado en el sistema',
        type: 'user',
        priority: 'normal',
        actionUrl: '/admin/users'
      },
      {
        title: 'Alerta del sistema',
        message: 'Uso de CPU alto detectado en el servidor principal',
        type: 'system',
        priority: 'urgent',
        actionUrl: '/admin/system'
      },
      {
        title: 'Problema técnico reportado',
        message: 'Fallo en el servicio de notificaciones - resuelto automáticamente',
        type: 'technical',
        priority: 'important',
        actionUrl: '/admin/logs'
      },
      {
        title: 'Métricas anómalas',
        message: 'Incremento inusual en cancelaciones de citas (30%)',
        type: 'metrics',
        priority: 'important',
        actionUrl: '/admin/analytics'
      }
    );
  }

  // Crear notificaciones completas con IDs únicos y timestamps
  return baseNotifications.map((notification, index) => ({
    id: `${userId}-${index}-${Date.now()}`,
    userId,
    title: notification.title!,
    message: notification.message!,
    type: notification.type!,
    priority: notification.priority!,
    isRead: Math.random() > 0.6, // 40% no leídas
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Últimos 7 días
    actionUrl: notification.actionUrl,
  }));
};

export const useNotifications = (userId: string) => {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      // Simulación de delay de red
      await new Promise(resolve => setTimeout(resolve, 300));
      return generateMockNotifications(userId, user?.role || 'patient');
    },
    enabled: !!userId,
    refetchInterval: 30000, // Refrescar cada 30 segundos
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (notificationId: string) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return true;
    },
    onSuccess: (_, notificationId) => {
      // Actualizar cache local
      queryClient.setQueryData(['notifications'], (oldData: Notification[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        );
      });
    },
  });
};

export const useSendNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      userId, 
      title, 
      message, 
      type,
      priority = 'normal'
    }: { 
      userId: string; 
      title: string; 
      message: string; 
      type: Notification['type'];
      priority?: Notification['priority'];
    }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newNotification: Notification = {
        id: `${userId}-${Date.now()}`,
        userId,
        title,
        message,
        type,
        priority,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      
      return newNotification;
    },
    onSuccess: (newNotification) => {
      // Agregar nueva notificación al cache
      queryClient.setQueryData(['notifications', newNotification.userId], (oldData: Notification[] | undefined) => {
        if (!oldData) return [newNotification];
        return [newNotification, ...oldData];
      });
      
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

// Hook para simular notificaciones en tiempo real
export const useRealtimeNotifications = (userId: string) => {
  const { user } = useAuthStore();
  const sendNotification = useSendNotification();
  
  React.useEffect(() => {
    if (!userId || !user) return;

    // Simular notificaciones cada 45 segundos con 20% de probabilidad
    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        const notificationTemplates: Record<string, Array<{title: string, message: string, type: Notification['type'], priority: Notification['priority']}>> = {
          patient: [
            {
              title: 'Recordatorio de cita',
              message: 'Tienes una cita en 30 minutos con Dr. García',
              type: 'reminder',
              priority: 'important'
            },
            {
              title: 'Medicamento listo',
              message: 'Tu pedido de Ibuprofeno está listo para recoger',
              type: 'prescription',
              priority: 'normal'
            }
          ],
          doctor: [
            {
              title: 'Paciente en espera',
              message: 'Ana López está en la sala de espera virtual',
              type: 'appointment',
              priority: 'important'
            },
            {
              title: 'Consulta urgente',
              message: 'Paciente reporta síntomas preocupantes',
              type: 'emergency',
              priority: 'urgent'
            }
          ],
          admin: [
            {
              title: 'Sistema optimizado',
              message: 'Mantenimiento automático completado exitosamente',
              type: 'system',
              priority: 'normal'
            },
            {
              title: 'Nuevo doctor registrado',
              message: 'Dr. Luis Martínez completó su registro',
              type: 'user',
              priority: 'normal'
            }
          ]
        };

        const templates = notificationTemplates[user.role] || [];
        if (templates.length > 0) {
          const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
          
          sendNotification.mutate({
            userId,
            ...randomTemplate
          });

          // Mostrar toast también
          toast(randomTemplate.title, {
            description: randomTemplate.message,
            duration: 4000,
          });
        }
      }
    }, 45000);

    return () => clearInterval(interval);
  }, [userId, user, sendNotification]);
};
