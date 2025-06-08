
import { supabase } from '@/integrations/supabase/client';
import { VideoCallSession, VideoCallMessage, QualityMetrics } from '@/types/videocall';

export class WebRTCService {
  private peerConnection: RTCPeerConnection;
  private localStream?: MediaStream;
  private remoteStream?: MediaStream;
  private dataChannel?: RTCDataChannel;
  private sessionId?: string;
  private userId?: string;
  private onRemoteStreamCallback?: (stream: MediaStream) => void;
  private onMessageCallback?: (message: VideoCallMessage) => void;
  private qualityMetricsInterval?: NodeJS.Timeout;

  constructor() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    });

    this.setupPeerConnection();
  }

  private setupPeerConnection() {
    this.peerConnection.ontrack = (event) => {
      this.remoteStream = event.streams[0];
      this.onRemoteStreamCallback?.(this.remoteStream);
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.sessionId) {
        this.sendSignalingMessage({
          type: 'ice-candidate',
          candidate: event.candidate,
          sessionId: this.sessionId,
        });
      }
    };

    this.peerConnection.ondatachannel = (event) => {
      const channel = event.channel;
      channel.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.onMessageCallback?.(message);
      };
    };

    this.peerConnection.onconnectionstatechange = () => {
      if (this.peerConnection.connectionState === 'connected') {
        this.startQualityMonitoring();
      } else if (this.peerConnection.connectionState === 'disconnected') {
        this.stopQualityMonitoring();
      }
    };
  }

  async initializeSession(sessionId: string, userId: string, isInitiator: boolean) {
    this.sessionId = sessionId;
    this.userId = userId;

    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: { echoCancellation: true, noiseSuppression: true },
      });

      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream!);
      });

      if (isInitiator) {
        this.dataChannel = this.peerConnection.createDataChannel('chat');
        this.setupDataChannel();
        
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        
        await this.sendSignalingMessage({
          type: 'offer',
          offer: offer,
          sessionId: sessionId,
        });
      }

      await this.logActivity('session_initialized');
      return this.localStream;
    } catch (error) {
      console.error('Error initializing WebRTC session:', error);
      throw error;
    }
  }

  async handleSignalingMessage(message: any) {
    try {
      switch (message.type) {
        case 'offer':
          await this.peerConnection.setRemoteDescription(message.offer);
          const answer = await this.peerConnection.createAnswer();
          await this.peerConnection.setLocalDescription(answer);
          await this.sendSignalingMessage({
            type: 'answer',
            answer: answer,
            sessionId: this.sessionId,
          });
          break;

        case 'answer':
          await this.peerConnection.setRemoteDescription(message.answer);
          break;

        case 'ice-candidate':
          await this.peerConnection.addIceCandidate(message.candidate);
          break;
      }
    } catch (error) {
      console.error('Error handling signaling message:', error);
    }
  }

  async sendMessage(message: string) {
    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      const messageData: VideoCallMessage = {
        id: crypto.randomUUID(),
        sessionId: this.sessionId!,
        senderId: this.userId!,
        senderType: 'doctor', // This should be determined by user role
        message,
        timestamp: new Date().toISOString(),
      };

      this.dataChannel.send(JSON.stringify(messageData));
      this.onMessageCallback?.(messageData);
    }
  }

  async toggleVideo(): Promise<boolean> {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        await this.logActivity(videoTrack.enabled ? 'video_enabled' : 'video_disabled');
        return videoTrack.enabled;
      }
    }
    return false;
  }

  async toggleAudio(): Promise<boolean> {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        await this.logActivity(audioTrack.enabled ? 'audio_enabled' : 'audio_disabled');
        return audioTrack.enabled;
      }
    }
    return false;
  }

  async startScreenShare(): Promise<MediaStream | null> {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const videoSender = this.peerConnection.getSenders().find(
        sender => sender.track?.kind === 'video'
      );

      if (videoSender) {
        await videoSender.replaceTrack(screenStream.getVideoTracks()[0]);
      }

      await this.logActivity('screen_share_started');
      return screenStream;
    } catch (error) {
      console.error('Error starting screen share:', error);
      return null;
    }
  }

  async stopScreenShare() {
    if (this.localStream) {
      const videoSender = this.peerConnection.getSenders().find(
        sender => sender.track?.kind === 'video'
      );

      if (videoSender && this.localStream.getVideoTracks()[0]) {
        await videoSender.replaceTrack(this.localStream.getVideoTracks()[0]);
      }

      await this.logActivity('screen_share_stopped');
    }
  }

  async endCall() {
    this.stopQualityMonitoring();
    
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }

    if (this.dataChannel) {
      this.dataChannel.close();
    }

    this.peerConnection.close();
    await this.logActivity('call_ended');
  }

  private setupDataChannel() {
    if (this.dataChannel) {
      this.dataChannel.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.onMessageCallback?.(message);
      };
    }
  }

  private async sendSignalingMessage(message: any) {
    // This would typically go through a signaling server
    // For now, we'll use Supabase realtime channels
    try {
      await supabase
        .channel(`video-call-${this.sessionId}`)
        .send({
          type: 'broadcast',
          event: 'signaling',
          payload: message,
        });
    } catch (error) {
      console.error('Error sending signaling message:', error);
    }
  }

  private startQualityMonitoring() {
    this.qualityMetricsInterval = setInterval(async () => {
      if (this.peerConnection && this.sessionId && this.userId) {
        const stats = await this.peerConnection.getStats();
        const metrics = this.parseRTCStats(stats);
        await this.saveQualityMetrics(metrics);
      }
    }, 5000); // Every 5 seconds
  }

  private stopQualityMonitoring() {
    if (this.qualityMetricsInterval) {
      clearInterval(this.qualityMetricsInterval);
    }
  }

  private parseRTCStats(stats: RTCStatsReport): Partial<QualityMetrics> {
    const metrics: Partial<QualityMetrics> = {};
    
    stats.forEach((report) => {
      if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
        metrics.videoBitrate = report.bytesReceived;
        metrics.packetLossPercentage = report.packetsLost / report.packetsReceived * 100;
      }
      
      if (report.type === 'candidate-pair' && report.state === 'succeeded') {
        metrics.latencyMs = report.currentRoundTripTime * 1000;
      }
    });

    return metrics;
  }

  private async saveQualityMetrics(metrics: Partial<QualityMetrics>) {
    try {
      await supabase
        .from('video_call_quality_metrics')
        .insert({
          session_id: this.sessionId,
          user_id: this.userId,
          timestamp_in_call: Math.floor(Date.now() / 1000),
          ...metrics,
        });
    } catch (error) {
      console.error('Error saving quality metrics:', error);
    }
  }

  private async logActivity(action: string, details?: any) {
    try {
      await supabase
        .from('video_call_audit_log')
        .insert({
          session_id: this.sessionId,
          user_id: this.userId,
          action,
          details,
          timestamp_in_call: Math.floor(Date.now() / 1000),
        });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }

  setOnRemoteStreamCallback(callback: (stream: MediaStream) => void) {
    this.onRemoteStreamCallback = callback;
  }

  setOnMessageCallback(callback: (message: VideoCallMessage) => void) {
    this.onMessageCallback = callback;
  }

  getLocalStream(): MediaStream | undefined {
    return this.localStream;
  }

  getRemoteStream(): MediaStream | undefined {
    return this.remoteStream;
  }

  getConnectionState(): RTCPeerConnectionState {
    return this.peerConnection.connectionState;
  }
}
