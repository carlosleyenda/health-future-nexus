
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, ThumbsUp, ThumbsDown, User } from 'lucide-react';
import { usePersonalizedAI } from '@/hooks/usePersonalizedAI';
import { useAuthStore } from '@/store/auth';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  context?: string;
  interactionId?: string;
}

interface AIChatProps {
  context?: 'medical' | 'appointment' | 'general' | 'emergency';
  title?: string;
  placeholder?: string;
}

export default function AIChat({ 
  context = 'general',
  title = 'Asistente de IA',
  placeholder = 'Escribe tu pregunta aquí...'
}: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const { user } = useAuthStore();
  const { generateResponse, provideFeedback, isGenerating } = usePersonalizedAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await generateResponse.mutateAsync({
        context,
        userInput: userMessage.content
      });

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        type: 'ai',
        content: response,
        timestamp: new Date().toISOString(),
        context,
        interactionId: crypto.randomUUID()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        type: 'ai',
        content: 'Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.',
        timestamp: new Date().toISOString(),
        context: 'error'
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleFeedback = async (messageId: string, feedback: 'positive' | 'negative') => {
    const message = messages.find(m => m.id === messageId);
    if (!message?.interactionId) return;

    try {
      await provideFeedback.mutateAsync({
        interactionId: message.interactionId,
        feedback,
        effectiveness: feedback === 'positive' ? 9 : 4
      });

      // Actualizar mensaje para mostrar que se envió feedback
      setMessages(prev => prev.map(m => 
        m.id === messageId 
          ? { ...m, content: `${m.content}\n\n*Feedback enviado: ${feedback === 'positive' ? 'Útil' : 'No útil'}*` }
          : m
      ));
    } catch (error) {
      console.error('Error enviando feedback:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          {title}
          <Badge variant="outline" className="ml-auto capitalize">
            {context}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>¡Hola! Soy tu asistente de IA personalizado.</p>
              <p className="text-sm">Pregúntame lo que necesites saber.</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.type === 'ai' && (
                    <Brain className="h-4 w-4 mt-1 flex-shrink-0 text-blue-600" />
                  )}
                  {message.type === 'user' && (
                    <User className="h-4 w-4 mt-1 flex-shrink-0 text-blue-100" />
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* Botones de feedback para mensajes de IA */}
                {message.type === 'ai' && message.context !== 'error' && (
                  <div className="flex gap-2 mt-2 pt-2 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback(message.id, 'positive')}
                      className="h-6 px-2"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback(message.id, 'negative')}
                      className="h-6 px-2"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-blue-600 animate-pulse" />
                  <p className="text-gray-600">Pensando...</p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Área de entrada */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="resize-none"
              rows={2}
              disabled={isGenerating}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isGenerating}
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {user && (
            <p className="text-xs text-gray-500 mt-2">
              Personalizado para: {user.firstName} ({user.role})
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
