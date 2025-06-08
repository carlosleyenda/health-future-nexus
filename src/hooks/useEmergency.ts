
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EmergencyService } from '@/services/api';
import { toast } from 'sonner';

export const useEmergencyAlert = (patientId: string) => {
  const queryClient = useQueryClient();

  const sendEmergencyAlert = useMutation({
    mutationFn: EmergencyService.sendAlert,
    onSuccess: () => {
      toast.success('Alerta de emergencia enviada');
    },
    onError: () => {
      toast.error('Error al enviar alerta de emergencia');
    },
  });

  const { data: emergencyContacts } = useQuery({
    queryKey: ['emergency-contacts', patientId],
    queryFn: () => EmergencyService.getEmergencyContacts(patientId),
    enabled: !!patientId,
  });

  return {
    sendEmergencyAlert,
    emergencyContacts
  };
};

export const useEmergencyHistory = (patientId: string) => {
  return useQuery({
    queryKey: ['emergency-history', patientId],
    queryFn: () => EmergencyService.getEmergencyHistory(patientId),
    enabled: !!patientId,
  });
};
