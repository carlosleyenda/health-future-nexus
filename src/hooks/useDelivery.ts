
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DeliveryService } from '@/services/api';
import { toast } from 'sonner';

export const useDeliveryServices = (patientId: string) => {
  return useQuery({
    queryKey: ['delivery-services', patientId],
    queryFn: () => DeliveryService.getPatientDeliveries(patientId),
    enabled: !!patientId,
  });
};

export const useRequestDelivery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: DeliveryService.requestService,
    onSuccess: (newService) => {
      queryClient.invalidateQueries({ queryKey: ['delivery-services', newService.patientId] });
      toast.success('Servicio solicitado correctamente');
    },
    onError: () => {
      toast.error('Error al solicitar el servicio');
    },
  });
};

export const useUpdateDeliveryStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ deliveryId, status, location }: { 
      deliveryId: string; 
      status: string; 
      location?: { lat: number; lng: number } 
    }) => DeliveryService.updateStatus(deliveryId, status, location),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-services'] });
      toast.success('Estado actualizado');
    },
  });
};

export const useDeliveryTracking = (deliveryId: string) => {
  return useQuery({
    queryKey: ['delivery-tracking', deliveryId],
    queryFn: () => DeliveryService.getDeliveryTracking(deliveryId),
    enabled: !!deliveryId,
    refetchInterval: 30000, // Actualizar cada 30 segundos
  });
};
