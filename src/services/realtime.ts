
import { useEffect } from 'react';
import { toast } from 'sonner';

interface RealtimeNotification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'prescription' | 'reminder' | 'alert' | 'general';
}

export const useRealtime = (userId: string) => {
  useEffect(() => {
    if (!userId) return;

    // Simular notificaciones en tiempo real
    const interval = setInterval(() => {
      // Solo mostrar notificaciones ocasionalmente (20% probabilidad)
      if (Math.random() < 0.2) {
        const notifications: RealtimeNotification[] = [
          {
            id: crypto.randomUUID(),
            title: 'Recordatorio de cita',
            message: 'Tienes una cita en 30 minutos',
            type: 'reminder'
          },
          {
            id: crypto.randomUUID(),
            title: 'Resultado disponible',
            message: 'Los resultados de tu análisis están listos',
            type: 'alert'
          },
          {
            id: crypto.randomUUID(),
            title: 'Medicamento entregado',
            message: 'Tu pedido ha sido entregado exitosamente',
            type: 'prescription'
          }
        ];

        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        
        toast(randomNotification.title, {
          description: randomNotification.message,
          duration: 5000,
        });
      }
    }, 30000); // Cada 30 segundos

    return () => clearInterval(interval);
  }, [userId]);
};
