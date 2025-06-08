
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PharmacyService } from '@/services/api/pharmacyService';

export const usePharmacyNetwork = () => {
  return useQuery({
    queryKey: ['pharmacy-network'],
    queryFn: PharmacyService.getNearbyPharmacies,
  });
};

export const usePharmacySearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ['pharmacy-search', searchTerm],
    queryFn: () => PharmacyService.searchPharmacies(searchTerm),
    enabled: !!searchTerm && searchTerm.length > 2,
  });
};

export const useSendPrescription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ prescriptionId, pharmacyId }: { prescriptionId: string; pharmacyId: string }) =>
      PharmacyService.sendPrescriptionToPharmacy(prescriptionId, pharmacyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
    },
  });
};
