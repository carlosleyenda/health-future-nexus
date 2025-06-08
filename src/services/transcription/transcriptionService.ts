
import { supabase } from '@/integrations/supabase/client';

export class TranscriptionService {
  private static audioContext?: AudioContext;
  private static mediaRecorder?: MediaRecorder;
  private static audioChunks: Blob[] = [];

  static async startTranscription(sessionId: string, stream: MediaStream) {
    try {
      this.audioContext = new AudioContext();
      
      // Create media recorder for audio chunks
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        await this.processAudioChunk(audioBlob, sessionId);
        this.audioChunks = [];
      };

      // Record in 5-second chunks for real-time transcription
      this.mediaRecorder.start();
      
      setInterval(() => {
        if (this.mediaRecorder?.state === 'recording') {
          this.mediaRecorder.stop();
          this.mediaRecorder.start();
        }
      }, 5000);

    } catch (error) {
      console.error('Error starting transcription:', error);
    }
  }

  static stopTranscription() {
    if (this.mediaRecorder?.state === 'recording') {
      this.mediaRecorder.stop();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  private static async processAudioChunk(audioBlob: Blob, sessionId: string) {
    try {
      // Convert blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      // Send to transcription edge function
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: {
          audioData: base64Audio,
          sessionId: sessionId,
          speakerType: 'unknown', // Will be enhanced with speaker detection
          timestampInCall: Math.floor(Date.now() / 1000),
        },
      });

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error processing audio chunk:', error);
    }
  }

  static async getSessionTranscript(sessionId: string) {
    try {
      const { data, error } = await supabase
        .from('video_call_transcripts')
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp_in_call', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching transcript:', error);
      return [];
    }
  }
}
