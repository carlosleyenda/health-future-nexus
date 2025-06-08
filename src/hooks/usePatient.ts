
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PatientService, AppointmentService } from '@/services/api';
import { toast } from 'sonner';
import type { Patient, MedicalRecord, Allergy, HealthMetric } from '@/lib/database';

export const usePatientProfile = (patientId: string) => {
  return useQuery({
    queryKey: ['patient', patientId],
    queryFn: () => PatientService.getProfile(patientId),
    enabled: !!patientId,
  });
};

export const useUpdatePatientProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ patientId, updates }: { patientId: string; updates: Partial<Patient> }) =>
      PatientService.updateProfile(patientId, updates),
    onSuccess: (updatedPatient) => {
      if (updatedPatient) {
        queryClient.setQueryData(['patient', updatedPatient.id], updatedPatient);
        toast.success('Perfil actualizado correctamente');
      }
    },
    onError: () => {
      toast.error('Error al actualizar el perfil');
    },
  });
};

export const usePatientMedicalHistory = (patientId: string) => {
  return useQuery({
    queryKey: ['medical-history', patientId],
    queryFn: () => PatientService.getMedicalHistory(patientId),
    enabled: !!patientId,
  });
};

export const usePatientAllergies = (patientId: string) => {
  return useQuery({
    queryKey: ['allergies', patientId],
    queryFn: () => PatientService.getAllergies(patientId),
    enabled: !!patientId,
  });
};

export const useAddAllergy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (allergy: Omit<Allergy, 'id'>) => PatientService.addAllergy(allergy),
    onSuccess: (newAllergy) => {
      queryClient.invalidateQueries({ queryKey: ['allergies', newAllergy.patientId] });
      toast.success('Alergia agregada correctamente');
    },
    onError: () => {
      toast.error('Error al agregar la alergia');
    },
  });
};

export const usePatientHealthMetrics = (patientId: string, type?: string) => {
  return useQuery({
    queryKey: ['health-metrics', patientId, type],
    queryFn: () => PatientService.getHealthMetrics(patientId, type),
    enabled: !!patientId,
  });
};

export const useAddHealthMetric = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (metric: Omit<HealthMetric, 'id'>) => PatientService.addHealthMetric(metric),
    onSuccess: (newMetric) => {
      queryClient.invalidateQueries({ queryKey: ['health-metrics', newMetric.patientId] });
      toast.success('Métrica de salud registrada');
    },
    onError: () => {
      toast.error('Error al registrar la métrica');
    },
  });
};

export const usePatientAppointments = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-appointments', patientId],
    queryFn: () => AppointmentService.getPatientAppointments(patientId),
    enabled: !!patientId,
  });
};

export const usePatientPrescriptions = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-prescriptions', patientId],
    queryFn: () => PatientService.getPrescriptions(patientId),
    enabled: !!patientId,
  });
};

export const usePatientTransactions = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-transactions', patientId],
    queryFn: () => PatientService.getTransactions(patientId),
    enabled: !!patientId,
  });
};
