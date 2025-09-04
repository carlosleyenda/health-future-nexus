import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Navigation, 
  Camera, 
  MessageCircle, 
  Phone,
  AlertTriangle,
  Clock,
  CheckCircle,
  FileImage,
  Signature,
  Send,
  Mic,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';

interface DeliveryActionsProps {
  deliveryId: string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  onComplete: () => void;
}

export default function DeliveryActions({ deliveryId, customerInfo, onComplete }: DeliveryActionsProps) {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [deliveryPhoto, setDeliveryPhoto] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [incident, setIncident] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // Geolocalización en tiempo real
  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          toast.error('Error al obtener ubicación GPS');
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const handleOpenMaps = () => {
    const { address } = customerInfo;
    const encodedAddress = encodeURIComponent(address);
    
    // Detectar si es iOS/Android para abrir app nativa
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      window.open(`maps://maps.google.com/maps?daddr=${encodedAddress}&amp;ll=`);
    } else if (isAndroid) {
      window.open(`geo:0,0?q=${encodedAddress}`);
    } else {
      window.open(`https://www.google.com/maps/dir//${encodedAddress}`);
    }
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Simular envío de mensaje
    console.log('Enviando mensaje:', chatMessage);
    toast.success('Mensaje enviado al cliente');
    setChatMessage('');
  };

  const handleCallCustomer = () => {
    window.open(`tel:${customerInfo.phone}`);
  };

  const handleTakePhoto = () => {
    // En una app real, esto abriría la cámara
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Usar cámara trasera
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setDeliveryPhoto(reader.result as string);
          toast.success('Foto capturada correctamente');
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  const handleReportIncident = () => {
    if (!incident.trim()) {
      toast.error('Describe el incidente por favor');
      return;
    }
    
    console.log('Reportando incidente:', incident);
    toast.success('Incidente reportado al centro de control');
    setIncident('');
  };

  const handleCompleteDelivery = () => {
    if (!deliveryPhoto) {
      toast.error('Toma una foto de la entrega');
      return;
    }
    
    if (!signature) {
      toast.error('Solicita la firma del cliente');
      return;
    }
    
    onComplete();
    toast.success('Entrega completada exitosamente');
  };

  const handleVoiceMessage = () => {
    if (!isRecording) {
      // Iniciar grabación
      setIsRecording(true);
      toast.info('Grabando mensaje de voz...');
      
      // Simular grabación
      setTimeout(() => {
        setIsRecording(false);
        toast.success('Mensaje de voz enviado');
      }, 3000);
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header con info del cliente */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{customerInfo.name}</h3>
              <p className="text-sm text-muted-foreground">{customerInfo.address}</p>
            </div>
            <Badge variant="default" className="bg-blue-600">
              En Progreso
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Navegación GPS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Navegación GPS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={handleOpenMaps} className="w-full" size="lg">
            <MapPin className="mr-2 h-5 w-5" />
            Abrir en Google Maps
          </Button>
          
          {currentLocation && (
            <div className="text-sm text-center text-muted-foreground">
              📍 Ubicación actual: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comunicación con cliente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comunicación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button onClick={handleCallCustomer} variant="outline" className="flex-1">
              <Phone className="mr-2 h-4 w-4" />
              Llamar
            </Button>
            <Button onClick={handleVoiceMessage} variant="outline" className="flex-1">
              <Mic className={`mr-2 h-4 w-4 ${isRecording ? 'text-red-500' : ''}`} />
              {isRecording ? 'Grabando...' : 'Audio'}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Mensaje al cliente..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Mensajes rápidos */}
          <div className="flex flex-wrap gap-2">
            {[
              'Llegando en 5 minutos',
              'Estoy en la puerta',
              'No encuentro la dirección',
              'Cliente no disponible'
            ].map((msg) => (
              <Button
                key={msg}
                variant="outline"
                size="sm"
                onClick={() => setChatMessage(msg)}
                className="text-xs"
              >
                {msg}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentación de entrega */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Documentación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Foto de entrega */}
          <div>
            <Button onClick={handleTakePhoto} variant="outline" className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              {deliveryPhoto ? 'Cambiar Foto' : 'Tomar Foto de Entrega'}
            </Button>
            
            {deliveryPhoto && (
              <div className="mt-2">
                <img 
                  src={deliveryPhoto} 
                  alt="Foto de entrega" 
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Foto capturada</span>
                </div>
              </div>
            )}
          </div>

          {/* Firma digital */}
          <div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setSignature('firma_simulada_base64')}
            >
              <Signature className="mr-2 h-4 w-4" />
              {signature ? 'Cambiar Firma' : 'Solicitar Firma Digital'}
            </Button>
            
            {signature && (
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">Firma obtenida</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reportar incidente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Reportar Incidente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Describe cualquier problema o incidente..."
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
            rows={3}
          />
          <Button onClick={handleReportIncident} variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Enviar Reporte
          </Button>
        </CardContent>
      </Card>

      {/* Completar entrega */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <Button 
            onClick={handleCompleteDelivery}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
            disabled={!deliveryPhoto || !signature}
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Completar Entrega
          </Button>
          
          <div className="mt-2 text-xs text-center text-green-700">
            {!deliveryPhoto && '📷 '}
            {!signature && '✍️ '}
            {!deliveryPhoto || !signature ? 'Completa foto y firma para continuar' : '¡Listo para completar!'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}