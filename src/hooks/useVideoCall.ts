
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface VideoCallState {
  isConnected: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
  participants: Array<{ id: string; name: string; isVideoEnabled: boolean; isAudioEnabled: boolean }>;
  messages: Array<{ id: string; senderId: string; sender: string; message: string; timestamp: string }>;
}

export const useVideoCall = (appointmentId: string, userId?: string) => {
  const [callState, setCallState] = useState<VideoCallState>({
    isConnected: false,
    isVideoEnabled: true,
    isAudioEnabled: true,
    isScreenSharing: false,
    isRecording: false,
    participants: [],
    messages: [],
  });

  const toggleVideo = () => {
    setCallState(prev => ({ ...prev, isVideoEnabled: !prev.isVideoEnabled }));
    toast.success(`Cámara ${callState.isVideoEnabled ? 'desactivada' : 'activada'}`);
  };

  const toggleAudio = () => {
    setCallState(prev => ({ ...prev, isAudioEnabled: !prev.isAudioEnabled }));
    toast.success(`Micrófono ${callState.isAudioEnabled ? 'silenciado' : 'activado'}`);
  };

  const toggleScreenShare = () => {
    setCallState(prev => ({ ...prev, isScreenSharing: !prev.isScreenSharing }));
    toast.success(`Compartir pantalla ${callState.isScreenSharing ? 'detenido' : 'iniciado'}`);
  };

  const toggleRecording = () => {
    setCallState(prev => ({ ...prev, isRecording: !prev.isRecording }));
    toast.success(`Grabación ${callState.isRecording ? 'detenida' : 'iniciada'}`);
  };

  const endCall = (doctorId?: string, patientId?: string) => {
    setCallState(prev => ({ ...prev, isConnected: false }));
    toast.success('Llamada finalizada');
  };

  const joinCall = () => {
    setCallState(prev => ({ ...prev, isConnected: true }));
    toast.success('Conectado a la llamada');
  };

  const startCall = (doctorId: string, patientId: string) => {
    setCallState(prev => ({ ...prev, isConnected: true }));
    toast.success('Consulta iniciada');
  };

  const sendMessage = (message: string) => {
    const newMessage = {
      id: crypto.randomUUID(),
      senderId: userId || 'unknown',
      sender: 'Usuario',
      message,
      timestamp: new Date().toISOString(),
    };
    setCallState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  return {
    callState,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    toggleRecording,
    endCall,
    joinCall,
    startCall,
    sendMessage,
  };
};
