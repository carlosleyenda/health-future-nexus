
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { 
  Download, 
  Image, 
  FileText, 
  Check, 
  CheckCheck,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'emergency';
  status: 'sent' | 'delivered' | 'read';
  files?: { name: string; type: string; url: string; size: string }[];
  isEmergency?: boolean;
}

interface MessageAreaProps {
  conversationId: string;
}

export default function MessageArea({ conversationId }: MessageAreaProps) {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simular mensajes de la conversación
    const mockMessages: Message[] = [
      {
        id: 'msg1',
        senderId: 'doc1',
        senderName: 'Dr. García',
        content: 'Hola, ¿cómo se siente después del tratamiento que le prescribí?',
        timestamp: '10:00 AM',
        type: 'text',
        status: 'read'
      },
      {
        id: 'msg2',
        senderId: 'patient1',
        senderName: 'Ana Martínez',
        content: 'Buenos días doctor. Me siento mucho mejor, pero tengo algunas dudas sobre la medicación.',
        timestamp: '10:15 AM',
        type: 'text',
        status: 'read'
      },
      {
        id: 'msg3',
        senderId: 'patient1',
        senderName: 'Ana Martínez',
        content: 'Le envío las fotos de cómo se ve la herida ahora',
        timestamp: '10:16 AM',
        type: 'image',
        status: 'read',
        files: [
          { name: 'herida_progreso.jpg', type: 'image', url: '#', size: '2.1 MB' }
        ]
      },
      {
        id: 'msg4',
        senderId: 'doc1',
        senderName: 'Dr. García',
        content: 'Excelente progreso. La herida está sanando correctamente. Continue con el tratamiento otros 5 días.',
        timestamp: '10:30 AM',
        type: 'text',
        status: 'delivered'
      },
      {
        id: 'msg5',
        senderId: 'patient1',
        senderName: 'Ana Martínez',
        content: '¡Doctor, necesito ayuda urgente! Siento mucho dolor en el pecho y dificultad para respirar',
        timestamp: '11:45 AM',
        type: 'emergency',
        status: 'sent',
        isEmergency: true
      }
    ];

    setMessages(mockMessages);
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const isCurrentUser = (senderId: string) => {
    return senderId === user?.id || 
           (user?.role === 'patient' && senderId.includes('patient')) ||
           (user?.role === 'doctor' && senderId.includes('doc'));
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => {
          const isMe = isCurrentUser(message.senderId);
          
          return (
            <div
              key={message.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${isMe ? 'order-1' : 'order-2'}`}>
                {/* Nombre del remitente */}
                {!isMe && (
                  <p className="text-xs text-gray-500 mb-1 ml-2">
                    {message.senderName}
                  </p>
                )}

                {/* Mensaje */}
                <div
                  className={`rounded-lg p-3 ${
                    message.isEmergency
                      ? 'bg-red-100 border-l-4 border-red-500'
                      : isMe
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* Indicador de emergencia */}
                  {message.isEmergency && (
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <Badge variant="destructive" className="text-xs">
                        EMERGENCIA
                      </Badge>
                    </div>
                  )}

                  {/* Contenido del mensaje */}
                  <p className={`text-sm ${
                    message.isEmergency ? 'text-red-800' : ''
                  }`}>
                    {message.content}
                  </p>

                  {/* Archivos adjuntos */}
                  {message.files && message.files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.files.map((file, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-2 rounded border ${
                            isMe ? 'bg-blue-400' : 'bg-gray-50'
                          }`}
                        >
                          {file.type === 'image' ? (
                            <Image className="h-4 w-4" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {file.name}
                            </p>
                            <p className="text-xs opacity-75">
                              {file.size}
                            </p>
                          </div>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Timestamp y estado */}
                  <div className={`flex items-center justify-between mt-2 text-xs ${
                    isMe ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <span>{message.timestamp}</span>
                    {isMe && (
                      <div className="flex items-center gap-1">
                        {getStatusIcon(message.status)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Indicador de escritura */}
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
            <div className="flex items-center gap-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-xs text-gray-500 ml-2">Dr. García está escribiendo...</span>
            </div>
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
