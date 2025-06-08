
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { MedicalDocument } from '@/types/medical-records';

export const usePatientDocuments = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-documents', patientId],
    queryFn: async (): Promise<MedicalDocument[]> => [
      {
        id: 'doc-1',
        patientId,
        doctorId: 'doctor-1',
        title: 'Consulta General',
        description: 'Revisión médica general',
        category: 'consultation',
        type: 'pdf',
        date: '2024-01-15',
        doctor: 'Dr. García',
        tags: ['consulta', 'general'],
        fileSize: 2621440,
        fileType: 'PDF',
        fileName: 'consulta_general.pdf',
        url: '/documents/doc-1.pdf',
        fileUrl: '/documents/doc-1.pdf',
        mimeType: 'application/pdf',
        uploadedAt: '2024-01-15T10:00:00Z',
        uploadedBy: 'Dr. García',
        isShared: false,
        sharedWith: [],
        accessHistory: []
      }
    ],
    enabled: !!patientId,
  });
};

export const usePatientTimeline = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-timeline', patientId],
    queryFn: async () => [
      {
        id: 'event-1',
        date: '2024-01-15',
        type: 'consultation',
        title: 'Consulta General',
        description: 'Revisión médica general'
      }
    ],
    enabled: !!patientId,
  });
};

export const useSearchDocuments = (patientId: string, searchQuery: string, filters?: any) => {
  return useQuery({
    queryKey: ['search-documents', patientId, searchQuery, filters],
    queryFn: async (): Promise<MedicalDocument[]> => [
      {
        id: 'doc-1',
        patientId,
        doctorId: 'doctor-1',
        title: 'Consulta General',
        description: 'Revisión médica general',
        category: 'consultation',
        type: 'pdf',
        date: '2024-01-15',
        doctor: 'Dr. García',
        tags: ['consulta', 'general'],
        fileSize: 2621440,
        fileType: 'PDF',
        fileName: 'consulta_general.pdf',
        url: '/documents/doc-1.pdf',
        fileUrl: '/documents/doc-1.pdf',
        mimeType: 'application/pdf',
        uploadedAt: '2024-01-15T10:00:00Z',
        uploadedBy: 'Dr. García',
        isShared: false,
        sharedWith: [],
        accessHistory: []
      }
    ],
    enabled: !!patientId && !!searchQuery,
  });
};

export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      patientId: string;
      file: File;
      metadata: any;
    }) => {
      // Mock upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newDocument: MedicalDocument = {
        id: crypto.randomUUID(),
        patientId: data.patientId,
        doctorId: data.metadata.doctorId,
        title: data.metadata.title,
        description: data.metadata.description,
        category: data.metadata.category,
        type: data.metadata.type,
        date: new Date().toISOString().split('T')[0],
        doctor: data.metadata.uploadedBy,
        tags: data.metadata.tags || [],
        fileSize: data.file.size,
        fileType: data.file.type,
        fileName: data.file.name,
        url: URL.createObjectURL(data.file),
        fileUrl: URL.createObjectURL(data.file),
        mimeType: data.file.type,
        uploadedAt: new Date().toISOString(),
        uploadedBy: data.metadata.uploadedBy,
        isShared: false,
        sharedWith: [],
        accessHistory: []
      };
      
      return newDocument;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['patient-documents', variables.patientId]
      });
    }
  });
};
