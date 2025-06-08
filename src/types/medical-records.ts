
export interface MedicalDocument {
  id: string;
  patientId: string;
  doctorId: string;
  title: string;
  description?: string;
  category: DocumentCategory;
  type: DocumentType;
  date: string;
  doctor: string;
  tags: string[];
  fileSize: number;
  fileType: string;
  fileName: string;
  url: string;
  fileUrl: string;
  mimeType: string;
  uploadedAt: string;
  uploadedBy: string;
  isShared: boolean;
  sharedWith: string[];
  accessHistory: AccessRecord[];
  digitalSignature?: {
    signedBy: string;
    signedAt: string;
    signature: string;
    verified: boolean;
  };
}

export type DocumentCategory = 
  | 'consultation' 
  | 'lab_results' 
  | 'imaging' 
  | 'prescription' 
  | 'vaccination' 
  | 'surgery'
  | 'insurance'
  | 'other';

export type DocumentType = 
  | 'pdf' 
  | 'image' 
  | 'video' 
  | 'audio' 
  | 'text';

export interface TimelineEvent {
  id: string;
  date: string;
  type: string;
  title: string;
  description: string;
}

export interface MedicalTimelineEvent {
  id: string;
  patientId: string;
  date: string;
  type: string;
  title: string;
  description: string;
  doctorId: string;
  doctorName: string;
  documents: MedicalDocument[];
  severity: 'low' | 'medium' | 'high';
}

export interface AccessRecord {
  userId: string;
  userName: string;
  userRole: string;
  accessedAt: string;
  action: string;
}
