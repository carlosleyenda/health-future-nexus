
import { supabase } from '@/integrations/supabase/client';
import type { MedicalDocument, MedicalTimelineEvent, AccessRecord } from '@/types/medical-records';
import type { Tables } from '@/integrations/supabase/types';

export type MedicalRecord = Tables<'medical_records'>;
export type Prescription = Tables<'prescriptions'>;
export type MedicalTranscription = Tables<'medical_transcriptions'>;
export type DoctorProfile = Tables<'doctor_profiles'>;
export type PatientProfile = Tables<'patient_profiles'>;

export class MedicalRecordsService {
  // Medical Records
  static async getPatientMedicalRecords(patientId: string): Promise<MedicalRecord[]> {
    const { data, error } = await supabase
      .from('medical_records')
      .select('*')
      .eq('patient_id', patientId)
      .order('visit_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async createMedicalRecord(record: Omit<MedicalRecord, 'id' | 'created_at' | 'updated_at'>): Promise<MedicalRecord> {
    const { data, error } = await supabase
      .from('medical_records')
      .insert(record)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Prescriptions
  static async getPatientPrescriptions(patientId: string): Promise<Prescription[]> {
    const { data, error } = await supabase
      .from('prescriptions')
      .select('*')
      .eq('patient_id', patientId)
      .order('issued_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getDoctorPrescriptions(doctorId: string): Promise<Prescription[]> {
    const { data, error } = await supabase
      .from('prescriptions')
      .select('*')
      .eq('doctor_id', doctorId)
      .order('issued_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async createPrescription(prescription: Omit<Prescription, 'id' | 'created_at' | 'updated_at'>): Promise<Prescription> {
    const { data, error } = await supabase
      .from('prescriptions')
      .insert(prescription)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updatePrescriptionStatus(prescriptionId: string, status: Prescription['status']): Promise<Prescription> {
    const { data, error } = await supabase
      .from('prescriptions')
      .update({ status })
      .eq('id', prescriptionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Medical Transcriptions
  static async getSessionTranscriptions(sessionId: string): Promise<MedicalTranscription[]> {
    const { data, error } = await supabase
      .from('medical_transcriptions')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp_seconds');

    if (error) throw error;
    return data || [];
  }

  static async getPatientTranscriptions(patientId: string): Promise<MedicalTranscription[]> {
    const { data, error } = await supabase
      .from('medical_transcriptions')
      .select('*')
      .eq('patient_id', patientId)
      .order('session_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async createTranscription(transcription: Omit<MedicalTranscription, 'id' | 'processed_at'>): Promise<MedicalTranscription> {
    const { data, error } = await supabase
      .from('medical_transcriptions')
      .insert(transcription)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Doctor Profiles
  static async getAllDoctors(): Promise<DoctorProfile[]> {
    const { data, error } = await supabase
      .from('doctor_profiles')
      .select('*')
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getDoctorsBySpecialty(specialty: string): Promise<DoctorProfile[]> {
    const { data, error } = await supabase
      .from('doctor_profiles')
      .select('*')
      .eq('specialty', specialty as any)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getDoctorProfile(userId: string): Promise<DoctorProfile | null> {
    const { data, error } = await supabase
      .from('doctor_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  static async createDoctorProfile(profile: Omit<DoctorProfile, 'id' | 'created_at' | 'updated_at'>): Promise<DoctorProfile> {
    const { data, error } = await supabase
      .from('doctor_profiles')
      .insert(profile)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Patient Profiles
  static async getPatientProfile(userId: string): Promise<PatientProfile | null> {
    const { data, error } = await supabase
      .from('patient_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  static async createPatientProfile(profile: Omit<PatientProfile, 'id' | 'created_at' | 'updated_at'>): Promise<PatientProfile> {
    const { data, error } = await supabase
      .from('patient_profiles')
      .insert(profile)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updatePatientProfile(userId: string, updates: Partial<PatientProfile>): Promise<PatientProfile> {
    const { data, error } = await supabase
      .from('patient_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Legacy methods for compatibility
  static async getPatientDocuments(patientId: string): Promise<MedicalDocument[]> {
    // Return empty array for now - this would need document storage implementation
    return [];
  }

  static async getDocumentById(documentId: string): Promise<MedicalDocument | null> {
    // Return null for now - this would need document storage implementation
    return null;
  }

  static async uploadDocument(
    patientId: string,
    file: File,
    metadata: Partial<MedicalDocument>
  ): Promise<MedicalDocument> {
    // Placeholder implementation - would need actual file upload to Supabase Storage
    throw new Error('Document upload not implemented yet');
  }

  static async shareDocument(
    documentId: string,
    sharedWith: string[]
  ): Promise<MedicalDocument> {
    // Placeholder implementation
    throw new Error('Document sharing not implemented yet');
  }

  static async getPatientTimeline(patientId: string): Promise<MedicalTimelineEvent[]> {
    // Convert medical records to timeline events
    const records = await this.getPatientMedicalRecords(patientId);
    return records.map(record => ({
      id: record.id,
      patientId: record.patient_id,
      date: record.visit_date,
      type: record.record_type,
      title: record.chief_complaint,
      description: record.diagnosis,
      doctorId: record.doctor_id,
      doctorName: 'Doctor',
      documents: [],
      severity: 'medium' as const
    }));
  }

  static async addAccessRecord(
    documentId: string,
    accessRecord: Omit<AccessRecord, 'accessedAt'>
  ): Promise<void> {
    // Placeholder implementation
    console.log('Access record added:', { documentId, accessRecord });
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
    // Return empty array for now - this would need document storage implementation
    return [];
  }
}
