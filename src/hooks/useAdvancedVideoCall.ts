import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ParticipantsService } from '@/services/participants/participantsService';

interface Participant {
  id: string;
  session_id: string;
  user_id: string;
  participant_type: string;
  is_active: boolean;
  joined_at: string | null;
  left_at: string | null;
}

interface UseAdvancedVideoCall {
  participants: Participant[];
  isRecording: boolean;
  transcript: any[];
  medicalNotes: any[];
  fetchParticipants: () => Promise<void>;
  startRecording: () => void;
  stopRecording: () => void;
  addTranscript: (text: string) => void;
  addMedicalNote: (note: string) => void;
}

export const useAdvancedVideoCall = (sessionId: string) => {
  const [participants, setParticipants] = useState<any[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [medicalNotes, setMedicalNotes] = useState<any[]>([]);

  const startRecording = () => {
    setIsRecording(true);
    console.log('Recording started');
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log('Recording stopped');
  };

  const addTranscript = (text: string) => {
    setTranscript(prev => [...prev, { text, timestamp: Date.now() }]);
  };

  const addMedicalNote = (note: string) => {
    setMedicalNotes(prev => [...prev, { note, timestamp: Date.now() }]);
  };

  const fetchParticipants = useCallback(async () => {
    try {
      const data = await ParticipantsService.getSessionParticipants(sessionId);
      setParticipants(data || []);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchParticipants();

    const participantJoinSub = supabase
      .channel(`video-call-${sessionId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'video_call_participants' },
        (payload) => {
          if (payload.new) {
            handleParticipantJoin(payload.new);
          }
        }
      )
      .subscribe();

    const participantLeaveSub = supabase
      .channel(`video-call-${sessionId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'video_call_participants' },
        (payload) => {
          if (payload.new) {
            handleParticipantLeave(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(participantJoinSub);
      supabase.removeChannel(participantLeaveSub);
    };
  }, [sessionId, fetchParticipants]);

  const handleParticipantJoin = useCallback((participant: any) => {
    console.log('Participant joined:', participant.user_id);
    setParticipants(prev => [...prev, participant]);
  }, []);

  const handleParticipantLeave = useCallback((updatedParticipant: any) => {
    console.log('Participant left:', updatedParticipant.user_id);
    setParticipants(prev => prev.filter(p => p.user_id !== updatedParticipant.user_id));
  }, []);

  return {
    participants,
    isRecording,
    transcript,
    medicalNotes,
    fetchParticipants,
    startRecording,
    stopRecording,
    addTranscript,
    addMedicalNote
  };
};
