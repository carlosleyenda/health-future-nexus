import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Share2,
  MessageSquare,
  FileText,
  Camera,
  Settings,
  Users,
  ChevronDown,
  Send,
  Maximize,
  Minimize,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';

interface ConsultationData {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  scheduledTime: string;
  duration: number;
  status: 'waiting' | 'connecting' | 'active' | 'ended';
}

// Datos simulados de la consulta
const mockConsultation: ConsultationData = {
  id: 'consult-123',
  patientName: 'Juan Pérez',
  doctorName: 'Dra. María García',
  specialty: 'Medicina General',
  scheduledTime: '2024-01-15T10:00:00Z',
  duration: 30,
  status: 'connecting'
};

export function VideoConsultation() {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'system', message: 'Bienvenido a la videoconsulta', time: '10:00' },
    { id: 2, sender: 'doctor', message: 'Buenos días! Estoy revisando su expediente', time: '10:01' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { profile } = useAuthStore();

  // Simulación de duración de llamada
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // Simulación de conexión de video
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
      setIsCallActive(true);
      toast.success('Conexión establecida con el doctor');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast.info(isVideoEnabled ? 'Cámara desactivada' : 'Cámara activada');
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast.info(isAudioEnabled ? 'Micrófono silenciado' : 'Micrófono activado');
  };

  const endCall = () => {
    setIsCallActive(false);
    setConnectionStatus('disconnected');
    toast.success('Consulta finalizada');
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'patient',
        message: newMessage,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const shareScreen = () => {
    toast.info('Función de compartir pantalla próximamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header de la consulta */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Videoconsulta con {mockConsultation.doctorName}
                </CardTitle>
                <CardDescription>
                  {mockConsultation.specialty} • {formatTime(callDuration)} • 
                  <Badge 
                    variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
                    className="ml-2"
                  >
                    {connectionStatus === 'connecting' && 'Conectando...'}
                    {connectionStatus === 'connected' && 'Conectado'}
                    {connectionStatus === 'disconnected' && 'Desconectado'}
                  </Badge>
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowChat(!showChat)}>
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video principal */}
          <div className={`${showChat ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <Card>
              <CardContent className="p-0">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                  
                  {/* Video del doctor (principal) */}
                  <div className="w-full h-full relative">
                    {connectionStatus === 'connected' ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="h-12 w-12" />
                          </div>
                          <h3 className="text-xl font-semibold">{mockConsultation.doctorName}</h3>
                          <p className="text-blue-100">{mockConsultation.specialty}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                          <p>Conectando con el doctor...</p>
                        </div>
                      </div>
                    )}

                    {/* Video local (paciente) - miniatura */}
                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                      {isVideoEnabled ? (
                        <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Users className="h-8 w-8" />
                            </div>
                            <p className="text-sm font-medium">Tú</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                          <VideoOff className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Indicadores de estado */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {!isAudioEnabled && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <MicOff className="h-3 w-3" />
                          Silenciado
                        </Badge>
                      )}
                      {!isVideoEnabled && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <VideoOff className="h-3 w-3" />
                          Video Off
                        </Badge>
                      )}
                    </div>

                    {/* Controles de video */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
                        <Button
                          size="sm"
                          variant={isAudioEnabled ? "secondary" : "destructive"}
                          onClick={toggleAudio}
                          className="rounded-full w-12 h-12"
                        >
                          {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant={isVideoEnabled ? "secondary" : "destructive"}
                          onClick={toggleVideo}
                          className="rounded-full w-12 h-12"
                        >
                          {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={shareScreen}
                          className="rounded-full w-12 h-12"
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={endCall}
                          className="rounded-full w-12 h-12"
                        >
                          <PhoneOff className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Herramientas adicionales */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold">Notas Médicas</h3>
                  <p className="text-sm text-muted-foreground">
                    El doctor puede tomar notas durante la consulta
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Camera className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold">Capturas</h3>
                  <p className="text-sm text-muted-foreground">
                    Tomar fotos para referencia médica
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold">Recetas</h3>
                  <p className="text-sm text-muted-foreground">
                    Recibir recetas digitales al final
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Panel de chat (si está habilitado) */}
          {showChat && (
            <div className="lg:col-span-1">
              <Card className="h-96">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Chat de Consulta</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-80">
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`
                        flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}
                      `}>
                        <div className={`
                          max-w-xs p-3 rounded-lg text-sm
                          ${msg.sender === 'patient' 
                            ? 'bg-blue-600 text-white' 
                            : msg.sender === 'doctor'
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-yellow-100 text-yellow-800'
                          }
                        `}>
                          <p>{msg.message}</p>
                          <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Escribir mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}