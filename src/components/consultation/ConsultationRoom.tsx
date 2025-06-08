
import React, { useState, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, Phone, MessageCircle, Send, FileText, Save, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useVideoCall } from '@/hooks/useVideoCall';
import { useAppointment } from '@/hooks/useAppointments';
import { toast } from 'sonner';

interface ConsultationRoomProps {
  appointmentId: string;
  userId: string;
  userRole: 'doctor' | 'patient';
}

interface MedicalNote {
  id: string;
  content: string;
  timestamp: string;
  type: 'symptom' | 'diagnosis' | 'prescription' | 'general';
}

export default function ConsultationRoom({ appointmentId, userId, userRole }: ConsultationRoomProps) {
  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [showNotes, setShowNotes] = useState(userRole === 'doctor');
  const [currentNote, setCurrentNote] = useState('');
  const [noteType, setNoteType] = useState<MedicalNote['type']>('general');
  const [medicalNotes, setMedicalNotes] = useState<MedicalNote[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data: appointment } = useAppointment(appointmentId);
  const { 
    callState, 
    startCall, 
    endCall, 
    toggleVideo, 
    toggleAudio, 
    toggleScreenShare,
    sendMessage 
  } = useVideoCall(appointmentId, userId);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleStartCall = () => {
    if (appointment) {
      startCall(appointment.doctorId, appointment.patientId);
      toast.success('Consulta iniciada');
    }
  };

  const handleEndCall = () => {
    endCall();
    toast.success('Consulta finalizada');
  };

  const saveNote = () => {
    if (currentNote.trim()) {
      const newNote: MedicalNote = {
        id: crypto.randomUUID(),
        content: currentNote,
        timestamp: new Date().toISOString(),
        type: noteType
      };
      setMedicalNotes(prev => [...prev, newNote]);
      setCurrentNote('');
      toast.success('Nota médica guardada');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast.success(isRecording ? 'Grabación detenida' : 'Iniciando grabación');
  };

  const getNoteTypeColor = (type: MedicalNote['type']) => {
    switch (type) {
      case 'symptom': return 'bg-red-100 text-red-800';
      case 'diagnosis': return 'bg-blue-100 text-blue-800';
      case 'prescription': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Consulta Virtual</h1>
            <p className="text-sm text-gray-500">
              {appointment?.reason} - {appointment?.patientId}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${callState.isConnected ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-sm">
                {callState.isConnected ? 'Conectado' : 'En espera'}
              </span>
            </div>
            {isRecording && (
              <Badge variant="destructive" className="animate-pulse">
                🔴 Grabando
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Main Video */}
          <div className="flex-1 relative">
            {callState.isConnected ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center relative">
                <div className="text-center text-white">
                  <Video className="h-20 w-20 mx-auto mb-4" />
                  <p className="text-xl mb-2">
                    {userRole === 'doctor' ? 'Paciente' : 'Dr. García'}
                  </p>
                  <p className="text-sm opacity-75">Video activo</p>
                </div>
                
                {/* Screen sharing indicator */}
                {callState.isScreenSharing && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    Compartiendo pantalla
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <Video className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <p className="text-xl mb-4">Esperando conexión...</p>
                  {userRole === 'doctor' && (
                    <Button onClick={handleStartCall} size="lg" className="bg-green-600 hover:bg-green-700">
                      Iniciar Consulta
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Local Video (Picture in Picture) */}
            {callState.isConnected && (
              <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white shadow-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white">
                  <div className="text-center">
                    {callState.isVideoEnabled ? (
                      <>
                        <Camera className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Tú</p>
                      </>
                    ) : (
                      <>
                        <VideoOff className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Cámara desactivada</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Video Controls */}
          <div className="bg-white border-t p-4">
            <div className="flex justify-center items-center gap-4">
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

              {userRole === 'doctor' && (
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="lg"
                  onClick={toggleRecording}
                  className="rounded-full w-14 h-14"
                >
                  <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-white' : 'bg-red-500'}`} />
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowChat(!showChat)}
                className="rounded-full w-14 h-14 md:hidden"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>

              {userRole === 'doctor' && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowNotes(!showNotes)}
                  className="rounded-full w-14 h-14 md:hidden"
                >
                  <FileText className="h-6 w-6" />
                </Button>
              )}

              <Button
                variant="destructive"
                size="lg"
                onClick={handleEndCall}
                className="rounded-full w-14 h-14"
              >
                <Phone className="h-6 w-6 rotate-180" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-96 bg-white border-l flex flex-col">
          {/* Sidebar Tabs */}
          <div className="flex border-b">
            <Button
              variant={showChat ? "default" : "ghost"}
              onClick={() => { setShowChat(true); setShowNotes(false); }}
              className="flex-1 rounded-none border-r"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </Button>
            {userRole === 'doctor' && (
              <Button
                variant={showNotes ? "default" : "ghost"}
                onClick={() => { setShowNotes(true); setShowChat(false); }}
                className="flex-1 rounded-none"
              >
                <FileText className="h-4 w-4 mr-2" />
                Notas
              </Button>
            )}
          </div>

          {/* Chat Panel */}
          {showChat && (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-medium">Chat de la Consulta</h3>
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
                    placeholder="Escribe un mensaje..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Medical Notes Panel */}
          {showNotes && userRole === 'doctor' && (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-medium">Notas Médicas</h3>
              </div>

              {/* Add Note */}
              <div className="p-4 border-b space-y-3">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={noteType === 'general' ? 'default' : 'outline'}
                    onClick={() => setNoteType('general')}
                  >
                    General
                  </Button>
                  <Button
                    size="sm"
                    variant={noteType === 'symptom' ? 'default' : 'outline'}
                    onClick={() => setNoteType('symptom')}
                  >
                    Síntoma
                  </Button>
                  <Button
                    size="sm"
                    variant={noteType === 'diagnosis' ? 'default' : 'outline'}
                    onClick={() => setNoteType('diagnosis')}
                  >
                    Diagnóstico
                  </Button>
                  <Button
                    size="sm"
                    variant={noteType === 'prescription' ? 'default' : 'outline'}
                    onClick={() => setNoteType('prescription')}
                  >
                    Receta
                  </Button>
                </div>
                <Textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder="Escribir nota médica..."
                  rows={3}
                />
                <Button onClick={saveNote} size="sm" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Nota
                </Button>
              </div>

              {/* Notes List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {medicalNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getNoteTypeColor(note.type)}>
                        {note.type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(note.timestamp).toLocaleTimeString('es-MX', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
