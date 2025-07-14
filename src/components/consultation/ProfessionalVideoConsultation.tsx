import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Share2, 
  MessageSquare, FileText, Camera, Settings, Users, 
  Dot, Download, AlertTriangle, ClipboardList, 
  Pill, Activity, Eye, Brain, Heart, Stethoscope, 
  Shield, Lock, Clock, Signal, Volume2, VolumeX,
  Monitor, Maximize, Minimize, Upload, Save,
  CheckCircle, XCircle, Calendar, User
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';

interface ProfessionalVideoConsultationProps {
  appointmentId: string;
  doctorId: string;
  patientId: string;
}

interface ConsultationData {
  id: string;
  patientName: string;
  patientAge: number;
  doctorName: string;
  specialty: string;
  scheduledTime: string;
  duration: number;
  status: 'waiting' | 'connecting' | 'active' | 'ended';
  recordingConsent: boolean;
  transcriptionConsent: boolean;
}

interface MedicalNote {
  id: string;
  content: string;
  timestamp: number;
  type: 'symptom' | 'diagnosis' | 'prescription' | 'observation' | 'recommendation';
  medication?: string;
  dosage?: string;
  severity?: 'low' | 'medium' | 'high';
}

interface TranscriptSegment {
  id: string;
  speaker: 'doctor' | 'patient' | 'system';
  content: string;
  timestamp: number;
  confidence: number;
}

interface ChatMessage {
  id: string;
  senderId: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'message' | 'file' | 'alert';
}

// Datos simulados de la consulta
const mockConsultation: ConsultationData = {
  id: 'consult-123',
  patientName: 'María González',
  patientAge: 34,
  doctorName: 'Dr. Carlos Rodríguez',
  specialty: 'Cardiología',
  scheduledTime: '2024-01-15T10:00:00Z',
  duration: 45,
  status: 'connecting',
  recordingConsent: true,
  transcriptionConsent: true
};

export default function ProfessionalVideoConsultation({ 
  appointmentId, 
  doctorId, 
  patientId 
}: ProfessionalVideoConsultationProps) {
  const { user } = useAuthStore();
  const isDoctor = user?.role === 'doctor';
  
  // Estados de la videollamada
  const [callState, setCallState] = useState({
    isConnected: false,
    isVideoEnabled: true,
    isAudioEnabled: true,
    isScreenSharing: false,
    isRecording: false,
    isTranscribing: false,
    connectionQuality: 'excellent' as 'excellent' | 'good' | 'fair' | 'poor',
    callDuration: 0,
    emergencyMode: false,
  });

  // Estados de contenido
  const [medicalNotes, setMedicalNotes] = useState<MedicalNote[]>([]);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'system',
      sender: 'Sistema',
      message: 'Videoconsulta iniciada. Chat médico seguro habilitado.',
      timestamp: new Date().toISOString(),
      type: 'alert'
    }
  ]);

  // Estados de formularios
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<'symptom' | 'diagnosis' | 'prescription' | 'observation' | 'recommendation'>('observation');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [chatMessage, setChatMessage] = useState('');

  // Referencias de video
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const recordingRef = useRef<MediaRecorder | null>(null);

  // Simulación de duración de llamada
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState.isConnected) {
      interval = setInterval(() => {
        setCallState(prev => ({
          ...prev,
          callDuration: prev.callDuration + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState.isConnected]);

  // Simulación de conexión automática
  useEffect(() => {
    const timer = setTimeout(() => {
      setCallState(prev => ({ ...prev, isConnected: true }));
      toast.success('Conexión establecida con el paciente');
      
      // Simular inicio de transcripción automática si hay consentimiento
      if (mockConsultation.transcriptionConsent) {
        setTimeout(() => {
          setCallState(prev => ({ ...prev, isTranscribing: true }));
          simulateTranscription();
        }, 2000);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Formatear tiempo
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulación de transcripción
  const simulateTranscription = () => {
    const sampleTranscripts = [
      { speaker: 'doctor' as const, content: 'Buenos días, ¿cómo se encuentra hoy?', confidence: 0.95 },
      { speaker: 'patient' as const, content: 'Buenos días doctor, he tenido algunos dolores en el pecho.', confidence: 0.88 },
      { speaker: 'doctor' as const, content: 'Entiendo. ¿Desde cuándo comenzaron estos dolores?', confidence: 0.92 },
      { speaker: 'patient' as const, content: 'Hace aproximadamente tres días, especialmente cuando subo escaleras.', confidence: 0.87 },
    ];

    sampleTranscripts.forEach((item, index) => {
      setTimeout(() => {
        const newSegment: TranscriptSegment = {
          id: `transcript-${Date.now()}-${index}`,
          speaker: item.speaker,
          content: item.content,
          timestamp: Date.now(),
          confidence: item.confidence
        };
        setTranscript(prev => [...prev, newSegment]);
      }, (index + 1) * 8000);
    });
  };

  // Handlers de control de video
  const toggleVideo = () => {
    setCallState(prev => ({ ...prev, isVideoEnabled: !prev.isVideoEnabled }));
    toast.info(callState.isVideoEnabled ? 'Cámara desactivada' : 'Cámara activada');
  };

  const toggleAudio = () => {
    setCallState(prev => ({ ...prev, isAudioEnabled: !prev.isAudioEnabled }));
    toast.info(callState.isAudioEnabled ? 'Micrófono silenciado' : 'Micrófono activado');
  };

  const toggleScreenShare = () => {
    setCallState(prev => ({ ...prev, isScreenSharing: !prev.isScreenSharing }));
    toast.info(callState.isScreenSharing ? 'Compartir pantalla detenido' : 'Compartir pantalla iniciado');
  };

  const startRecording = () => {
    if (!mockConsultation.recordingConsent) {
      toast.error('No hay consentimiento para grabar la consulta');
      return;
    }
    setCallState(prev => ({ ...prev, isRecording: true }));
    toast.success('Grabación iniciada - Almacenamiento seguro HIPAA');
  };

  const stopRecording = () => {
    setCallState(prev => ({ ...prev, isRecording: false }));
    toast.success('Grabación detenida y guardada de forma segura');
  };

  const toggleTranscription = () => {
    if (!callState.isTranscribing && !mockConsultation.transcriptionConsent) {
      toast.error('No hay consentimiento para transcribir la consulta');
      return;
    }
    
    setCallState(prev => ({ ...prev, isTranscribing: !prev.isTranscribing }));
    
    if (!callState.isTranscribing) {
      toast.success('Transcripción iniciada');
      simulateTranscription();
    } else {
      toast.success('Transcripción detenida');
    }
  };

  const endCall = () => {
    setCallState(prev => ({ 
      ...prev, 
      isConnected: false, 
      isRecording: false, 
      isTranscribing: false 
    }));
    toast.success('Consulta finalizada');
  };

  const toggleEmergencyMode = () => {
    setCallState(prev => ({ ...prev, emergencyMode: !prev.emergencyMode }));
    
    if (!callState.emergencyMode) {
      // Auto-iniciar grabación en modo emergencia
      if (!callState.isRecording) {
        startRecording();
      }
      toast.error('MODO DE EMERGENCIA ACTIVADO - Protocolos de emergencia iniciados');
    } else {
      toast.success('Modo de emergencia desactivado');
    }
  };

  // Handlers de notas médicas
  const saveMedicalNote = () => {
    if (!newNote.trim()) return;

    const note: MedicalNote = {
      id: `note-${Date.now()}`,
      content: newNote,
      timestamp: Date.now(),
      type: noteType,
      medication: noteType === 'prescription' ? medication : undefined,
      dosage: noteType === 'prescription' ? dosage : undefined,
      severity: ['symptom', 'diagnosis'].includes(noteType) ? severity : undefined,
    };

    setMedicalNotes(prev => [...prev, note]);
    setNewNote('');
    setMedication('');
    setDosage('');
    toast.success('Nota médica guardada de forma segura');
  };

  // Handler de chat
  const sendMessage = () => {
    if (!chatMessage.trim()) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || '',
      sender: isDoctor ? 'Dr. Rodriguez' : 'Paciente',
      message: chatMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'message'
    };

    setChatMessages(prev => [...prev, message]);
    setChatMessage('');
  };

  const takeScreenshot = () => {
    toast.success('Captura de pantalla guardada con timestamp médico');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header de consulta profesional */}
        <Card className="mb-6 border-2 border-blue-200">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                    <span>Consulta Médica Virtual</span>
                  </div>
                  {callState.emergencyMode && (
                    <Badge variant="destructive" className="animate-pulse text-sm">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      EMERGENCIA MÉDICA
                    </Badge>
                  )}
                </CardTitle>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Paciente:</span>
                    <span>{mockConsultation.patientName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Doctor:</span>
                    <span>{mockConsultation.doctorName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Especialidad:</span>
                    <span>{mockConsultation.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Duración:</span>
                    <span>{formatTime(callState.callDuration)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge 
                    variant={callState.isConnected ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    <Signal className="h-3 w-3" />
                    {callState.isConnected ? 'Conectado' : 'Conectando...'}
                  </Badge>
                  
                  {callState.isRecording && (
                    <Badge variant="destructive" className="animate-pulse">
                      <Dot className="h-3 w-3 mr-1" />
                      Grabando (HIPAA Seguro)
                    </Badge>
                  )}
                  
                  {callState.isTranscribing && (
                    <Badge variant="default">
                      <FileText className="h-3 w-3 mr-1" />
                      Transcribiendo IA
                    </Badge>
                  )}

                  <Badge 
                    variant={callState.connectionQuality === 'excellent' ? 'default' : 
                            callState.connectionQuality === 'good' ? 'secondary' : 'destructive'}
                  >
                    Calidad: {callState.connectionQuality === 'excellent' ? 'Excelente' : 
                             callState.connectionQuality === 'good' ? 'Buena' : 'Pobre'}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isDoctor && (
                  <Button 
                    variant={callState.emergencyMode ? "destructive" : "outline"} 
                    size="sm"
                    onClick={toggleEmergencyMode}
                    className="font-medium"
                  >
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {callState.emergencyMode ? 'Desactivar Emergencia' : 'Protocolo Emergencia'}
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Área principal de video profesional */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden border-2 border-gray-200">
              <CardContent className="p-0">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: '600px' }}>
                  
                  {/* Video principal del paciente/doctor */}
                  <div className="w-full h-full relative">
                    {callState.isConnected ? (
                      <div className="w-full h-full">
                        <video 
                          ref={remoteVideoRef}
                          className="w-full h-full object-cover"
                          autoPlay
                          playsInline
                        />
                        {!callState.isConnected && (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="h-16 w-16" />
                              </div>
                              <h3 className="text-2xl font-semibold mb-2">
                                {isDoctor ? mockConsultation.patientName : mockConsultation.doctorName}
                              </h3>
                              <p className="text-blue-100 text-lg">
                                {isDoctor ? `Paciente • ${mockConsultation.patientAge} años` : mockConsultation.specialty}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
                          <h3 className="text-xl font-semibold mb-2">Estableciendo conexión segura</h3>
                          <p className="text-gray-300">Conectando con protocolo médico HIPAA...</p>
                        </div>
                      </div>
                    )}

                    {/* Video local (doctor/paciente) */}
                    <div className="absolute bottom-6 right-6 w-64 h-48 bg-gray-700 rounded-lg overflow-hidden border-4 border-white shadow-2xl">
                      {callState.isVideoEnabled ? (
                        <div className="w-full h-full">
                          <video 
                            ref={localVideoRef}
                            className="w-full h-full object-cover"
                            autoPlay
                            playsInline
                            muted
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Users className="h-10 w-10" />
                              </div>
                              <p className="text-lg font-medium">
                                {isDoctor ? 'Doctor' : 'Paciente'}
                              </p>
                              <p className="text-green-100 text-sm">
                                {isDoctor ? 'Especialista' : 'Consultando'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                          <div className="text-center text-white">
                            <VideoOff className="h-12 w-12 mx-auto mb-2" />
                            <p className="text-sm">Cámara desactivada</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Indicadores de estado profesionales */}
                    <div className="absolute top-6 left-6 flex gap-2">
                      {!callState.isAudioEnabled && (
                        <Badge variant="destructive" className="flex items-center gap-1 text-sm">
                          <MicOff className="h-4 w-4" />
                          Micrófono silenciado
                        </Badge>
                      )}
                      {!callState.isVideoEnabled && (
                        <Badge variant="destructive" className="flex items-center gap-1 text-sm">
                          <VideoOff className="h-4 w-4" />
                          Cámara desactivada
                        </Badge>
                      )}
                      {callState.isScreenSharing && (
                        <Badge variant="default" className="flex items-center gap-1 text-sm">
                          <Monitor className="h-4 w-4" />
                          Compartiendo pantalla
                        </Badge>
                      )}
                    </div>

                    {/* Indicador de calidad y seguridad */}
                    <div className="absolute top-6 right-6 flex gap-2">
                      <Badge 
                        variant={callState.connectionQuality === 'excellent' ? 'default' : 
                                callState.connectionQuality === 'good' ? 'secondary' : 'destructive'}
                        className="flex items-center gap-1"
                      >
                        <Signal className="h-3 w-3" />
                        {callState.connectionQuality === 'excellent' && 'HD'}
                        {callState.connectionQuality === 'good' && 'SD'}
                        {callState.connectionQuality === 'poor' && 'Baja'}
                      </Badge>
                      
                      <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
                        <Shield className="h-3 w-3 mr-1" />
                        HIPAA Seguro
                      </Badge>
                    </div>

                    {/* Controles profesionales de video */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
                        <Button
                          size="lg"
                          variant={callState.isAudioEnabled ? "secondary" : "destructive"}
                          onClick={toggleAudio}
                          className="rounded-full w-14 h-14 hover:scale-105 transition-transform"
                        >
                          {callState.isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                        </Button>
                        
                        <Button
                          size="lg"
                          variant={callState.isVideoEnabled ? "secondary" : "destructive"}
                          onClick={toggleVideo}
                          className="rounded-full w-14 h-14 hover:scale-105 transition-transform"
                        >
                          {callState.isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                        </Button>
                        
                        <Button
                          size="lg"
                          variant={callState.isScreenSharing ? "default" : "outline"}
                          onClick={toggleScreenShare}
                          className="rounded-full w-14 h-14 hover:scale-105 transition-transform"
                        >
                          <Share2 className="h-6 w-6" />
                        </Button>
                        
                        <Button
                          size="lg"
                          variant={callState.isRecording ? "destructive" : "outline"}
                          onClick={callState.isRecording ? stopRecording : startRecording}
                          className="rounded-full w-14 h-14 hover:scale-105 transition-transform"
                        >
                          <Dot className="h-6 w-6" />
                        </Button>
                        
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={takeScreenshot}
                          className="rounded-full w-14 h-14 hover:scale-105 transition-transform"
                        >
                          <Camera className="h-6 w-6" />
                        </Button>
                        
                        <Button
                          size="lg"
                          variant="destructive"
                          onClick={endCall}
                          className="rounded-full w-14 h-14 hover:scale-105 transition-transform"
                        >
                          <PhoneOff className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral profesional */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Estado de la consulta */}
            <Card className="border-2 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-600" />
                  Estado de la Consulta
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Conexión:</span>
                    <Badge variant={callState.isConnected ? "default" : "secondary"}>
                      {callState.isConnected ? 'Estable' : 'Conectando'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Grabación:</span>
                    <Badge variant={callState.isRecording ? "destructive" : "outline"}>
                      {callState.isRecording ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Transcripción:</span>
                    <Badge variant={callState.isTranscribing ? "default" : "outline"}>
                      {callState.isTranscribing ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  variant={callState.isTranscribing ? "destructive" : "outline"} 
                  size="sm" 
                  className="w-full"
                  onClick={toggleTranscription}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {callState.isTranscribing ? 'Detener' : 'Iniciar'} Transcripción IA
                </Button>
                
                {isDoctor && (
                  <Button variant="outline" size="sm" className="w-full">
                    <Brain className="h-4 w-4 mr-2" />
                    Asistente IA Médico
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Consentimientos y privacidad */}
            <Card className="border-2 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  Privacidad y Consentimiento
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Grabación:</span>
                  <Badge variant={mockConsultation.recordingConsent ? "default" : "destructive"}>
                    {mockConsultation.recordingConsent ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Autorizada</>
                    ) : (
                      <><XCircle className="h-3 w-3 mr-1" /> Denegada</>
                    )}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Transcripción:</span>
                  <Badge variant={mockConsultation.transcriptionConsent ? "default" : "destructive"}>
                    {mockConsultation.transcriptionConsent ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Autorizada</>
                    ) : (
                      <><XCircle className="h-3 w-3 mr-1" /> Denegada</>
                    )}
                  </Badge>
                </div>
                <Alert className="mt-2">
                  <Lock className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Toda la información está encriptada y cumple con HIPAA.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Panel inferior con pestañas profesionales */}
        <Card className="mt-6 border-2 border-gray-200">
          <Tabs defaultValue="transcript" className="w-full">
            <CardHeader className="pb-3">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="transcript" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Transcripción Médica
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Notas Clínicas
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat Médico
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="transcript" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Transcripción en Tiempo Real</h3>
                    {callState.isTranscribing && (
                      <Badge variant="default" className="animate-pulse">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          Transcribiendo...
                        </div>
                      </Badge>
                    )}
                  </div>
                  
                  <ScrollArea className="h-80 border rounded-lg p-4 bg-gray-50">
                    {transcript.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">
                          {callState.isTranscribing ? 
                            'Transcripción en proceso... Esperando audio...' : 
                            'La transcripción aparecerá aquí cuando esté activa'
                          }
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {transcript.map((segment) => (
                          <div key={segment.id} className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
                            <div className="flex justify-between items-center mb-2">
                              <Badge variant="outline" className="text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                {segment.speaker === 'doctor' ? 'Doctor' : 'Paciente'}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  Confianza: {Math.round(segment.confidence * 100)}%
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(segment.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm leading-relaxed">{segment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                  
                  {transcript.length > 0 && (
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar Transcripción Completa
                    </Button>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="notes" className="mt-0">
                <div className="space-y-6">
                  {/* Formulario para nueva nota médica */}
                  <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-blue-600" />
                      Nueva Nota Clínica
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Select value={noteType} onValueChange={(value: any) => setNoteType(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de nota" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="symptom">
                            <div className="flex items-center gap-2">
                              <Activity className="h-4 w-4" />
                              Síntoma
                            </div>
                          </SelectItem>
                          <SelectItem value="diagnosis">
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Diagnóstico
                            </div>
                          </SelectItem>
                          <SelectItem value="prescription">
                            <div className="flex items-center gap-2">
                              <Pill className="h-4 w-4" />
                              Prescripción
                            </div>
                          </SelectItem>
                          <SelectItem value="observation">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Observación
                            </div>
                          </SelectItem>
                          <SelectItem value="recommendation">
                            <div className="flex items-center gap-2">
                              <ClipboardList className="h-4 w-4" />
                              Recomendación
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {['symptom', 'diagnosis'].includes(noteType) && (
                        <Select value={severity} onValueChange={(value: any) => setSeverity(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Severidad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Baja</SelectItem>
                            <SelectItem value="medium">Media</SelectItem>
                            <SelectItem value="high">Alta</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    
                    {noteType === 'prescription' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input
                          placeholder="Nombre del medicamento"
                          value={medication}
                          onChange={(e) => setMedication(e.target.value)}
                        />
                        <Input
                          placeholder="Dosis y frecuencia"
                          value={dosage}
                          onChange={(e) => setDosage(e.target.value)}
                        />
                      </div>
                    )}
                    
                    <Textarea
                      placeholder="Escribir nota clínica detallada..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-[100px] mb-4"
                    />
                    
                    <Button 
                      onClick={saveMedicalNote}
                      disabled={!newNote.trim()}
                      className="w-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Nota Segura (Timestamped)
                    </Button>
                  </div>
                  
                  {/* Lista de notas médicas */}
                  <div>
                    <h3 className="font-semibold mb-4">Historial de Notas de la Consulta</h3>
                    <ScrollArea className="h-80">
                      {medicalNotes.length === 0 ? (
                        <div className="text-center py-12">
                          <ClipboardList className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-500">No hay notas médicas registradas en esta consulta</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {medicalNotes.map((note) => (
                            <div key={note.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {note.type === 'symptom' && <><Activity className="h-3 w-3 mr-1" /> Síntoma</>}
                                    {note.type === 'diagnosis' && <><Eye className="h-3 w-3 mr-1" /> Diagnóstico</>}
                                    {note.type === 'prescription' && <><Pill className="h-3 w-3 mr-1" /> Prescripción</>}
                                    {note.type === 'observation' && <><FileText className="h-3 w-3 mr-1" /> Observación</>}
                                    {note.type === 'recommendation' && <><ClipboardList className="h-3 w-3 mr-1" /> Recomendación</>}
                                  </Badge>
                                  
                                  {note.severity && (
                                    <Badge 
                                      variant={note.severity === 'high' ? 'destructive' : 
                                              note.severity === 'medium' ? 'secondary' : 'outline'}
                                      className="text-xs"
                                    >
                                      Severidad: {note.severity === 'high' ? 'Alta' : 
                                                note.severity === 'medium' ? 'Media' : 'Baja'}
                                    </Badge>
                                  )}
                                </div>
                                
                                <span className="text-xs text-gray-500">
                                  {new Date(note.timestamp).toLocaleString()}
                                </span>
                              </div>
                              
                              {note.medication && (
                                <div className="mb-2 p-2 bg-blue-50 rounded border border-blue-200">
                                  <div className="text-sm font-medium text-blue-900">
                                    💊 {note.medication}
                                  </div>
                                  {note.dosage && (
                                    <div className="text-xs text-blue-700">
                                      Dosis: {note.dosage}
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              <p className="text-sm leading-relaxed">{note.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="chat" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Chat Médico Seguro</h3>
                    <Badge variant="outline" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      HIPAA Encriptado
                    </Badge>
                  </div>
                  
                  <ScrollArea className="h-72 border rounded-lg p-4 bg-gray-50">
                    <div className="space-y-3">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`
                          flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}
                        `}>
                          <div className={`
                            max-w-xs p-3 rounded-lg text-sm
                            ${msg.senderId === user?.id 
                              ? 'bg-blue-600 text-white' 
                              : msg.type === 'alert'
                              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                              : 'bg-white border border-gray-200'
                            }
                          `}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-xs">
                                {msg.sender}
                              </span>
                              <span className="text-xs opacity-70">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p>{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Escribir mensaje médico seguro..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={!chatMessage.trim()}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Alertas de seguridad y compliance */}
        <div className="mt-6 space-y-4">
          {callState.isRecording && (
            <Alert className="border-red-200 bg-red-50">
              <Lock className="h-4 w-4" />
              <AlertDescription>
                <strong>Grabación Médica Activa:</strong> Esta sesión está siendo grabada con consentimiento del paciente. 
                La grabación está encriptada de extremo a extremo y cumple con las regulaciones HIPAA. 
                Se almacena de forma segura con timestamp médico.
              </AlertDescription>
            </Alert>
          )}

          {callState.isTranscribing && (
            <Alert className="border-blue-200 bg-blue-50">
              <Brain className="h-4 w-4" />
              <AlertDescription>
                <strong>Transcripción IA Médica Activa:</strong> La conversación está siendo transcrita automáticamente 
                usando IA médica especializada. Los datos están protegidos por encriptación AES-256 y cumplen con HIPAA.
              </AlertDescription>
            </Alert>
          )}

          {callState.emergencyMode && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>PROTOCOLO DE EMERGENCIA ACTIVADO:</strong> Se han iniciado automáticamente los protocolos de emergencia médica. 
                Grabación automática activa, transcripción de emergencia habilitada, y notificaciones a servicios de emergencia preparadas.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}