
import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, Phone, MessageCircle, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVideoCall } from '@/hooks/useVideoCall';
import { useAppointment } from '@/hooks/useAppointments';

interface VideoConsultationProps {
  appointmentId: string;
  userId: string;
  userRole: 'doctor' | 'patient';
}

export default function VideoConsultation({ appointmentId, userId, userRole }: VideoConsultationProps) {
  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  
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
    }
  };

  const handleEndCall = () => {
    if (appointment) {
      endCall(appointment.doctorId, appointment.patientId);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Consulta Virtual</h1>
            <p className="text-sm text-gray-500">
              {appointment?.reason}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              callState.isConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {callState.isConnected ? 'Conectado' : 'En espera'}
            </span>
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Video Principal */}
          <div className="relative bg-gray-800 flex items-center justify-center">
            {callState.isConnected ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">
                    {userRole === 'doctor' ? 'Paciente' : 'Dr. García'}
                  </p>
                  <p className="text-sm opacity-75">Video conectado</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-white">
                <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-4">Esperando conexión...</p>
                {userRole === 'doctor' && (
                  <Button onClick={handleStartCall} className="bg-green-600 hover:bg-green-700">
                    Iniciar Consulta
                  </Button>
                )}
              </div>
            )}

            {/* Video Local (esquina) */}
            {callState.isConnected && (
              <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg border-2 border-white shadow-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Tú</p>
                </div>
              </div>
            )}
          </div>

          {/* Chat */}
          <div className={`bg-white ${showChat ? 'block' : 'hidden lg:block'}`}>
            <Card className="h-full rounded-none border-0">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat de la Consulta
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full p-0">
                {/* Mensajes */}
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

                {/* Input de mensaje */}
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="bg-white border-t p-4">
        <div className="flex justify-center items-center gap-4">
          <Button
            variant={callState.isVideoEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-12 h-12"
          >
            {callState.isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={callState.isAudioEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleAudio}
            className="rounded-full w-12 h-12"
          >
            {callState.isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={toggleScreenShare}
            className="rounded-full w-12 h-12"
          >
            <Monitor className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowChat(!showChat)}
            className="rounded-full w-12 h-12 lg:hidden"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndCall}
            className="rounded-full w-12 h-12"
          >
            <Phone className="h-5 w-5 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
}
