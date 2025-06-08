import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, Monitor, Phone, MessageCircle, 
  Send, FileText, Save, Camera, Square, Users, 
  AlertTriangle, Settings, Maximize, VolumeX, Volume2 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useAdvancedVideoCall } from '@/hooks/useAdvancedVideoCall';
import { MedicalNote } from '@/types/videocall';
import { toast } from 'sonner';

interface AdvancedVideoCallProps {
  appointmentId: string;
  userId: string;
  userRole: 'doctor' | 'patient';
  doctorId: string;
  patientId: string;
}

export default function AdvancedVideoCall({ 
  appointmentId, 
  userId, 
  userRole, 
  doctorId, 
  patientId 
}: AdvancedVideoCallProps) {
  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [showNotes, setShowNotes] = useState(userRole === 'doctor');
  const [showSettings, setShowSettings] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [noteType, setNoteType] = useState<MedicalNote['noteType']>('observation');
  const [prescriptionDetails, setPrescriptionDetails] = useState({ medication: '', dosage: '' });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionIssues, setConnectionIssues] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [currentPanel, setCurrentPanel] = useState<'chat' | 'notes' | 'transcript' | 'participants'>('chat');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const {
    callState,
    medicalNotes,
    participants,
    isTranscribing,
    localVideoRef: setLocalVideoRef,
    remoteVideoRef: setRemoteVideoRef,
    startCall,
    endCall,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    sendMessage: sendChatMessage,
    saveMedicalNote,
    startRecording,
    takeScreenshot,
    startTranscription,
    stopTranscription,
  } = useAdvancedVideoCall(appointmentId, userId, userRole);

  // Set video refs
  useEffect(() => {
    setLocalVideoRef(localVideoRef.current);
    setRemoteVideoRef(remoteVideoRef.current);
  }, [setLocalVideoRef, setRemoteVideoRef]);

  // Monitor connection quality
  useEffect(() => {
    setConnectionIssues(callState.connectionQuality === 'poor');
  }, [callState.connectionQuality]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendChatMessage(message);
      setMessage('');
    }
  };

  const handleSaveNote = () => {
    if (currentNote.trim()) {
      const isPrescription = noteType === 'prescription';
      saveMedicalNote(
        noteType,
        currentNote,
        isPrescription,
        isPrescription ? prescriptionDetails.medication : undefined,
        isPrescription ? prescriptionDetails.dosage : undefined
      );
      setCurrentNote('');
      setPrescriptionDetails({ medication: '', dosage: '' });
    }
  };

  const handleEmergencyEscalation = () => {
    // This would trigger emergency protocols
    toast.error('Protocolo de emergencia activado');
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  const getNoteTypeColor = (type: MedicalNote['noteType']) => {
    switch (type) {
      case 'symptom': return 'bg-red-100 text-red-800';
      case 'diagnosis': return 'bg-blue-100 text-blue-800';
      case 'prescription': return 'bg-green-100 text-green-800';
      case 'observation': return 'bg-purple-100 text-purple-800';
      case 'recommendation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Enhanced Header */}
      <div className="bg-white border-b p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold">Consulta Virtual Avanzada</h1>
              <p className="text-sm text-gray-500">
                ID: {appointmentId} | Participantes: {participants.length + 1}
              </p>
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                callState.isConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  callState.isConnected ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                {callState.isConnected ? 'Conectado' : 'Conectando...'}
              </div>

              {/* Transcription Status */}
              {isTranscribing && (
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-1 animate-pulse" />
                  Transcribiendo
                </Badge>
              )}

              {/* Connection Quality */}
              <div className={`text-sm ${getConnectionQualityColor(callState.connectionQuality)}`}>
                Calidad: {callState.connectionQuality}
              </div>

              {/* Call Duration */}
              {callState.isConnected && (
                <div className="text-sm font-mono">
                  {formatDuration(callState.callDuration)}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Recording Indicator */}
            {callState.isRecording && (
              <Badge variant="destructive" className="animate-pulse">
                <div className="h-3 w-3 mr-1 bg-white rounded-full" />
                Grabando
              </Badge>
            )}

            {/* Connection Issues Alert */}
            {connectionIssues && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Conexión inestable
              </Badge>
            )}

            {/* Participants Count */}
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              {callState.participants.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex">
        {/* Video Container */}
        <div className="flex-1 flex flex-col bg-gray-900 relative">
          {/* Main Video */}
          <div className="flex-1 relative">
            {callState.isConnected ? (
              <div className="w-full h-full relative">
                {/* Remote Video */}
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover bg-gray-800"
                />
                
                {/* Local Video (Picture in Picture) */}
                <div className="absolute bottom-4 right-4 w-64 h-48 bg-gray-800 rounded-lg border-2 border-white shadow-xl overflow-hidden">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {!callState.isVideoEnabled && (
                    <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-white">
                      <VideoOff className="h-8 w-8" />
                    </div>
                  )}
                </div>

                {/* Screen Share Indicator */}
                {callState.isScreenSharing && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    <Monitor className="h-4 w-4 inline mr-1" />
                    Compartiendo pantalla
                  </div>
                )}

                {/* Emergency Button */}
                {userRole === 'doctor' && (
                  <Button
                    onClick={handleEmergencyEscalation}
                    variant="destructive"
                    size="sm"
                    className="absolute top-4 right-4"
                  >
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Emergencia
                  </Button>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <Video className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <p className="text-xl mb-4">Esperando conexión...</p>
                  {userRole === 'doctor' && (
                    <Button 
                      onClick={() => startCall(doctorId, patientId)} 
                      size="lg" 
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Iniciar Consulta
                    </Button>
                  )}
                  {userRole === 'patient' && (
                    <p className="text-sm opacity-75">El médico iniciará la consulta en breve</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Controls */}
          <div className="bg-white border-t p-4">
            <div className="flex justify-center items-center gap-3">
              {/* Basic Controls */}
              <Button
                variant={callState.isVideoEnabled ? "default" : "destructive"}
                size="lg"
                onClick={toggleVideo}
                className="rounded-full w-14 h-14"
              >
                {callState.isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
              </Button>

              <Button
                variant={callState.isAudioEnabled ? "default" : "destructive"}
                size="lg"
                onClick={toggleAudio}
                className="rounded-full w-14 h-14"
              >
                {callState.isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
              </Button>

              <Button
                variant={callState.isScreenSharing ? "default" : "outline"}
                size="lg"
                onClick={toggleScreenShare}
                className="rounded-full w-14 h-14"
              >
                <Monitor className="h-6 w-6" />
              </Button>

              {/* Doctor-only Controls */}
              {userRole === 'doctor' && (
                <>
                  {/* ... keep existing code (recording, screenshot) */}

                  {/* Transcription Control */}
                  <Button
                    variant={isTranscribing ? "destructive" : "outline"}
                    size="lg"
                    onClick={isTranscribing ? stopTranscription : () => startTranscription(callState.sessionId || '', localStream)}
                    className="rounded-full w-14 h-14"
                  >
                    <FileText className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Fullscreen */}
              <Button
                variant="outline"
                size="lg"
                onClick={toggleFullscreen}
                className="rounded-full w-14 h-14"
              >
                <Maximize className="h-6 w-6" />
              </Button>

              {/* Settings */}
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full w-14 h-14"
                  >
                    <Settings className="h-6 w-6" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Configuración de Llamada</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Calidad de video alta</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cancelación de ruido</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Eco cancelación</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* End Call */}
              <Button
                variant="destructive"
                size="lg"
                onClick={endCall}
                className="rounded-full w-14 h-14"
              >
                <Phone className="h-6 w-6 rotate-180" />
              </Button>
            </div>

            {/* Connection Quality Indicator */}
            <div className="mt-3 text-center">
              <div className="text-xs text-gray-600 mb-1">Calidad de conexión</div>
              <Progress 
                value={
                  callState.connectionQuality === 'excellent' ? 100 :
                  callState.connectionQuality === 'good' ? 75 :
                  callState.connectionQuality === 'fair' ? 50 : 25
                } 
                className="w-32 mx-auto h-2"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Sidebar with Multiple Panels */}
        <div className="w-96 bg-white border-l flex flex-col">
          {/* Enhanced Sidebar Tabs */}
          <div className="flex border-b">
            <Button
              variant={currentPanel === 'chat' ? "default" : "ghost"}
              onClick={() => setCurrentPanel('chat')}
              className="flex-1 rounded-none border-r"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
              {callState.messages.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {callState.messages.length}
                </Badge>
              )}
            </Button>

            <Button
              variant={currentPanel === 'participants' ? "default" : "ghost"}
              onClick={() => setCurrentPanel('participants')}
              className="flex-1 rounded-none border-r"
            >
              <Users className="h-4 w-4 mr-2" />
              Equipo
              <Badge variant="secondary" className="ml-2">
                {participants.length + 1}
              </Badge>
            </Button>

            <Button
              variant={currentPanel === 'transcript' ? "default" : "ghost"}
              onClick={() => setCurrentPanel('transcript')}
              className="flex-1 rounded-none border-r"
            >
              <FileText className="h-4 w-4 mr-2" />
              Texto
            </Button>

            {userRole === 'doctor' && (
              <Button
                variant={currentPanel === 'notes' ? "default" : "ghost"}
                onClick={() => setCurrentPanel('notes')}
                className="flex-1 rounded-none"
              >
                <FileText className="h-4 w-4 mr-2" />
                Notas
                {medicalNotes.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {medicalNotes.length}
                  </Badge>
                )}
              </Button>
            )}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-hidden">
            {currentPanel === 'chat' && (
              <div className="h-full flex flex-col">
                {/* Chat Panel */}
                <div className="p-4 border-b">
                  <h3 className="font-medium">Chat Seguro</h3>
                  <p className="text-xs text-gray-500">Mensajes encriptados end-to-end</p>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {callState.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg ${
                          msg.senderId === userId
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-75 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString('es-MX', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mensaje seguro..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentPanel === 'participants' && (
              <ParticipantsList
                sessionId={callState.sessionId || ''}
                currentUserId={userId}
                isDoctor={userRole === 'doctor'}
              />
            )}

            {currentPanel === 'transcript' && (
              <TranscriptionPanel
                sessionId={callState.sessionId || ''}
                isRecording={isTranscribing}
              />
            )}

            {currentPanel === 'notes' && userRole === 'doctor' && (
              <div className="h-full flex flex-col">
                {/* Enhanced Medical Notes Panel */}
                <div className="p-4 border-b">
                  <h3 className="font-medium">Notas Médicas</h3>
                  <p className="text-xs text-gray-500">Tiempo de consulta: {formatDuration(callState.callDuration)}</p>
                </div>

                {/* Add Note */}
                <div className="p-4 border-b space-y-3">
                  <Select value={noteType} onValueChange={(value: MedicalNote['noteType']) => setNoteType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="observation">Observación</SelectItem>
                      <SelectItem value="symptom">Síntoma</SelectItem>
                      <SelectItem value="diagnosis">Diagnóstico</SelectItem>
                      <SelectItem value="prescription">Prescripción</SelectItem>
                      <SelectItem value="recommendation">Recomendación</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder={`Escribir ${noteType}...`}
                    rows={3}
                  />

                  {noteType === 'prescription' && (
                    <div className="space-y-2">
                      <Input
                        placeholder="Medicamento"
                        value={prescriptionDetails.medication}
                        onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, medication: e.target.value }))}
                      />
                      <Input
                        placeholder="Dosis"
                        value={prescriptionDetails.dosage}
                        onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, dosage: e.target.value }))}
                      />
                    </div>
                  )}

                  <Button onClick={handleSaveNote} size="sm" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Nota
                  </Button>
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {medicalNotes.map((note) => (
                    <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getNoteTypeColor(note.noteType)}>
                          {note.noteType}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDuration(note.timestampInCall)}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{note.content}</p>
                      {note.isPrescription && (
                        <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
                          <strong>Medicamento:</strong> {note.medicationName}<br />
                          <strong>Dosis:</strong> {note.dosage}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
