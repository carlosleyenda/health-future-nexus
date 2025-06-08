
export interface VideoCallSession {
  id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;
  sessionToken: string;
  status: 'waiting' | 'connecting' | 'active' | 'ended' | 'emergency';
  startedAt?: string;
  endedAt?: string;
  durationMinutes?: number;
  recordingUrl?: string;
  transcriptUrl?: string;
  patientConsentRecording: boolean;
  patientConsentTranscript: boolean;
  emergencyEscalated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VideoCallMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderType: 'doctor' | 'patient';
  message: string;
  timestamp: string;
}

export interface MedicalNote {
  id: string;
  sessionId: string;
  doctorId: string;
  noteType: 'symptom' | 'diagnosis' | 'prescription' | 'observation' | 'recommendation';
  content: string;
  timestampInCall: number;
  isPrescription: boolean;
  medicationName?: string;
  dosage?: string;
  createdAt: string;
}

export interface VideoCallRecording {
  id: string;
  sessionId: string;
  recordingUrl: string;
  durationSeconds?: number;
  fileSizeBytes?: number;
  encryptionKey?: string;
  isBackedUp: boolean;
  createdAt: string;
}

export interface VideoCallTranscript {
  id: string;
  sessionId: string;
  speakerType: 'doctor' | 'patient' | 'system';
  content: string;
  timestampInCall: number;
  confidenceScore?: number;
  createdAt: string;
}

export interface QualityMetrics {
  id: string;
  sessionId: string;
  userId: string;
  timestampInCall: number;
  videoResolution?: string;
  videoBitrate?: number;
  audioBitrate?: number;
  packetLossPercentage?: number;
  latencyMs?: number;
  jitterMs?: number;
  connectionType?: string;
  createdAt: string;
}

export interface VideoCallState {
  sessionId?: string;
  isConnected: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
  participants: string[];
  messages: VideoCallMessage[];
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
  callDuration: number;
}

export interface WebRTCConnection {
  peerConnection: RTCPeerConnection;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
  dataChannel?: RTCDataChannel;
}
