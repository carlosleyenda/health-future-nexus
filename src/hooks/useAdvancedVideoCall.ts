
import { useState, useCallback, useEffect, useRef } from 'react';
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
  callState: 'idle' | 'connecting' | 'connected' | 'ended';
  isTranscribing: boolean;
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  fetchParticipants: () => Promise<void>;
  startRecording: () => void;
  stopRecording: () => void;
  addTranscript: (text: string) => void;
  addMedicalNote: (note: string) => void;
  startCall: () => void;
  endCall: () => void;
  toggleVideo: () => void;
  toggleAudio: () => void;
  toggleScreenShare: () => void;
  sendMessage: (message: string) => void;
  saveMedicalNote: (note: string) => void;
  takeScreenshot: () => void;
  startTranscription: () => void;
  stopTranscription: () => void;
  loadParticipants: () => Promise<void>;
}

export const useAdvancedVideoCall = (sessionId: string): UseAdvancedVideoCall => {
  const [participants, setParticipants] = useState<any[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [medicalNotes, setMedicalNotes] = useState<any[]>([]);
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

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

  const startCall = () => {
    setCallState('connecting');
    setTimeout(() => setCallState('connected'), 1000);
  };

  const endCall = () => {
    setCallState('ended');
  };

  const toggleVideo = () => {
    console.log('Video toggled');
  };

  const toggleAudio = () => {
    console.log('Audio toggled');
  };

  const toggleScreenShare = () => {
    console.log('Screen share toggled');
  };

  const sendMessage = (message: string) => {
    console.log('Message sent:', message);
  };

  const saveMedicalNote = (note: string) => {
    addMedicalNote(note);
    console.log('Medical note saved:', note);
  };

  const takeScreenshot = () => {
    console.log('Screenshot taken');
  };

  const startTranscription = () => {
    setIsTranscribing(true);
    console.log('Transcription started');
  };

  const stopTranscription = () => {
    setIsTranscribing(false);
    console.log('Transcription stopped');
  };

  const fetchParticipants = useCallback(async () => {
    try {
      const data = await ParticipantsService.getSessionParticipants(sessionId);
      setParticipants(data || []);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  }, [sessionId]);

  const loadParticipants = fetchParticipants;

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
    callState,
    isTranscribing,
    localVideoRef,
    remoteVideoRef,
    fetchParticipants,
    startRecording,
    stopRecording,
    addTranscript,
    addMedicalNote,
    startCall,
    endCall,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    sendMessage,
    saveMedicalNote,
    takeScreenshot,
    startTranscription,
    stopTranscription,
    loadParticipants
  };
};
