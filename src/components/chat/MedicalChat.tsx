
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/auth';
import ConversationList from './ConversationList';
import MessageArea from './MessageArea';
import MessageInput from './MessageInput';
import FileSharing from './FileSharing';
import QuickResponses from './QuickResponses';
import { 
  MessageSquare, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  Shield,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function MedicalChat() {
  const { conversationId } = useParams();
  const { user } = useAuthStore();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(conversationId || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFileSharing, setShowFileSharing] = useState(false);

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-gray-50">
      {/* Lista de conversaciones */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Mensajes Médicos
            </h2>
            <Badge variant="outline" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Encriptado
            </Badge>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ConversationList
          searchTerm={searchTerm}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
          userRole={user?.role || 'patient'}
        />
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header de conversación */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">Dr</span>
                </div>
                <div>
                  <h3 className="font-medium">Dr. García Rodríguez</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    En línea
                  </p>
                </div>
                <Badge variant="secondary" className="ml-2">
                  Consulta General
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Área de mensajes */}
            <MessageArea conversationId={selectedConversation} />

            {/* Respuestas rápidas para doctores */}
            {user?.role === 'doctor' && (
              <QuickResponses onSelectResponse={(response) => console.log(response)} />
            )}

            {/* Input de mensaje */}
            <MessageInput
              onSendMessage={(message, files) => console.log(message, files)}
              onToggleFileSharing={() => setShowFileSharing(!showFileSharing)}
            />

            {/* Panel de compartir archivos */}
            {showFileSharing && (
              <FileSharing
                onClose={() => setShowFileSharing(false)}
                onFileSelect={(files) => console.log(files)}
              />
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecciona una conversación
              </h3>
              <p className="text-gray-500">
                Elige una conversación para comenzar a chatear de forma segura
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
