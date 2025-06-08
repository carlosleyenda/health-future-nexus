
import { supabase } from '@/integrations/supabase/client';
import { VideoCallSession, MedicalNote, VideoCallRecording } from '@/types/videocall';

export class VideoCallService {
  static async createSession(appointmentId: string, doctorId: string, patientId: string): Promise<VideoCallSession> {
    const sessionToken = crypto.randomUUID();
    
    const { data, error } = await supabase
      .from('video_call_sessions')
      .insert({
        appointment_id: appointmentId,
        doctor_id: doctorId,
        patient_id: patientId,
        session_token: sessionToken,
        status: 'waiting',
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapSessionFromDB(data);
  }

  static async getSession(sessionId: string): Promise<VideoCallSession | null> {
    const { data, error } = await supabase
      .from('video_call_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.mapSessionFromDB(data);
  }

  static async updateSessionStatus(sessionId: string, status: VideoCallSession['status']) {
    const updates: any = { status };
    
    if (status === 'active') {
      updates.started_at = new Date().toISOString();
    } else if (status === 'ended') {
      updates.ended_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('video_call_sessions')
      .update(updates)
      .eq('id', sessionId);

    if (error) throw error;
  }

  static async saveMedicalNote(note: Omit<MedicalNote, 'id' | 'createdAt'>): Promise<MedicalNote> {
    const { data, error } = await supabase
      .from('video_call_medical_notes')
      .insert({
        session_id: note.sessionId,
        doctor_id: note.doctorId,
        note_type: note.noteType,
        content: note.content,
        timestamp_in_call: note.timestampInCall,
        is_prescription: note.isPrescription,
        medication_name: note.medicationName,
        dosage: note.dosage,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapNoteFromDB(data);
  }

  static async getMedicalNotes(sessionId: string): Promise<MedicalNote[]> {
    const { data, error } = await supabase
      .from('video_call_medical_notes')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp_in_call', { ascending: true });

    if (error) throw error;
    return data.map(this.mapNoteFromDB);
  }

  static async startRecording(sessionId: string): Promise<VideoCallRecording> {
    // In a real implementation, this would integrate with a recording service
    const recordingUrl = `https://recordings.example.com/${sessionId}/${Date.now()}.mp4`;
    
    const { data, error } = await supabase
      .from('video_call_recordings')
      .insert({
        session_id: sessionId,
        recording_url: recordingUrl,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapRecordingFromDB(data);
  }

  static async saveTranscriptSegment(
    sessionId: string,
    speakerType: 'doctor' | 'patient' | 'system',
    content: string,
    timestampInCall: number,
    confidenceScore?: number
  ) {
    const { error } = await supabase
      .from('video_call_transcripts')
      .insert({
        session_id: sessionId,
        speaker_type: speakerType,
        content,
        timestamp_in_call: timestampInCall,
        confidence_score: confidenceScore,
      });

    if (error) throw error;
  }

  static async getSessionTranscript(sessionId: string) {
    const { data, error } = await supabase
      .from('video_call_transcripts')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp_in_call', { ascending: true });

    if (error) throw error;
    return data;
  }

  static async takeScreenshot(sessionId: string, userId: string, description?: string) {
    // In a real implementation, this would capture and upload a screenshot
    const screenshotUrl = `https://screenshots.example.com/${sessionId}/${Date.now()}.png`;
    
    const { error } = await supabase
      .from('video_call_screenshots')
      .insert({
        session_id: sessionId,
        screenshot_url: screenshotUrl,
        description,
        timestamp_in_call: Math.floor(Date.now() / 1000),
        taken_by: userId,
      });

    if (error) throw error;
  }

  private static mapSessionFromDB(data: any): VideoCallSession {
    return {
      id: data.id,
      appointmentId: data.appointment_id,
      doctorId: data.doctor_id,
      patientId: data.patient_id,
      sessionToken: data.session_token,
      status: data.status,
      startedAt: data.started_at,
      endedAt: data.ended_at,
      durationMinutes: data.duration_minutes,
      recordingUrl: data.recording_url,
      transcriptUrl: data.transcript_url,
      patientConsentRecording: data.patient_consent_recording,
      patientConsentTranscript: data.patient_consent_transcript,
      emergencyEscalated: data.emergency_escalated,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  private static mapNoteFromDB(data: any): MedicalNote {
    return {
      id: data.id,
      sessionId: data.session_id,
      doctorId: data.doctor_id,
      noteType: data.note_type,
      content: data.content,
      timestampInCall: data.timestamp_in_call,
      isPrescription: data.is_prescription,
      medicationName: data.medication_name,
      dosage: data.dosage,
      createdAt: data.created_at,
    };
  }

  private static mapRecordingFromDB(data: any): VideoCallRecording {
    return {
      id: data.id,
      sessionId: data.session_id,
      recordingUrl: data.recording_url,
      durationSeconds: data.duration_seconds,
      fileSizeBytes: data.file_size_bytes,
      encryptionKey: data.encryption_key,
      isBackedUp: data.is_backed_up,
      createdAt: data.created_at,
    };
  }
}
