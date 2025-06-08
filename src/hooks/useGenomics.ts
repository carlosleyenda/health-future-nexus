
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GenomicsService } from '@/services/genomics/genomicsService';
import { toast } from 'sonner';
import type { 
  GenomicProfile, 
  PharmacogenomicProfile,
  DiseasePredisposition,
  FamilyHealthPlan,
  ResearchParticipation,
  TargetedTherapy,
  ClinicalTrial
} from '@/types/genomics';

export const useGenomicProfile = (patientId?: string) => {
  return useQuery({
    queryKey: ['genomic-profile', patientId],
    queryFn: () => GenomicsService.getGenomicProfile(patientId!),
    enabled: !!patientId,
  });
};

export const usePharmacogenomics = (patientId?: string) => {
  return useQuery({
    queryKey: ['pharmacogenomics', patientId],
    queryFn: () => GenomicsService.getPharmacogenomicProfile(patientId!),
    enabled: !!patientId,
  });
};

export const useDiseasePredisposition = (patientId?: string) => {
  return useQuery({
    queryKey: ['disease-predisposition', patientId],
    queryFn: () => GenomicsService.getDiseasePredisposition(patientId!),
    enabled: !!patientId,
  });
};

export const useAncestryAnalysis = (patientId?: string) => {
  return useQuery({
    queryKey: ['ancestry-analysis', patientId],
    queryFn: () => GenomicsService.getAncestryAnalysis(patientId!),
    enabled: !!patientId,
  });
};

export const useCarrierScreening = (patientId?: string) => {
  return useQuery({
    queryKey: ['carrier-screening', patientId],
    queryFn: () => GenomicsService.getCarrierScreening(patientId!),
    enabled: !!patientId,
  });
};

export const useFamilyHealthPlan = (patientId?: string) => {
  return useQuery({
    queryKey: ['family-health-plan', patientId],
    queryFn: () => GenomicsService.getFamilyHealthPlan(patientId!),
    enabled: !!patientId,
  });
};

export const useResearchParticipation = (patientId?: string) => {
  return useQuery({
    queryKey: ['research-participation', patientId],
    queryFn: () => GenomicsService.getResearchParticipation(patientId!),
    enabled: !!patientId,
  });
};

export const useProcessGenomicData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (genomicData: { patientId: string; rawData: any; dataType: string }) =>
      GenomicsService.processGenomicData(genomicData.rawData, genomicData.dataType),
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: ['genomic-profile', variables.patientId] });
      toast.success('Datos genómicos procesados exitosamente');
    },
    onError: () => {
      toast.error('Error al procesar datos genómicos');
    },
  });
};

export const useGeneratePersonalizedReport = () => {
  return useMutation({
    mutationFn: (patientId: string) => GenomicsService.generatePersonalizedReport(patientId),
    onSuccess: () => {
      toast.success('Reporte personalizado generado');
    },
    onError: () => {
      toast.error('Error al generar reporte');
    },
  });
};

export const useTargetedTherapies = (patientId?: string) => {
  return useQuery({
    queryKey: ['targeted-therapies', patientId],
    queryFn: () => GenomicsService.getTargetedTherapies(patientId!),
    enabled: !!patientId,
  });
};

export const usePrecisionMedicine = () => {
  return useMutation({
    mutationFn: (data: { patientId: string; condition: string }) =>
      GenomicsService.getPrecisionMedicineRecommendations(data.patientId, data.condition),
    onSuccess: () => {
      toast.success('Recomendaciones de medicina de precisión generadas');
    },
    onError: () => {
      toast.error('Error al generar recomendaciones');
    },
  });
};

export const useClinicalTrials = (patientId?: string) => {
  return useQuery({
    queryKey: ['clinical-trials', patientId],
    queryFn: () => GenomicsService.getClinicalTrials(patientId!),
    enabled: !!patientId,
  });
};

export const useIntegrateLabData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { patientId: string; labProvider: string; credentials: any }) =>
      GenomicsService.integrateWithLab(data.labProvider, data.credentials),
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: ['genomic-profile', variables.patientId] });
      toast.success('Integración con laboratorio completada');
    },
    onError: () => {
      toast.error('Error en integración con laboratorio');
    },
  });
};

export const usePrivacySettings = () => {
  return useMutation({
    mutationFn: (settings: { patientId: string; privacyPreferences: any }) =>
      GenomicsService.updatePrivacySettings(settings.privacyPreferences),
    onSuccess: () => {
      toast.success('Configuración de privacidad actualizada');
    },
    onError: () => {
      toast.error('Error al actualizar configuración de privacidad');
    },
  });
};

export const useConsentManagement = () => {
  return useMutation({
    mutationFn: (consent: { patientId: string; consentType: string; granted: boolean }) =>
      GenomicsService.manageConsent(consent.consentType, consent.granted),
    onSuccess: () => {
      toast.success('Consentimiento actualizado');
    },
    onError: () => {
      toast.error('Error al actualizar consentimiento');
    },
  });
};

export const useDataPortability = () => {
  return useMutation({
    mutationFn: (request: { patientId: string; format: string; destination: string }) =>
      GenomicsService.exportGenomicData(request.format, request.destination),
    onSuccess: () => {
      toast.success('Exportación de datos iniciada');
    },
    onError: () => {
      toast.error('Error al exportar datos');
    },
  });
};
