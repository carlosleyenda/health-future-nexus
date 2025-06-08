
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PharmacyService } from '@/services/api/pharmacyService';
import { toast } from 'sonner';

export const useNearbyPharmacies = (location: { lat: number; lng: number }) => {
  return useQuery({
    queryKey: ['nearby-pharmacies', location],
    queryFn: () => PharmacyService.getNearbyPharmacies(location),
    enabled: !!(location.lat && location.lng),
  });
};

export const useSearchMedications = (query: string) => {
  return useQuery({
    queryKey: ['search-medications', query],
    queryFn: () => PharmacyService.searchMedications(query),
    enabled: query.length > 2,
  });
};

export const useSendPrescriptionToPharmacy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ prescriptionId, pharmacyId }: { prescriptionId: string; pharmacyId: string }) =>
      PharmacyService.sendPrescriptionToPharmacy(prescriptionId, pharmacyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient-prescriptions'] });
      toast.success('Receta enviada a la farmacia');
    },
    onError: () => {
      toast.error('Error al enviar la receta');
    },
  });
};
