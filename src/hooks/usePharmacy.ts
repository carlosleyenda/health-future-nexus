
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PharmacyService } from '@/services/api';
import { toast } from 'sonner';

export const useNearbyPharmacies = () => {
  return useQuery({
    queryKey: ['nearby-pharmacies'],
    queryFn: () => PharmacyService.getNearbyPharmacies(),
  });
};

export const usePharmacyNetwork = () => {
  return useQuery({
    queryKey: ['pharmacy-network'],
    queryFn: () => PharmacyService.getNearbyPharmacies(),
  });
};

export const useSearchPharmacies = (searchTerm: string) => {
  return useQuery({
    queryKey: ['search-pharmacies', searchTerm],
    queryFn: () => PharmacyService.searchPharmacies(searchTerm),
    enabled: searchTerm.length > 0,
  });
};

export const useSendPrescription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ prescriptionId, pharmacyId }: { prescriptionId: string; pharmacyId: string }) =>
      PharmacyService.sendPrescriptionToPharmacy(prescriptionId, pharmacyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nearby-pharmacies'] });
      toast.success('Receta enviada exitosamente');
    },
    onError: () => {
      toast.error('Error al enviar la receta');
    },
  });
};
