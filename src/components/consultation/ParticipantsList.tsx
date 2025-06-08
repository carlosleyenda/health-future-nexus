
import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Phone, Video, MoreVertical, Crown, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { ParticipantsService } from '@/services/participants/participantsService';

interface Participant {
  id: string;
  userId: string;
  participantType: 'primary_doctor' | 'specialist' | 'nurse' | 'observer';
  isActive: boolean;
  joinedAt?: string;
  leftAt?: string;
}

interface ParticipantsListProps {
  sessionId: string;
  currentUserId: string;
  userRole: 'doctor' | 'patient';
  onInviteParticipant?: () => void;
}

export default function ParticipantsList({ 
  sessionId, 
  currentUserId, 
  userRole, 
  onInviteParticipant 
}: ParticipantsListProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParticipants();
    subscribeToUpdates();
  }, [sessionId]);

  const loadParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from('video_call_participants')
        .select('*')
        .eq('session_id', sessionId);

      if (error) throw error;
      
      // Transform data to match our interface
      const transformedData = data.map(p => ({
        id: p.id,
        userId: p.user_id,
        participantType: p.participant_type as Participant['participantType'],
        isActive: p.is_active || false,
        joinedAt: p.joined_at || undefined,
        leftAt: p.left_at || undefined,
      }));
      
      setParticipants(transformedData);
    } catch (error) {
      console.error('Error loading participants:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToUpdates = () => {
    const channel = supabase
      .channel(`participants-${sessionId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'video_call_participants',
        filter: `session_id=eq.${sessionId}`
      }, () => {
        loadParticipants();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const removeParticipant = async (participantId: string) => {
    try {
      await ParticipantsService.leaveSession(sessionId, participantId);
    } catch (error) {
      console.error('Error removing participant:', error);
    }
  };

  const getParticipantIcon = (type: string) => {
    switch (type) {
      case 'primary_doctor': return <Crown className="h-4 w-4" />;
      case 'specialist': return <Shield className="h-4 w-4" />;
      case 'nurse': return <Users className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getParticipantLabel = (type: string) => {
    switch (type) {
      case 'primary_doctor': return 'Médico Principal';
      case 'specialist': return 'Especialista';
      case 'nurse': return 'Enfermero/a';
      case 'observer': return 'Observador';
      default: return 'Participante';
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Cargando...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participantes ({participants.length})
          </CardTitle>
          {userRole === 'doctor' && onInviteParticipant && (
            <Button onClick={onInviteParticipant} size="sm" variant="outline">
              <UserPlus className="h-4 w-4 mr-1" />
              Invitar
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {participants.map((participant) => (
          <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {getParticipantIcon(participant.participantType)}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">
                    Usuario {participant.userId.slice(0, 8)}
                  </span>
                  <Badge className={getStatusColor(participant.isActive)}>
                    {participant.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  {getParticipantLabel(participant.participantType)}
                </div>
                {participant.joinedAt && (
                  <div className="text-xs text-gray-400">
                    Unido: {new Date(participant.joinedAt).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                <Phone className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                <Video className="h-3 w-3" />
              </Button>
              
              {userRole === 'doctor' && participant.userId !== currentUserId && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => removeParticipant(participant.userId)}
                      className="text-red-600"
                    >
                      Remover de la sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        ))}
        
        {participants.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No hay participantes en esta sesión</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
