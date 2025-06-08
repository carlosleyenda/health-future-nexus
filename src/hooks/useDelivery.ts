
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DeliveryService, type DeliveryRequest } from '@/services/api/deliveryService';
import { toast } from 'sonner';

export const useDeliveryServices = (patientId: string) => {
  return useQuery({
    queryKey: ['delivery-services', patientId],
    queryFn: () => DeliveryService.getDeliveryServices(patientId),
    enabled: !!patientId,
  });
};

export const useRequestDelivery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: DeliveryRequest) => DeliveryService.requestDelivery(request),
    onSuccess: (newDelivery) => {
      queryClient.invalidateQueries({ queryKey: ['delivery-services', newDelivery.patientId] });
      toast.success('Servicio solicitado correctamente');
    },
    onError: () => {
      toast.error('Error al solicitar el servicio');
    },
  });
};

export const useDeliveryTracking = (deliveryId: string) => {
  return useQuery({
    queryKey: ['delivery-tracking', deliveryId],
    queryFn: () => DeliveryService.getDeliveryTracking(deliveryId),
    enabled: !!deliveryId,
    refetchInterval: 30000, // Update every 30 seconds
  });
};

export const useAvailableStaff = (serviceType: string) => {
  return useQuery({
    queryKey: ['available-staff', serviceType],
    queryFn: () => DeliveryService.getAvailableStaff(serviceType),
    enabled: !!serviceType,
  });
};

export const useRateService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ deliveryId, rating, feedback }: { deliveryId: string; rating: number; feedback?: string }) =>
      DeliveryService.rateService(deliveryId, rating, feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-services'] });
      toast.success('Calificación enviada');
    },
    onError: () => {
      toast.error('Error al enviar calificación');
    },
  });
};
