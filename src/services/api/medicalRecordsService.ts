
import { delay } from '@/lib/delay';
import type { MedicalDocument, MedicalTimelineEvent, AccessRecord } from '@/types/medical-records';

// Simulated data
const mockDocuments: MedicalDocument[] = [
  {
    id: 'doc-1',
    patientId: 'patient-1',
    doctorId: 'doctor-1',
    category: 'imaging',
    type: 'image',
    title: 'Radiografía de Tórax',
    description: 'Control post-operatorio',
    fileName: 'rx_torax_2024.jpg',
    fileUrl: '/placeholder.svg',
    fileSize: 2048000,
    mimeType: 'image/jpeg',
    uploadedAt: '2024-01-15T10:30:00Z',
    uploadedBy: 'doctor-1',
    tags: ['tórax', 'post-operatorio', 'control'],
    isShared: false,
    sharedWith: [],
    accessHistory: [
      {
        userId: 'doctor-1',
        userName: 'Dr. García',
        userRole: 'doctor',
        accessedAt: '2024-01-15T10:30:00Z',
        action: 'view'
      }
    ],
    date: '2024-01-15',
    doctor: 'Dr. García',
    fileType: 'JPEG',
    url: '/placeholder.svg'
  },
  {
    id: 'doc-2',
    patientId: 'patient-1',
    doctorId: 'doctor-1',
    category: 'lab_results',
    type: 'pdf',
    title: 'Análisis de Sangre Completo',
    description: 'Hemograma y química sanguínea',
    fileName: 'analisis_sangre.pdf',
    fileUrl: '/placeholder.svg',
    fileSize: 512000,
    mimeType: 'application/pdf',
    uploadedAt: '2024-01-10T09:15:00Z',
    uploadedBy: 'doctor-1',
    tags: ['hemograma', 'química sanguínea', 'rutina'],
    isShared: true,
    sharedWith: ['doctor-2'],
    digitalSignature: {
      signedBy: 'doctor-1',
      signedAt: '2024-01-10T09:20:00Z',
      signature: 'digital_signature_hash',
      verified: true
    },
    accessHistory: [],
    date: '2024-01-10',
    doctor: 'Dr. García',
    fileType: 'PDF',
    url: '/placeholder.svg'
  }
];

const mockTimelineEvents: MedicalTimelineEvent[] = [
  {
    id: 'event-1',
    patientId: 'patient-1',
    date: '2024-01-15T10:30:00Z',
    type: 'study',
    title: 'Radiografía de Tórax',
    description: 'Control post-operatorio - Resultados normales',
    doctorId: 'doctor-1',
    doctorName: 'Dr. García',
    documents: [mockDocuments[0]],
    severity: 'low'
  },
  {
    id: 'event-2',
    patientId: 'patient-1',
    date: '2024-01-10T09:15:00Z',
    type: 'study',
    title: 'Análisis de Laboratorio',
    description: 'Hemograma completo y química sanguínea',
    doctorId: 'doctor-1',
    doctorName: 'Dr. García',
    documents: [mockDocuments[1]],
    severity: 'medium'
  }
];

export class MedicalRecordsService {
  static async getPatientDocuments(patientId: string): Promise<MedicalDocument[]> {
    await delay(300);
    return mockDocuments.filter(doc => doc.patientId === patientId);
  }

  static async getDocumentById(documentId: string): Promise<MedicalDocument | null> {
    await delay(200);
    return mockDocuments.find(doc => doc.id === documentId) || null;
  }

  static async uploadDocument(
    patientId: string,
    file: File,
    metadata: Partial<MedicalDocument>
  ): Promise<MedicalDocument> {
    await delay(500);
    
    const newDocument: MedicalDocument = {
      id: crypto.randomUUID(),
      patientId,
      doctorId: metadata.doctorId!,
      category: metadata.category!,
      type: metadata.type!,
      title: metadata.title!,
      description: metadata.description,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      fileSize: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
      uploadedBy: metadata.uploadedBy!,
      tags: metadata.tags || [],
      isShared: false,
      sharedWith: [],
      accessHistory: [],
      date: new Date().toISOString().split('T')[0],
      doctor: metadata.uploadedBy!,
      fileType: file.type.toUpperCase(),
      url: URL.createObjectURL(file)
    };

    mockDocuments.push(newDocument);
    return newDocument;
  }

  static async shareDocument(
    documentId: string,
    sharedWith: string[]
  ): Promise<MedicalDocument> {
    await delay(300);
    
    const docIndex = mockDocuments.findIndex(doc => doc.id === documentId);
    if (docIndex === -1) throw new Error('Document not found');

    mockDocuments[docIndex].isShared = true;
    mockDocuments[docIndex].sharedWith = sharedWith;
    
    return mockDocuments[docIndex];
  }

  static async getPatientTimeline(patientId: string): Promise<MedicalTimelineEvent[]> {
    await delay(400);
    return mockTimelineEvents
      .filter(event => event.patientId === patientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  static async addAccessRecord(
    documentId: string,
    accessRecord: Omit<AccessRecord, 'accessedAt'>
  ): Promise<void> {
    await delay(100);
    
    const document = mockDocuments.find(doc => doc.id === documentId);
    if (document) {
      document.accessHistory.push({
        ...accessRecord,
        accessedAt: new Date().toISOString()
      });
    }
  }

  static async searchDocuments(
    patientId: string,
    query: string,
    filters?: {
      category?: string;
      dateFrom?: string;
      dateTo?: string;
      tags?: string[];
    }
  ): Promise<MedicalDocument[]> {
    await delay(300);
    
    let documents = mockDocuments.filter(doc => doc.patientId === patientId);
    
    if (query) {
      documents = documents.filter(doc =>
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.description?.toLowerCase().includes(query.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    if (filters?.category) {
      documents = documents.filter(doc => doc.category === filters.category);
    }
    
    if (filters?.dateFrom) {
      documents = documents.filter(doc => 
        new Date(doc.uploadedAt) >= new Date(filters.dateFrom!)
      );
    }
    
    if (filters?.dateTo) {
      documents = documents.filter(doc => 
        new Date(doc.uploadedAt) <= new Date(filters.dateTo!)
      );
    }
    
    if (filters?.tags && filters.tags.length > 0) {
      documents = documents.filter(doc =>
        filters.tags!.some(tag => doc.tags.includes(tag))
      );
    }
    
    return documents;
  }
}
