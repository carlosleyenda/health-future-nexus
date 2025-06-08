
import { supabase } from '@/integrations/supabase/client';

export interface ParticipantInvite {
  sessionId: string;
  userId: string;
  participantType: 'primary_doctor' | 'specialist' | 'nurse' | 'observer';
  invitedBy: string;
}

export class ParticipantsService {
  static async inviteParticipant(invite: ParticipantInvite) {
    try {
      const { data, error } = await supabase
        .from('video_call_participants')
        .insert({
          session_id: invite.sessionId,
          user_id: invite.userId,
          participant_type: invite.participantType,
          is_active: false, // Will be activated when they join
        })
        .select()
        .single();

      if (error) throw error;

      // Send notification to invited participant
      await this.sendParticipantNotification(invite);

      return data;
    } catch (error) {
      console.error('Error inviting participant:', error);
      throw error;
    }
  }

  static async joinSession(sessionId: string, userId: string) {
    try {
      const { data, error } = await supabase
        .from('video_call_participants')
        .update({
          is_active: true,
          joined_at: new Date().toISOString(),
        })
        .eq('session_id', sessionId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      // Notify other participants about the new joiner
      await this.broadcastParticipantUpdate(sessionId, 'joined', userId);

      return data;
    } catch (error) {
      console.error('Error joining session:', error);
      throw error;
    }
  }

  static async leaveSession(sessionId: string, userId: string) {
    try {
      const { data, error } = await supabase
        .from('video_call_participants')
        .update({
          is_active: false,
          left_at: new Date().toISOString(),
        })
        .eq('session_id', sessionId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      // Notify other participants about the departure
      await this.broadcastParticipantUpdate(sessionId, 'left', userId);

      return data;
    } catch (error) {
      console.error('Error leaving session:', error);
      throw error;
    }
  }

  static async getSessionParticipants(sessionId: string) {
    try {
      const { data, error } = await supabase
        .from('video_call_participants')
        .select('*')
        .eq('session_id', sessionId)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching participants:', error);
      return [];
    }
  }

  private static async sendParticipantNotification(invite: ParticipantInvite) {
    // This would integrate with the notification system
    console.log('Sending participant notification:', invite);
    
    // For now, we'll just log the notification
    // In a real implementation, this would send email/push notification
    try {
      // Note: Since we don't have a notifications table in the current schema,
      // we'll just log this for now. In a production system, you'd want to
      // either create a notifications table or integrate with an external service.
      console.log('Notification would be sent to:', invite.userId);
      console.log('Invitation details:', {
        sessionId: invite.sessionId,
        participantType: invite.participantType,
        invitedBy: invite.invitedBy
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  private static async broadcastParticipantUpdate(sessionId: string, action: string, userId: string) {
    try {
      await supabase
        .channel(`video-call-${sessionId}`)
        .send({
          type: 'broadcast',
          event: 'participant-update',
          payload: { action, userId, timestamp: Date.now() },
        });
    } catch (error) {
      console.error('Error broadcasting participant update:', error);
    }
  }
}
