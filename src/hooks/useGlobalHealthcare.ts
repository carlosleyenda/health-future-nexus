
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GlobalHealthcareService } from '@/services/global-healthcare/globalHealthcareService';
import { toast } from 'sonner';
import type { 
  HealthcareProvider, 
  PremiumService, 
  GlobalCoordination,
  QualityAssurance,
  FinancialService,
  MedicalTourism
} from '@/types/global-healthcare';

export const useHealthcareProviders = (filters?: any) => {
  return useQuery({
    queryKey: ['healthcare-providers', filters],
    queryFn: () => GlobalHealthcareService.getProviders(filters),
  });
};

export const usePremiumServices = (providerId?: string) => {
  return useQuery({
    queryKey: ['premium-services', providerId],
    queryFn: () => GlobalHealthcareService.getPremiumServices(providerId),
  });
};

export const useQualityMetrics = (providerId: string) => {
  return useQuery({
    queryKey: ['quality-metrics', providerId],
    queryFn: () => GlobalHealthcareService.getQualityMetrics(providerId),
    enabled: !!providerId,
  });
};

export const useFinancialServices = () => {
  return useQuery({
    queryKey: ['financial-services'],
    queryFn: () => GlobalHealthcareService.getFinancialServices(),
  });
};

export const useMedicalTourismPackages = () => {
  return useQuery({
    queryKey: ['medical-tourism'],
    queryFn: () => GlobalHealthcareService.getMedicalTourismPackages(),
  });
};

export const useSearchProviders = (query: string, filters?: any) => {
  return useQuery({
    queryKey: ['search-providers', query, filters],
    queryFn: () => GlobalHealthcareService.searchProviders(query, filters),
    enabled: query.length > 2,
  });
};

export const useCreateCoordination = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (coordinationData: Partial<GlobalCoordination>) =>
      GlobalHealthcareService.createGlobalCoordination(coordinationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['global-coordinations'] });
      toast.success('Coordinación global creada exitosamente');
    },
    onError: () => {
      toast.error('Error al crear coordinación global');
    },
  });
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (appointmentData: {
      providerId: string;
      serviceId: string;
      patientId: string;
      preferredDate: string;
      type: 'consultation' | 'procedure' | 'second_opinion';
    }) => GlobalHealthcareService.bookAppointment(appointmentData),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success(`Cita reservada - Confirmación: ${result.confirmationNumber}`);
    },
    onError: () => {
      toast.error('Error al reservar cita');
    },
  });
};

export const useEstimateCosts = () => {
  return useMutation({
    mutationFn: (request: {
      serviceIds: string[];
      providerId: string;
      insuranceInfo?: any;
      location?: string;
    }) => GlobalHealthcareService.estimateCosts(request),
    onSuccess: () => {
      toast.success('Estimación de costos generada');
    },
    onError: () => {
      toast.error('Error al generar estimación');
    },
  });
};

export const useIntegrateTeladoc = () => {
  return useMutation({
    mutationFn: (credentials: any) => GlobalHealthcareService.integrateWithTeladoc(credentials),
    onSuccess: () => {
      toast.success('Integración con Teladoc completada');
    },
    onError: () => {
      toast.error('Error en integración con Teladoc');
    },
  });
};

export const useIntegrateAmwell = () => {
  return useMutation({
    mutationFn: (credentials: any) => GlobalHealthcareService.integrateWithAmwell(credentials),
    onSuccess: () => {
      toast.success('Integración con Amwell completada');
    },
    onError: () => {
      toast.error('Error en integración con Amwell');
    },
  });
};

export const useIntegrateDoctorOnDemand = () => {
  return useMutation({
    mutationFn: (credentials: any) => GlobalHealthcareService.integrateWithDoctorOnDemand(credentials),
    onSuccess: () => {
      toast.success('Integración con Doctor on Demand completada');
    },
    onError: () => {
      toast.error('Error en integración con Doctor on Demand');
    },
  });
};
