
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PharmacyService } from '@/services/api';
import { toast } from 'sonner';

export const usePharmacyNetwork = (location: { lat: number; lng: number }, radius: number) => {
  return useQuery({
    queryKey: ['pharmacies', 'nearby', location.lat, location.lng, radius],
    queryFn: () => PharmacyService.getNearbyPharmacies(location, radius),
    enabled: !!location.lat && !!location.lng,
  });
};

export const usePharmacyProducts = (pharmacyId: string) => {
  return useQuery({
    queryKey: ['pharmacy-products', pharmacyId],
    queryFn: () => PharmacyService.getPharmacyProducts(pharmacyId),
    enabled: !!pharmacyId,
  });
};

export const useSendPrescriptionToPharmacy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ prescriptionId, pharmacyId }: { prescriptionId: string; pharmacyId: string }) =>
      PharmacyService.sendPrescription(prescriptionId, pharmacyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
      toast.success('Receta enviada a la farmacia');
    },
    onError: () => {
      toast.error('Error al enviar la receta');
    },
  });
};

export const useOrderMedicationDelivery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: PharmacyService.orderDelivery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-orders'] });
      toast.success('Pedido de delivery creado');
    },
    onError: () => {
      toast.error('Error al crear el pedido');
    },
  });
};
