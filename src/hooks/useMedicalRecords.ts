
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MedicalRecordsService } from '@/services/api/medicalRecordsService';
import { toast } from 'sonner';
import type { MedicalDocument } from '@/types/medical-records';

export const usePatientDocuments = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-documents', patientId],
    queryFn: () => MedicalRecordsService.getPatientDocuments(patientId),
    enabled: !!patientId,
  });
};

export const useDocument = (documentId: string) => {
  return useQuery({
    queryKey: ['document', documentId],
    queryFn: () => MedicalRecordsService.getDocumentById(documentId),
    enabled: !!documentId,
  });
};

export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      patientId, 
      file, 
      metadata 
    }: { 
      patientId: string; 
      file: File; 
      metadata: Partial<MedicalDocument> 
    }) => MedicalRecordsService.uploadDocument(patientId, file, metadata),
    onSuccess: (newDocument) => {
      queryClient.invalidateQueries({ queryKey: ['patient-documents', newDocument.patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-timeline', newDocument.patientId] });
      toast.success('Documento subido correctamente');
    },
    onError: () => {
      toast.error('Error al subir el documento');
    },
  });
};

export const useShareDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ documentId, sharedWith }: { documentId: string; sharedWith: string[] }) =>
      MedicalRecordsService.shareDocument(documentId, sharedWith),
    onSuccess: (document) => {
      queryClient.setQueryData(['document', document.id], document);
      queryClient.invalidateQueries({ queryKey: ['patient-documents', document.patientId] });
      toast.success('Documento compartido exitosamente');
    },
    onError: () => {
      toast.error('Error al compartir el documento');
    },
  });
};

export const usePatientTimeline = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-timeline', patientId],
    queryFn: () => MedicalRecordsService.getPatientTimeline(patientId),
    enabled: !!patientId,
  });
};

export const useSearchDocuments = (
  patientId: string,
  query: string,
  filters?: {
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    tags?: string[];
  }
) => {
  return useQuery({
    queryKey: ['search-documents', patientId, query, filters],
    queryFn: () => MedicalRecordsService.searchDocuments(patientId, query, filters),
    enabled: !!patientId && (!!query || !!filters),
  });
};

export const useAddAccessRecord = () => {
  return useMutation({
    mutationFn: ({ 
      documentId, 
      accessRecord 
    }: { 
      documentId: string; 
      accessRecord: any 
    }) => MedicalRecordsService.addAccessRecord(documentId, accessRecord),
    onError: () => {
      console.error('Failed to log access record');
    },
  });
};
