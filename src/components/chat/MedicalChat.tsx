import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, Mic, Phone, Video, FileText, Shield, Globe, AlertTriangle } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  unreadMessages: number;
}

export default function MedicalChat() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Dr. García - Consulta',
      lastMessage: '¿Cómo te sientes hoy?',
      unreadMessages: 2,
    },
    {
      id: '2',
      name: 'Dra. López - Seguimiento',
      lastMessage: 'Recordatorio de cita',
      unreadMessages: 0,
    },
    {
      id: '3',
      name: 'Grupo - Pacientes Cardíacos',
      lastMessage: 'Nuevo artículo sobre prevención',
      unreadMessages: 5,
    },
  ];

  useEffect(() => {
    // Mock loading messages for selected conversation
    if (selectedConversation) {
      setIsLoading(true);
      setTimeout(() => {
        setMessages([
          {
            id: '1',
            content: 'Hola, ¿en qué puedo ayudarte hoy?',
            sender_id: 'doctor',
            created_at: new Date().toISOString(),
            message_type: 'text'
          },
          {
            id: '2',
            content: 'Tengo dolor de cabeza y fiebre.',
            sender_id: 'patient',
            created_at: new Date().toISOString(),
            message_type: 'text'
          },
        ]);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedConversation]);

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    setIsLoading(true);
    try {
      // Send message logic
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      const mockMessage = {
        id: Date.now().toString(),
        content: newMessage,
        sender_id: 'current-user',
        created_at: new Date().toISOString(),
        message_type: 'text',
        isNew: true
      };
      
      setMessages(prev => [...prev, mockMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Conversaciones</h2>
          <ul>
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                  selectedConversation === conversation.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleConversationSelect(conversation.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{conversation.name}</h3>
                    <p className="text-sm text-gray-500">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadMessages > 0 && (
                    <Badge className="rounded-full">
                      {conversation.unreadMessages}
                    </Badge>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dr. García - Consulta</h3>
                    <p className="text-sm text-gray-500">En línea</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <Shield className="h-3 w-3 mr-1" />
                    Cifrado
                  </Badge>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_id === 'current-user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender_id === 'current-user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender_id === 'current-user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Mic className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </div>
                <Button onClick={handleSendMessage} disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecciona una conversación
              </h3>
              <p className="text-gray-500">
                Elige una conversación para comenzar a chatear
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
