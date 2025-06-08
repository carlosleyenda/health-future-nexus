import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdvancedVideoCall } from '@/hooks/useAdvancedVideoCall';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  ScreenShare, 
  ScreenShareOff,
  Users,
  FileText,
  Camera,
  MessageSquare,
  Heart,
  Activity
} from 'lucide-react';

interface AdvancedVideoCallProps {
  sessionId: string;
  isDoctor?: boolean;
}

export default function AdvancedVideoCall({ sessionId, isDoctor = false }: AdvancedVideoCallProps) {
  const {
    participants,
    isRecording,
    transcript,
    medicalNotes,
    callState,
    isTranscribing,
    localVideoRef,
    remoteVideoRef,
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
  } = useAdvancedVideoCall(sessionId);

  const [newNote, setNewNote] = useState('');
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    loadParticipants();
  }, [loadParticipants]);

  // Handlers
  const handleStartCall = () => {
    startCall();
  };

  const handleEndCall = () => {
    endCall();
  };

  const handleToggleVideo = () => {
    toggleVideo();
  };

  const handleToggleAudio = () => {
    toggleAudio();
  };

  const handleToggleScreenShare = () => {
    toggleScreenShare();
  };

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  const handleSaveMedicalNote = (note: string) => {
    saveMedicalNote(note);
  };

  const handleTakeScreenshot = () => {
    takeScreenshot();
  };

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleStartTranscription = () => {
    startTranscription();
  };

  const handleStopTranscription = () => {
    stopTranscription();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Video Call Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Video Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0 relative">
              <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                <video
                  ref={remoteVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                />
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden">
                  <video
                    ref={localVideoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                </div>
                
                {/* Call Status Overlay */}
                <div className="absolute top-4 left-4">
                  <Badge variant={callState.status === 'connected' ? 'default' : 'secondary'}>
                    {callState.status === 'connected' ? 'Conectado' : 'Desconectado'}
                  </Badge>
                </div>
                
                {/* Recording Indicator */}
                {isRecording && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive" className="animate-pulse">
                      🔴 Grabando
                    </Badge>
                  </div>
                )}
              </div>
              
              {/* Call Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Button
                  variant={callState.isVideoEnabled ? "default" : "secondary"}
                  size="sm"
                  onClick={toggleVideo}
                >
                  {callState.isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                <Button
                  variant={callState.isAudioEnabled ? "default" : "secondary"}
                  size="sm"
                  onClick={toggleAudio}
                >
                  {callState.isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button
                  variant={callState.isScreenSharing ? "default" : "secondary"}
                  size="sm"
                  onClick={toggleScreenShare}
                >
                  {callState.isScreenSharing ? <ScreenShareOff className="h-4 w-4" /> : <ScreenShare className="h-4 w-4" />}
                </Button>
                {!isRecording ? (
                  <Button variant="outline" size="sm" onClick={startRecording}>
                    Grabar
                  </Button>
                ) : (
                  <Button variant="destructive" size="sm" onClick={stopRecording}>
                    Detener
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={takeScreenshot}>
                  <Camera className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={endCall}>
                  Finalizar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Participantes ({participants.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{participant.user_id}</span>
                    <Badge variant={participant.is_active ? "default" : "secondary"}>
                      {participant.is_active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {!isTranscribing ? (
                <Button variant="outline" className="w-full" onClick={startTranscription}>
                  Iniciar Transcripción
                </Button>
              ) : (
                <Button variant="secondary" className="w-full" onClick={stopTranscription}>
                  Detener Transcripción
                </Button>
              )}
              <Button variant="outline" className="w-full" onClick={() => addMedicalNote('Nota rápida')}>
                <FileText className="h-4 w-4 mr-2" />
                Nota Médica
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Tabs */}
      <Tabs defaultValue="transcript" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transcript">Transcripción</TabsTrigger>
          <TabsTrigger value="notes">Notas Médicas</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="transcript">
          <Card>
            <CardHeader>
              <CardTitle>Transcripción en Tiempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {transcript.map((item, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                    <span className="font-medium">{new Date(item.timestamp).toLocaleTimeString()}: </span> 
                    {item.text}
                  </div>
                ))}
                {transcript.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    {isTranscribing ? 'Esperando transcripción...' : 'Inicia la transcripción para ver el contenido aquí'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Notas Médicas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Escribir nueva nota médica..."
                    className="w-full p-2 border rounded resize-none"
                    rows={3}
                  />
                  <Button 
                    onClick={() => {
                      if (newNote.trim()) {
                        saveMedicalNote(newNote);
                        setNewNote('');
                      }
                    }}
                    className="w-full"
                  >
                    Guardar Nota
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {medicalNotes.map((note, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(note.timestamp).toLocaleString()}
                      </div>
                      <div className="text-sm">{note.note}</div>
                    </div>
                  ))}
                  {medicalNotes.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No hay notas médicas aún</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat de la Consulta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Escribir mensaje..."
                    className="flex-1 p-2 border rounded"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && chatMessage.trim()) {
                        sendMessage(chatMessage);
                        setChatMessage('');
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      if (chatMessage.trim()) {
                        sendMessage(chatMessage);
                        setChatMessage('');
                      }
                    }}
                  >
                    Enviar
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  Los mensajes del chat aparecerán aquí durante la consulta
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
