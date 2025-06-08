
import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Video, VideoOff, Mic, MicOff, Crown, Stethoscope, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ParticipantsService } from '@/services/participants/participantsService';

interface Participant {
  id: string;
  userId: string;
  participantType: 'primary_doctor' | 'specialist' | 'nurse' | 'observer';
  isActive: boolean;
  joinedAt?: string;
  isVideoEnabled?: boolean;
  isAudioEnabled?: boolean;
  name?: string;
}

interface ParticipantsListProps {
  sessionId: string;
  currentUserId: string;
  isDoctor: boolean;
}

export default function ParticipantsList({ sessionId, currentUserId, isDoctor }: ParticipantsListProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'specialist' | 'nurse' | 'observer'>('specialist');

  useEffect(() => {
    loadParticipants();
    
    // Listen for participant updates
    const channel = supabase
      .channel(`video-call-${sessionId}`)
      .on('broadcast', { event: 'participant-update' }, () => {
        loadParticipants();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const loadParticipants = async () => {
    try {
      const data = await ParticipantsService.getSessionParticipants(sessionId);
      setParticipants(data);
    } catch (error) {
      console.error('Error loading participants:', error);
    }
  };

  const handleInviteParticipant = async () => {
    if (!inviteEmail.trim()) return;

    try {
      // In a real implementation, you'd resolve email to userId
      const mockUserId = 'mock-user-id';
      
      await ParticipantsService.inviteParticipant({
        sessionId,
        userId: mockUserId,
        participantType: inviteRole,
        invitedBy: currentUserId,
      });

      setShowInviteDialog(false);
      setInviteEmail('');
      loadParticipants();
    } catch (error) {
      console.error('Error inviting participant:', error);
    }
  };

  const getParticipantIcon = (type: string) => {
    switch (type) {
      case 'primary_doctor': return <Crown className="h-4 w-4" />;
      case 'specialist': return <Stethoscope className="h-4 w-4" />;
      case 'nurse': return <Shield className="h-4 w-4" />;
      case 'observer': return <Users className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getParticipantBadgeColor = (type: string) => {
    switch (type) {
      case 'primary_doctor': return 'bg-purple-100 text-purple-800';
      case 'specialist': return 'bg-blue-100 text-blue-800';
      case 'nurse': return 'bg-green-100 text-green-800';
      case 'observer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participantes ({participants.length})
          </CardTitle>
          {isDoctor && (
            <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Invitar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invitar Especialista</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email del especialista</label>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="doctor@hospital.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rol</label>
                    <Select value={inviteRole} onValueChange={(value: any) => setInviteRole(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="specialist">Especialista</SelectItem>
                        <SelectItem value="nurse">Enfermero/a</SelectItem>
                        <SelectItem value="observer">Observador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleInviteParticipant} className="w-full">
                    Enviar Invitación
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {participants.map((participant) => (
          <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {getParticipantIcon(participant.participantType)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {participant.name || `Usuario ${participant.userId.slice(0, 8)}`}
                  </span>
                  {participant.userId === currentUserId && (
                    <Badge variant="secondary" className="text-xs">Tú</Badge>
                  )}
                </div>
                <Badge className={`text-xs ${getParticipantBadgeColor(participant.participantType)}`}>
                  {participant.participantType === 'primary_doctor' && 'Médico Principal'}
                  {participant.participantType === 'specialist' && 'Especialista'}
                  {participant.participantType === 'nurse' && 'Enfermero/a'}
                  {participant.participantType === 'observer' && 'Observador'}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <div className={`p-1 rounded ${participant.isVideoEnabled ? 'bg-green-100' : 'bg-red-100'}`}>
                {participant.isVideoEnabled ? (
                  <Video className="h-3 w-3 text-green-600" />
                ) : (
                  <VideoOff className="h-3 w-3 text-red-600" />
                )}
              </div>
              <div className={`p-1 rounded ${participant.isAudioEnabled ? 'bg-green-100' : 'bg-red-100'}`}>
                {participant.isAudioEnabled ? (
                  <Mic className="h-3 w-3 text-green-600" />
                ) : (
                  <MicOff className="h-3 w-3 text-red-600" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {participants.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No hay participantes adicionales</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
