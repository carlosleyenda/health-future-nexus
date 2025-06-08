
export interface MedicalDocument {
  id: string;
  title: string;
  category: 'consultation' | 'lab_results' | 'imaging' | 'prescription' | 'vaccination' | 'surgery';
  date: string;
  doctor: string;
  tags: string[];
  fileSize: string;
  fileType: string;
  url: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: string;
  title: string;
  description: string;
}
