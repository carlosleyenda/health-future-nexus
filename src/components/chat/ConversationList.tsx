
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  AlertTriangle, 
  Clock, 
  CheckCheck, 
  Check,
  Plus,
  Filter
} from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  priority: 'normal' | 'high' | 'emergency';
  category: string;
  messageStatus: 'sent' | 'delivered' | 'read';
}

interface ConversationListProps {
  searchTerm: string;
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
  userRole: string;
}

export default function ConversationList({ 
  searchTerm, 
  selectedConversation, 
  onSelectConversation, 
  userRole 
}: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simular conversaciones según el rol del usuario
    const mockConversations: Conversation[] = userRole === 'patient' ? [
      {
        id: 'conv1',
        name: 'Dr. García Rodríguez',
        role: 'Cardiólogo',
        avatar: 'DG',
        lastMessage: 'Sus resultados se ven bien, continúe con el tratamiento',
        timestamp: '10:30 AM',
        unreadCount: 0,
        isOnline: true,
        priority: 'normal',
        category: 'Seguimiento',
        messageStatus: 'read'
      },
      {
        id: 'conv2',
        name: 'Dr. María López',
        role: 'Medicina General',
        avatar: 'ML',
        lastMessage: 'Necesito revisar su presión arterial urgentemente',
        timestamp: 'Ayer',
        unreadCount: 2,
        isOnline: false,
        priority: 'emergency',
        category: 'Emergencia',
        messageStatus: 'delivered'
      },
      {
        id: 'conv3',
        name: 'Dr. Carlos Mendez',
        role: 'Dermatólogo',
        avatar: 'CM',
        lastMessage: '¿Cómo ha evolucionado la lesión?',
        timestamp: '2 días',
        unreadCount: 1,
        isOnline: true,
        priority: 'high',
        category: 'Consulta',
        messageStatus: 'sent'
      }
    ] : [
      {
        id: 'conv1',
        name: 'Ana Martínez',
        role: 'Paciente',
        avatar: 'AM',
        lastMessage: 'Doctor, ¿cuándo debo tomar la medicación?',
        timestamp: '15 min',
        unreadCount: 1,
        isOnline: true,
        priority: 'normal',
        category: 'Medicamentos',
        messageStatus: 'delivered'
      },
      {
        id: 'conv2',
        name: 'Roberto Silva',
        role: 'Paciente',
        avatar: 'RS',
        lastMessage: 'Siento dolor en el pecho',
        timestamp: '1 hora',
        unreadCount: 3,
        isOnline: true,
        priority: 'emergency',
        category: 'Emergencia',
        messageStatus: 'sent'
      },
      {
        id: 'conv3',
        name: 'Carmen Torres',
        role: 'Paciente',
        avatar: 'CT',
        lastMessage: 'Gracias por la consulta, me siento mejor',
        timestamp: 'Ayer',
        unreadCount: 0,
        isOnline: false,
        priority: 'normal',
        category: 'Seguimiento',
        messageStatus: 'read'
      }
    ];

    setConversations(mockConversations);
  }, [userRole]);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'unread') return matchesSearch && conv.unreadCount > 0;
    if (filter === 'emergency') return matchesSearch && conv.priority === 'emergency';
    return matchesSearch;
  });

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'emergency':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getMessageStatusIcon = (status: string) => {
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

  return (
    <div className="flex flex-col h-full">
      {/* Filtros */}
      <div className="p-3 border-b flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Todos
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
        >
          No leídos
        </Button>
        <Button
          variant={filter === 'emergency' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('emergency')}
        >
          <AlertTriangle className="h-3 w-3 mr-1" />
          Urgente
        </Button>
      </div>

      {/* Lista de conversaciones */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {conversation.avatar}
                    </span>
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm truncate">
                        {conversation.name}
                      </h4>
                      {getPriorityIcon(conversation.priority)}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">
                        {conversation.timestamp}
                      </span>
                      {getMessageStatusIcon(conversation.messageStatus)}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-2">
                    {conversation.role}
                  </p>

                  <p className="text-sm text-gray-700 truncate mb-2">
                    {conversation.lastMessage}
                  </p>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {conversation.category}
                    </Badge>
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredConversations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                No se encontraron conversaciones
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Botón nueva conversación */}
      <div className="p-3 border-t">
        <Button className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Conversación
        </Button>
      </div>
    </div>
  );
}
