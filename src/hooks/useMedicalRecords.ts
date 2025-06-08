
import { useQuery } from '@tanstack/react-query';
import type { MedicalDocument } from '@/types/medical-records';

export const usePatientDocuments = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-documents', patientId],
    queryFn: async (): Promise<MedicalDocument[]> => [
      {
        id: 'doc-1',
        title: 'Consulta General',
        category: 'consultation',
        date: '2024-01-15',
        doctor: 'Dr. García',
        tags: ['consulta', 'general'],
        fileSize: '2.5 MB',
        fileType: 'PDF',
        url: '/documents/doc-1.pdf'
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
        title: 'Consulta General',
        category: 'consultation',
        date: '2024-01-15',
        doctor: 'Dr. García',
        tags: ['consulta', 'general'],
        fileSize: '2.5 MB',
        fileType: 'PDF',
        url: '/documents/doc-1.pdf'
      }
    ],
    enabled: !!patientId && !!searchQuery,
  });
};
