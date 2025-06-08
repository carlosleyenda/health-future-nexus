
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Mic, 
  AlertTriangle,
  Camera,
  FileText
} from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  onToggleFileSharing: () => void;
}

export default function MessageInput({ onSendMessage, onToggleFileSharing }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setIsEmergency(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmergencyToggle = () => {
    setIsEmergency(!isEmergency);
    if (!isEmergency) {
      setMessage('🚨 EMERGENCIA: ');
    } else {
      setMessage(message.replace('🚨 EMERGENCIA: ', ''));
    }
  };

  return (
    <div className="border-t bg-white p-4">
      {/* Barra de herramientas */}
      <div className="flex items-center gap-2 mb-3">
        <Button
          variant={isEmergency ? "destructive" : "outline"}
          size="sm"
          onClick={handleEmergencyToggle}
          className="text-xs"
        >
          <AlertTriangle className="h-3 w-3 mr-1" />
          Emergencia
        </Button>
        
        <Button variant="outline" size="sm" onClick={onToggleFileSharing}>
          <Paperclip className="h-3 w-3 mr-1" />
          Adjuntar
        </Button>

        <Button variant="outline" size="sm">
          <Camera className="h-3 w-3 mr-1" />
          Foto
        </Button>

        <Button variant="outline" size="sm">
          <FileText className="h-3 w-3 mr-1" />
          Documento
        </Button>
      </div>

      {/* Área de entrada de mensaje */}
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              isEmergency 
                ? "Describe tu emergencia médica..." 
                : "Escribe tu mensaje médico..."
            }
            className={`min-h-[60px] resize-none ${
              isEmergency ? 'border-red-300 focus:border-red-500' : ''
            }`}
            maxLength={500}
          />
          
          {/* Contador de caracteres */}
          <div className="text-xs text-gray-500 mt-1 text-right">
            {message.length}/500
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRecording(!isRecording)}
            className={isRecording ? 'bg-red-100 text-red-600' : ''}
          >
            <Mic className="h-4 w-4" />
          </Button>

          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className={isEmergency ? 'bg-red-500 hover:bg-red-600' : ''}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Indicador de grabación */}
      {isRecording && (
        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          Grabando mensaje de voz...
        </div>
      )}

      {/* Advertencia de emergencia */}
      {isEmergency && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
          ⚠️ Los mensajes de emergencia se envían con prioridad alta y notifican inmediatamente al médico.
        </div>
      )}
    </div>
  );
}
