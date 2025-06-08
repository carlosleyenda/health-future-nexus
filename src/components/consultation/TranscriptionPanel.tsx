
import React, { useState, useEffect, useRef } from 'react';
import { FileText, Download, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TranscriptionService } from '@/services/transcription/transcriptionService';

interface TranscriptEntry {
  id: string;
  speakerType: 'doctor' | 'patient' | 'specialist' | 'system';
  content: string;
  timestampInCall: number;
  confidenceScore: number;
  createdAt: string;
}

interface TranscriptionPanelProps {
  sessionId: string;
  isRecording: boolean;
}

export default function TranscriptionPanel({ sessionId, isRecording }: TranscriptionPanelProps) {
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpeaker, setFilterSpeaker] = useState<string>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadTranscript();
    
    if (isRecording) {
      // Poll for new transcripts every 2 seconds during recording
      const interval = setInterval(loadTranscript, 2000);
      return () => clearInterval(interval);
    }
  }, [sessionId, isRecording]);

  useEffect(() => {
    // Auto-scroll to bottom when new content is added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const loadTranscript = async () => {
    try {
      const data = await TranscriptionService.getSessionTranscript(sessionId);
      setTranscript(data);
    } catch (error) {
      console.error('Error loading transcript:', error);
    }
  };

  const filteredTranscript = transcript.filter(entry => {
    const matchesSearch = entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeaker = filterSpeaker === 'all' || entry.speakerType === filterSpeaker;
    return matchesSearch && matchesSpeaker;
  });

  const formatTimestamp = (timestampInCall: number) => {
    const minutes = Math.floor(timestampInCall / 60);
    const seconds = timestampInCall % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getSpeakerColor = (speakerType: string) => {
    switch (speakerType) {
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'patient': return 'bg-green-100 text-green-800';
      case 'specialist': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportTranscript = () => {
    const content = transcript
      .map(entry => `[${formatTimestamp(entry.timestampInCall)}] ${entry.speakerType.toUpperCase()}: ${entry.content}`)
      .join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcripcion-${sessionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Transcripción
            {isRecording && (
              <Badge variant="destructive" className="animate-pulse">
                <div className="h-2 w-2 bg-white rounded-full mr-1" />
                EN VIVO
              </Badge>
            )}
          </CardTitle>
          <Button onClick={exportTranscript} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Exportar
          </Button>
        </div>
        
        <div className="flex gap-2 mt-3">
          <div className="flex-1">
            <Input
              placeholder="Buscar en transcripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8"
            />
          </div>
          <select
            value={filterSpeaker}
            onChange={(e) => setFilterSpeaker(e.target.value)}
            className="px-2 py-1 border rounded text-sm"
          >
            <option value="all">Todos</option>
            <option value="doctor">Médico</option>
            <option value="patient">Paciente</option>
            <option value="specialist">Especialista</option>
          </select>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="space-y-3">
            {filteredTranscript.map((entry) => (
              <div key={entry.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getSpeakerColor(entry.speakerType)}>
                      {entry.speakerType === 'doctor' && 'Médico'}
                      {entry.speakerType === 'patient' && 'Paciente'}
                      {entry.speakerType === 'specialist' && 'Especialista'}
                      {entry.speakerType === 'system' && 'Sistema'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(entry.timestampInCall)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Confianza: {Math.round(entry.confidenceScore * 100)}%
                  </div>
                </div>
                <p className="text-sm">{entry.content}</p>
              </div>
            ))}
            
            {filteredTranscript.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No hay transcripción disponible</p>
                {isRecording && (
                  <p className="text-xs mt-1">La transcripción aparecerá cuando se detecte habla</p>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
