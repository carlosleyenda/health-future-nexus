
import { useState, useEffect } from 'react';
import { RealtimeService } from '@/services/realtime';

interface VideoCallState {
  isConnected: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  participants: string[];
  messages: ChatMessage[];
}

interface ChatMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: string;
}

export const useVideoCall = (appointmentId: string, userId: string) => {
  const [callState, setCallState] = useState<VideoCallState>({
    isConnected: false,
    isVideoEnabled: true,
    isAudioEnabled: true,
    isScreenSharing: false,
    participants: [],
    messages: []
  });

  const realtimeService = RealtimeService.getInstance();

  useEffect(() => {
    // Suscribirse a eventos de videollamada
    const unsubscribeVideoCall = realtimeService.subscribe('video_call_started', (data) => {
      if (data.appointmentId === appointmentId) {
        setCallState(prev => ({
          ...prev,
          isConnected: true,
          participants: [data.doctorId, data.patientId]
        }));
      }
    });

    const unsubscribeMessages = realtimeService.subscribe('consultation_message', (data) => {
      if (data.appointmentId === appointmentId) {
        setCallState(prev => ({
          ...prev,
          messages: [...prev.messages, {
            id: crypto.randomUUID(),
            senderId: data.senderId,
            message: data.message,
            timestamp: data.timestamp
          }]
        }));
      }
    });

    const unsubscribeCallEnd = realtimeService.subscribe('video_call_ended', (data) => {
      if (data.appointmentId === appointmentId) {
        setCallState(prev => ({
          ...prev,
          isConnected: false,
          participants: []
        }));
      }
    });

    return () => {
      unsubscribeVideoCall();
      unsubscribeMessages();
      unsubscribeCallEnd();
    };
  }, [appointmentId, realtimeService]);

  const startCall = (doctorId: string, patientId: string) => {
    realtimeService.initiateVideoCall(appointmentId, doctorId, patientId);
  };

  const endCall = () => {
    realtimeService.endVideoCall(appointmentId);
  };

  const toggleVideo = () => {
    setCallState(prev => ({
      ...prev,
      isVideoEnabled: !prev.isVideoEnabled
    }));
  };

  const toggleAudio = () => {
    setCallState(prev => ({
      ...prev,
      isAudioEnabled: !prev.isAudioEnabled
    }));
  };

  const toggleScreenShare = () => {
    if (!callState.isScreenSharing) {
      realtimeService.shareScreen(appointmentId, userId);
    }
    setCallState(prev => ({
      ...prev,
      isScreenSharing: !prev.isScreenSharing
    }));
  };

  const sendMessage = (message: string) => {
    realtimeService.sendMessage(appointmentId, message, userId);
  };

  return {
    callState,
    startCall,
    endCall,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    sendMessage
  };
};
