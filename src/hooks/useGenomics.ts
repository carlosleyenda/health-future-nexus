
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GenomicsService, LabIntegrationService, PrivacyService } from '@/services/genomics/genomicsService';
import { toast } from 'sonner';
import type { 
  GenomicProfile, 
  PharmacogenomicProfile, 
  DiseasePredisposition,
  FamilyHealthPlan,
  ResearchParticipation,
  AncestryAnalysis
} from '@/types/genomics';

export const useGenomicProfile = (patientId: string) => {
  return useQuery({
    queryKey: ['genomic-profile', patientId],
    queryFn: () => GenomicsService.getGenomicProfile(patientId),
    enabled: !!patientId,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const usePharmacogenomics = (patientId: string) => {
  return useQuery({
    queryKey: ['pharmacogenomics', patientId],
    queryFn: () => GenomicsService.getPharmacogenomicProfile(patientId),
    enabled: !!patientId,
  });
};

export const useDiseasePredisposition = (patientId: string) => {
  return useQuery({
    queryKey: ['disease-predisposition', patientId],
    queryFn: () => GenomicsService.getDiseasePredisposition(patientId),
    enabled: !!patientId,
  });
};

export const useAncestryAnalysis = (patientId: string) => {
  return useQuery({
    queryKey: ['ancestry-analysis', patientId],
    queryFn: () => GenomicsService.getAncestryAnalysis(patientId),
    enabled: !!patientId,
  });
};

export const useCarrierScreening = (patientId: string) => {
  return useQuery({
    queryKey: ['carrier-screening', patientId],
    queryFn: () => GenomicsService.getCarrierScreening(patientId),
    enabled: !!patientId,
  });
};

export const useFamilyHealthPlan = (familyId: string) => {
  return useQuery({
    queryKey: ['family-health-plan', familyId],
    queryFn: () => GenomicsService.getFamilyHealthPlan(familyId),
    enabled: !!familyId,
  });
};

export const useResearchParticipation = (patientId: string) => {
  return useQuery({
    queryKey: ['research-participation', patientId],
    queryFn: () => GenomicsService.getResearchParticipation(patientId),
    enabled: !!patientId,
  });
};

export const useProcessGenomicData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (rawData: any) => GenomicsService.processGenomicData(rawData),
    onSuccess: (profile) => {
      queryClient.setQueryData(['genomic-profile', profile.patientId], profile);
      toast.success('Datos genómicos procesados correctamente');
    },
    onError: (error) => {
      console.error('Error processing genomic data:', error);
      toast.error('Error al procesar los datos genómicos');
    },
  });
};

export const useTargetedTherapies = (patientId: string) => {
  return useQuery({
    queryKey: ['targeted-therapies', patientId],
    queryFn: async () => {
      const profile = await GenomicsService.getGenomicProfile(patientId);
      if (profile?.somaticMutations) {
        const variants = profile.somaticMutations.map(m => m.mutation);
        return GenomicsService.getTargetedTherapies(variants);
      }
      return [];
    },
    enabled: !!patientId,
  });
};

export const useClinicalTrials = (patientId: string) => {
  return useQuery({
    queryKey: ['clinical-trials', patientId],
    queryFn: async () => {
      const profile = await GenomicsService.getGenomicProfile(patientId);
      if (profile) {
        return GenomicsService.searchClinicalTrials(profile);
      }
      return [];
    },
    enabled: !!patientId,
  });
};

// Lab Integration Hooks
export const useIntegrate23andMe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: any) => LabIntegrationService.integrate23andMe(credentials),
    onSuccess: (profile) => {
      queryClient.setQueryData(['genomic-profile', profile.patientId], profile);
      toast.success('Datos de 23andMe integrados correctamente');
    },
    onError: () => {
      toast.error('Error al integrar con 23andMe');
    },
  });
};

export const useIntegrateAncestryDNA = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: any) => LabIntegrationService.integrateAncestryDNA(credentials),
    onSuccess: (ancestry) => {
      toast.success('Datos de AncestryDNA integrados correctamente');
    },
    onError: () => {
      toast.error('Error al integrar con AncestryDNA');
    },
  });
};

export const useIntegrateLabCorp = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: any) => LabIntegrationService.integrateLabCorp(credentials),
    onSuccess: (profile) => {
      queryClient.setQueryData(['genomic-profile', profile.patientId], profile);
      toast.success('Datos de LabCorp integrados correctamente');
    },
    onError: () => {
      toast.error('Error al integrar con LabCorp');
    },
  });
};

export const useIntegrateQuest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: any) => LabIntegrationService.integrateQuest(credentials),
    onSuccess: (profile) => {
      queryClient.setQueryData(['genomic-profile', profile.patientId], profile);
      toast.success('Datos de Quest Diagnostics integrados correctamente');
    },
    onError: () => {
      toast.error('Error al integrar con Quest Diagnostics');
    },
  });
};

// Privacy Hooks
export const useEncryptGenomicData = () => {
  return useMutation({
    mutationFn: (data: GenomicProfile) => PrivacyService.encryptGenomicData(data),
    onSuccess: () => {
      toast.success('Datos genómicos encriptados correctamente');
    },
    onError: () => {
      toast.error('Error al encriptar los datos genómicos');
    },
  });
};

export const useExportGenomicData = () => {
  return useMutation({
    mutationFn: ({ patientId, format }: { patientId: string; format: string }) => 
      PrivacyService.exportData(patientId, format),
    onSuccess: () => {
      toast.success('Datos genómicos exportados correctamente');
    },
    onError: () => {
      toast.error('Error al exportar los datos genómicos');
    },
  });
};

export const useAnonymizeData = () => {
  return useMutation({
    mutationFn: (data: GenomicProfile) => PrivacyService.anonymizeData(data),
    onSuccess: () => {
      toast.success('Datos anonimizados correctamente');
    },
    onError: () => {
      toast.error('Error al anonimizar los datos');
    },
  });
};
