import { useState, useEffect, useRef, useCallback } from 'react';
import { WebRTCService } from '@/services/webrtc/webrtcService';
import { VideoCallService } from '@/services/api/videoCallService';
import { VideoCallState, VideoCallMessage, MedicalNote } from '@/types/videocall';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useAdvancedVideoCall(appointmentId: string, userId: string, userRole: 'doctor' | 'patient') {
  const [callState, setCallState] = useState<VideoCallState>({
    isConnected: false,
    isVideoEnabled: true,
    isAudioEnabled: true,
    isScreenSharing: false,
    isRecording: false,
    participants: [],
    messages: [],
    connectionQuality: 'good',
    callDuration: 0,
  });

  const [medicalNotes, setMedicalNotes] = useState<MedicalNote[]>([]);
  const [localVideoRef, setLocalVideoRef] = useState<HTMLVideoElement | null>(null);
  const [remoteVideoRef, setRemoteVideoRef] = useState<HTMLVideoElement | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const webrtcService = useRef<WebRTCService>();
  const callStartTime = useRef<number>();
  const durationInterval = useRef<NodeJS.Timeout>();

  // Initialize WebRTC service
  useEffect(() => {
    webrtcService.current = new WebRTCService();
    
    webrtcService.current.setOnRemoteStreamCallback((stream) => {
      if (remoteVideoRef) {
        remoteVideoRef.srcObject = stream;
      }
      setCallState(prev => ({ ...prev, isConnected: true }));
    });

    webrtcService.current.setOnMessageCallback((message) => {
      setCallState(prev => ({
        ...prev,
        messages: [...prev.messages, message]
      }));
    });

    return () => {
      webrtcService.current?.endCall();
    };
  }, [remoteVideoRef]);

  // Enhanced start call with transcription and participants
  const startCall = useCallback(async (doctorId: string, patientId: string) => {
    try {
      if (!webrtcService.current) return;

      // Create session in database
      const session = await VideoCallService.createSession(appointmentId, doctorId, patientId);
      
      // Initialize WebRTC session
      const localStream = await webrtcService.current.initializeSession(
        session.id,
        userId,
        userRole === 'doctor'
      );

      if (localVideoRef && localStream) {
        localVideoRef.srcObject = localStream;
      }

      setCallState(prev => ({
        ...prev,
        sessionId: session.id,
        participants: [userId],
      }));

      // Start transcription if user consents
      if (userRole === 'doctor') {
        await startTranscription(session.id, localStream);
      }

      // Start call duration tracking
      callStartTime.current = Date.now();
      durationInterval.current = setInterval(() => {
        if (callStartTime.current) {
          const duration = Math.floor((Date.now() - callStartTime.current) / 1000);
          setCallState(prev => ({ ...prev, callDuration: duration }));
        }
      }, 1000);

      // Update session status
      await VideoCallService.updateSessionStatus(session.id, 'active');

      // Setup signaling and participants channels
      const channel = supabase.channel(`video-call-${session.id}`);
      channel.on('broadcast', { event: 'signaling' }, (payload) => {
        webrtcService.current?.handleSignalingMessage(payload.payload);
      });
      channel.on('broadcast', { event: 'participant-update' }, () => {
        loadParticipants(session.id);
      });
      channel.subscribe();

      toast.success('Videollamada iniciada');
    } catch (error) {
      console.error('Error starting call:', error);
      toast.error('Error al iniciar la videollamada');
    }
  }, [appointmentId, userId, userRole, localVideoRef]);

  // Start transcription
  const startTranscription = useCallback(async (sessionId: string, stream: MediaStream) => {
    try {
      await TranscriptionService.startTranscription(sessionId, stream);
      setIsTranscribing(true);
      toast.success('Transcripción automática activada');
    } catch (error) {
      console.error('Error starting transcription:', error);
      toast.error('Error al iniciar la transcripción');
    }
  }, []);

  // Stop transcription
  const stopTranscription = useCallback(() => {
    TranscriptionService.stopTranscription();
    setIsTranscribing(false);
  }, []);

  // Load participants
  const loadParticipants = useCallback(async (sessionId: string) => {
    try {
      const data = await ParticipantsService.getSessionParticipants(sessionId);
      setParticipants(data);
      setCallState(prev => ({ ...prev, participants: data.map(p => p.userId) }));
    } catch (error) {
      console.error('Error loading participants:', error);
    }
  }, []);

  // Enhanced end call with cleanup
  const endCall = useCallback(async () => {
    try {
      if (webrtcService.current && callState.sessionId) {
        await webrtcService.current.endCall();
        await VideoCallService.updateSessionStatus(callState.sessionId, 'ended');
        
        // Stop transcription
        if (isTranscribing) {
          stopTranscription();
        }

        // Leave session as participant
        await ParticipantsService.leaveSession(callState.sessionId, userId);
        
        if (durationInterval.current) {
          clearInterval(durationInterval.current);
        }

        setCallState(prev => ({
          ...prev,
          isConnected: false,
          sessionId: undefined,
        }));

        toast.success('Videollamada finalizada');
      }
    } catch (error) {
      console.error('Error ending call:', error);
      toast.error('Error al finalizar la videollamada');
    }
  }, [callState.sessionId, isTranscribing, stopTranscription, userId]);

  // Toggle video
  const toggleVideo = useCallback(async () => {
    if (webrtcService.current) {
      const isEnabled = await webrtcService.current.toggleVideo();
      setCallState(prev => ({ ...prev, isVideoEnabled: isEnabled }));
    }
  }, []);

  // Toggle audio
  const toggleAudio = useCallback(async () => {
    if (webrtcService.current) {
      const isEnabled = await webrtcService.current.toggleAudio();
      setCallState(prev => ({ ...prev, isAudioEnabled: isEnabled }));
    }
  }, []);

  // Toggle screen sharing
  const toggleScreenShare = useCallback(async () => {
    if (webrtcService.current) {
      if (callState.isScreenSharing) {
        await webrtcService.current.stopScreenShare();
        setCallState(prev => ({ ...prev, isScreenSharing: false }));
      } else {
        const screenStream = await webrtcService.current.startScreenShare();
        if (screenStream) {
          setCallState(prev => ({ ...prev, isScreenSharing: true }));
        }
      }
    }
  }, [callState.isScreenSharing]);

  // Send message
  const sendMessage = useCallback(async (message: string) => {
    if (webrtcService.current) {
      await webrtcService.current.sendMessage(message);
    }
  }, []);

  // Save medical note (doctor only)
  const saveMedicalNote = useCallback(async (
    noteType: MedicalNote['noteType'],
    content: string,
    isPrescription = false,
    medicationName?: string,
    dosage?: string
  ) => {
    if (userRole !== 'doctor' || !callState.sessionId) return;

    try {
      const timestampInCall = callState.callDuration;
      
      const note = await VideoCallService.saveMedicalNote({
        sessionId: callState.sessionId,
        doctorId: userId,
        noteType,
        content,
        timestampInCall,
        isPrescription,
        medicationName,
        dosage,
      });

      setMedicalNotes(prev => [...prev, note]);
      toast.success('Nota médica guardada');
    } catch (error) {
      console.error('Error saving medical note:', error);
      toast.error('Error al guardar la nota médica');
    }
  }, [userRole, callState.sessionId, callState.callDuration, userId]);

  // Start recording (doctor only)
  const startRecording = useCallback(async () => {
    if (userRole !== 'doctor' || !callState.sessionId) return;

    try {
      await VideoCallService.startRecording(callState.sessionId);
      setCallState(prev => ({ ...prev, isRecording: true }));
      toast.success('Grabación iniciada');
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Error al iniciar la grabación');
    }
  }, [userRole, callState.sessionId]);

  // Take screenshot
  const takeScreenshot = useCallback(async (description?: string) => {
    if (!callState.sessionId) return;

    try {
      await VideoCallService.takeScreenshot(callState.sessionId, userId, description);
      toast.success('Captura guardada');
    } catch (error) {
      console.error('Error taking screenshot:', error);
      toast.error('Error al tomar la captura');
    }
  }, [callState.sessionId, userId]);

  // Load data when session starts
  useEffect(() => {
    if (callState.sessionId) {
      loadParticipants(callState.sessionId);
      
      if (userRole === 'doctor') {
        VideoCallService.getMedicalNotes(callState.sessionId)
          .then(setMedicalNotes)
          .catch(console.error);
      }
    }
  }, [callState.sessionId, userRole, loadParticipants]);

  return {
    callState,
    medicalNotes,
    participants,
    transcript,
    isTranscribing,
    localVideoRef: setLocalVideoRef,
    remoteVideoRef: setRemoteVideoRef,
    startCall,
    endCall,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    sendMessage,
    saveMedicalNote,
    startRecording,
    takeScreenshot,
    startTranscription,
    stopTranscription,
    loadParticipants,
  };
}
