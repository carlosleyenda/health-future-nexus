
import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Paperclip, Mic, Phone, Video, Shield, 
  Globe, Template, Users, AlertTriangle, 
  Clock, CheckCircle2, Eye, Download 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChatService } from '@/services/chat/chatService';
import { ChatMessage, ChatConversation, MessageTemplate, SmartReply } from '@/types/chat';
import { toast } from 'sonner';

interface MedicalChatProps {
  userId: string;
  userRole: 'doctor' | 'patient' | 'specialist' | 'admin';
}

export default function MedicalChat({ userId, userRole }: MedicalChatProps) {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [smartReplies, setSmartReplies] = useState<SmartReply[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadConversations();
    loadTemplates();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
      loadSmartReplies(selectedConversation);
      subscribeToMessages(selectedConversation);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    try {
      const data = await ChatService.getConversations();
      setConversations(data);
      if (data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0].id);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const data = await ChatService.getMessages(conversationId);
      setMessages(data.reverse());
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const loadTemplates = async () => {
    try {
      const data = await ChatService.getMessageTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const loadSmartReplies = async (conversationId: string) => {
    try {
      const data = await ChatService.getSmartReplies(conversationId);
      setSmartReplies(data);
    } catch (error) {
      console.error('Error loading smart replies:', error);
    }
  };

  const subscribeToMessages = (conversationId: string) => {
    return ChatService.subscribeToConversation(conversationId, (payload) => {
      if (payload.new) {
        setMessages(prev => [...prev, payload.new as ChatMessage]);
        scrollToBottom();
      }
    });
  };

  const sendMessage = async (content: string, priority: 'normal' | 'high' | 'emergency' = 'normal') => {
    if (!selectedConversation || !content.trim()) return;

    try {
      await ChatService.sendMessage(selectedConversation, content, 'text', priority);
      setMessageInput('');
      
      if (priority === 'emergency') {
        toast.success('Mensaje de emergencia enviado');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error al enviar mensaje');
    }
  };

  const useTemplate = async (template: MessageTemplate) => {
    setMessageInput(template.content);
    setShowTemplates(false);
  };

  const useSmartReply = async (reply: SmartReply) => {
    await ChatService.useSmartReply(reply.id);
    setMessageInput(reply.replyText);
    setSmartReplies(prev => prev.filter(r => r.id !== reply.id));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedConversation) return;

    try {
      const isMedical = file.type.includes('pdf') || file.name.includes('medical');
      await ChatService.uploadFile(file, selectedConversation, isMedical);
      toast.success('Archivo compartido exitosamente');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error al compartir archivo');
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    // TODO: Implement voice recording
    toast.info('Función de grabación de voz próximamente');
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    // TODO: Implement voice recording
  };

  const translateMessage = async (messageId: string) => {
    try {
      const translated = await ChatService.translateMessage(messageId, selectedLanguage);
      toast.success('Mensaje traducido');
      // TODO: Show translated content in UI
    } catch (error) {
      console.error('Error translating message:', error);
      toast.error('Error al traducir mensaje');
    }
  };

  const getMessageStatusIcon = (message: ChatMessage) => {
    // This would be enhanced with actual status data
    return <CheckCircle2 className="h-3 w-3 text-green-500" />;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'emergency':
        return <Badge variant="destructive" className="animate-pulse">EMERGENCIA</Badge>;
      case 'high':
        return <Badge variant="destructive">ALTA</Badge>;
      default:
        return null;
    }
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full flex">
      {/* Conversations sidebar */}
      <div className="w-80 border-r bg-gray-50">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Mensajería Médica</h2>
          <div className="flex items-center gap-2 mt-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-xs text-gray-600">Cifrado end-to-end</span>
          </div>
        </div>

        <ScrollArea className="h-full">
          <div className="p-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {conversation.type === 'emergency' ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : conversation.type === 'group' ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        'C'
                      )}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">
                        {conversation.title || `Conversación ${conversation.type}`}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatMessageTime(conversation.updatedAt)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {conversation.type}
                      </Badge>
                      {conversation.isEncrypted && (
                        <Shield className="h-3 w-3 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">
                  {conversations.find(c => c.id === selectedConversation)?.title || 'Conversación'}
                </h3>
                <Badge variant="outline">
                  {conversations.find(c => c.id === selectedConversation)?.type}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Globe className="h-4 w-4 mr-1" />
                      Idioma
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedLanguage('es')}>
                      Español
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedLanguage('en')}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedLanguage('fr')}>
                      Français
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === userId
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {getPriorityBadge(message.priority)}
                        {message.messageType === 'voice' && (
                          <Badge variant="outline" className="text-xs">
                            <Mic className="h-3 w-3 mr-1" />
                            Audio
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm">{message.content}</p>

                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>{formatMessageTime(message.createdAt)}</span>
                        <div className="flex items-center gap-1">
                          {getMessageStatusIcon(message)}
                          {message.senderId !== userId && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => translateMessage(message.id)}
                              className="h-4 w-4 p-0"
                            >
                              <Globe className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Smart replies */}
            {smartReplies.length > 0 && (
              <div className="p-2 border-t bg-gray-50">
                <div className="text-xs text-gray-600 mb-2">Respuestas sugeridas:</div>
                <div className="flex gap-2 flex-wrap">
                  {smartReplies.map((reply) => (
                    <Button
                      key={reply.id}
                      variant="outline"
                      size="sm"
                      onClick={() => useSmartReply(reply)}
                      className="text-xs"
                    >
                      {reply.replyText}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Message input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplates(!showTemplates)}
                >
                  <Template className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                  className={isRecording ? 'text-red-500' : ''}
                >
                  <Mic className="h-4 w-4" />
                </Button>

                <div className="flex-1 flex gap-2">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(messageInput);
                      }
                    }}
                    className="flex-1"
                  />

                  <Button onClick={() => sendMessage(messageInput)}>
                    <Send className="h-4 w-4" />
                  </Button>

                  {userRole === 'doctor' && (
                    <Button
                      variant="destructive"
                      onClick={() => sendMessage(messageInput, 'emergency')}
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Templates dropdown */}
              {showTemplates && (
                <div className="mt-2 p-2 border rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-600 mb-2">Plantillas:</div>
                  <div className="space-y-1">
                    {templates.slice(0, 5).map((template) => (
                      <Button
                        key={template.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => useTemplate(template)}
                        className="w-full justify-start text-xs"
                      >
                        {template.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Mensajería Médica Segura</h3>
              <p className="text-sm">Selecciona una conversación para comenzar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
