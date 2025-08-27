import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { documentService, type MedicalDocument } from '@/services/api/documentService';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';

export const useDocuments = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['documents', user?.id],
    queryFn: () => documentService.getUserDocuments(user?.id || ''),
    enabled: !!user,
  });
};

export const useUploadMedicalDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      file, 
      category, 
      onProgress 
    }: { 
      file: File; 
      category?: string; 
      onProgress?: (progress: { loaded: number; total: number; percentage: number }) => void 
    }) => {
      return documentService.uploadMedicalDocument(file, category, onProgress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};

export const useUploadPrescription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, patientId }: { file: File; patientId: string }) => {
      return documentService.uploadPrescription(file, patientId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
    },
  });
};

export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documentService.uploadProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      documentId, 
      storagePath, 
      bucket = 'medical-documents' 
    }: { 
      documentId: string; 
      storagePath: string; 
      bucket?: string 
    }) => {
      return documentService.deleteDocument(documentId, storagePath, bucket);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};

export const usePrescriptions = (patientId?: string) => {
  const { user } = useAuthStore();
  const targetPatientId = patientId || user?.id;

  return useQuery({
    queryKey: ['prescriptions', targetPatientId],
    queryFn: () => documentService.getPatientPrescriptions(targetPatientId || ''),
    enabled: !!targetPatientId,
  });
};

export { documentService };