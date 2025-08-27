
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MedicalRecordsService } from '@/services/api/medicalRecordsService';

export const useMedicalHistory = (patientId: string) => {
  return useQuery({
    queryKey: ['medical-history', patientId],
    queryFn: () => MedicalRecordsService.getPatientMedicalRecords(patientId),
    enabled: !!patientId,
  });
};

export const usePatientTimeline = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-timeline', patientId],
    queryFn: () => MedicalRecordsService.getPatientTimeline(patientId),
    enabled: !!patientId,
  });
};

export const usePatientDocuments = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-documents', patientId],
    queryFn: () => MedicalRecordsService.getPatientDocuments(patientId),
    enabled: !!patientId,
  });
};
