
export interface MedicalDocument {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  category: DocumentCategory;
  type: DocumentType;
  title: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
  uploadedBy: string;
  tags: string[];
  isShared: boolean;
  sharedWith: string[];
  digitalSignature?: DigitalSignature;
  metadata?: DocumentMetadata;
  accessHistory: AccessRecord[];
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
  | 'dicom'
  | 'text'
  | 'video'
  | 'audio';

export interface DigitalSignature {
  signedBy: string;
  signedAt: string;
  signature: string;
  verified: boolean;
}

export interface DocumentMetadata {
  studyDate?: string;
  modality?: string;
  bodyPart?: string;
  findings?: string;
  diagnosis?: string;
  recommendations?: string;
}

export interface AccessRecord {
  userId: string;
  userName: string;
  userRole: string;
  accessedAt: string;
  action: 'view' | 'download' | 'share' | 'edit';
  ipAddress?: string;
}

export interface MedicalTimelineEvent {
  id: string;
  patientId: string;
  date: string;
  type: 'consultation' | 'study' | 'prescription' | 'vaccination' | 'surgery' | 'emergency';
  title: string;
  description: string;
  doctorId?: string;
  doctorName?: string;
  documents: MedicalDocument[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}
