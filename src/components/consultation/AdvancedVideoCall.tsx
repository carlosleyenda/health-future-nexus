
import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff, 
  Monitor, Settings, Users, MessageSquare, FileText,
  Camera, Download, Maximize2, Volume2, VolumeX,
  Clock, Wifi, AlertTriangle, UserPlus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useAdvancedVideoCall } from '@/hooks/useAdvancedVideoCall';
import ParticipantsList from './ParticipantsList';
import TranscriptionPanel from './TranscriptionPanel';

interface AdvancedVideoCallProps {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  userId: string;
  userRole: 'doctor' | 'patient';
  onCallEnd?: () => void;
}

export default function AdvancedVideoCall({
  appointmentId,
  doctorId,
  patientId,
  userId,
  userRole,
  onCallEnd
}: AdvancedVideoCallProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('participants');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
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
  } = useAdvancedVideoCall(appointmentId, userId, userRole);

  useEffect(() => {
    setLocalVideoRef(localVideoRef.current);
    setRemoteVideoRef(remoteVideoRef.current);
  }, [setLocalVideoRef, setRemoteVideoRef]);

  useEffect(() => {
    // Auto-start call when component mounts
    startCall(doctorId, patientId);
  }, [startCall, doctorId, patientId]);

  const handleEndCall = async () => {
    await endCall();
    onCallEnd?.();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getConnectionQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getConnectionQualityIcon = (quality: string) => {
    switch (quality) {
      case 'poor': return <AlertTriangle className="h-4 w-4" />;
      default: return <Wifi className="h-4 w-4" />;
    }
  };

  return (
    <div ref={containerRef} className="h-full bg-gray-900 text-white flex flex-col">
      {/* Header with call info and controls */}
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-mono text-sm">{formatDuration(callState.callDuration)}</span>
          </div>
          
          <div className={`flex items-center gap-2 ${getConnectionQualityColor(callState.connectionQuality)}`}>
            {getConnectionQualityIcon(callState.connectionQuality)}
            <span className="text-sm capitalize">{callState.connectionQuality}</span>
          </div>

          <Badge variant={callState.isConnected ? 'default' : 'destructive'}>
            {callState.isConnected ? 'Conectado' : 'Conectando...'}
          </Badge>

          {callState.isRecording && (
            <Badge variant="destructive" className="animate-pulse">
              <div className="h-2 w-2 bg-white rounded-full mr-1" />
              GRABANDO
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={toggleFullscreen} variant="ghost" size="sm">
            <Maximize2 className="h-4 w-4" />
          </Button>
          
          <Button onClick={() => setShowSettings(!showSettings)} variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main video area */}
        <div className="flex-1 relative">
          {/* Remote video (main) */}
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover bg-gray-800"
          />

          {/* Local video (picture-in-picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>

          {/* Volume control overlay */}
          {volume !== 50 && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span className="text-sm">{volume}%</span>
              </div>
            </div>
          )}

          {/* Call controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 bg-black bg-opacity-50 p-2 rounded-lg">
              {/* Video toggle */}
              <Button
                onClick={toggleVideo}
                variant={callState.isVideoEnabled ? "default" : "destructive"}
                size="sm"
              >
                {callState.isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>

              {/* Audio toggle */}
              <Button
                onClick={toggleAudio}
                variant={callState.isAudioEnabled ? "default" : "destructive"}
                size="sm"
              >
                {callState.isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>

              {/* Screen share */}
              <Button
                onClick={toggleScreenShare}
                variant={callState.isScreenSharing ? "secondary" : "default"}
                size="sm"
              >
                <Monitor className="h-4 w-4" />
              </Button>

              {/* Doctor-only controls */}
              {userRole === 'doctor' && (
                <>
                  <Button
                    onClick={startRecording}
                    variant={callState.isRecording ? "destructive" : "default"}
                    size="sm"
                    disabled={callState.isRecording}
                  >
                    <div className="h-2 w-2 bg-red-500 rounded-full" />
                  </Button>

                  <Button onClick={() => takeScreenshot()} variant="default" size="sm">
                    <Camera className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* End call */}
              <Button onClick={handleEndCall} variant="destructive" size="sm">
                <PhoneOff className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="w-80 bg-white text-black border-l">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="participants" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Participantes</span>
              </TabsTrigger>
              <TabsTrigger value="transcription" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Transcripción</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Chat</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="participants" className="h-full m-0">
                <ParticipantsList
                  sessionId={callState.sessionId || ''}
                  currentUserId={userId}
                  userRole={userRole}
                  onInviteParticipant={() => {
                    // TODO: Implement invite modal
                    console.log('Invite participant clicked');
                  }}
                />
              </TabsContent>

              <TabsContent value="transcription" className="h-full m-0">
                <TranscriptionPanel
                  sessionId={callState.sessionId || ''}
                  isRecording={isTranscribing}
                />
              </TabsContent>

              <TabsContent value="chat" className="h-full m-0">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Chat de la consulta
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Chat en tiempo real</p>
                      <p className="text-xs mt-1">Función próximamente disponible</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-50">
          <h3 className="font-semibold mb-3">Configuración de llamada</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Volumen</label>
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {userRole === 'doctor' && (
              <div className="space-y-2">
                <Button
                  onClick={() => startTranscription(callState.sessionId || '', new MediaStream())}
                  variant={isTranscribing ? "destructive" : "default"}
                  size="sm"
                  className="w-full"
                  disabled={!callState.sessionId}
                >
                  {isTranscribing ? 'Detener transcripción' : 'Iniciar transcripción'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
