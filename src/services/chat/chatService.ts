
import { supabase } from '@/integrations/supabase/client';
import { 
  ChatConversation, 
  ChatMessage, 
  ChatParticipant, 
  MessageTemplate, 
  SmartReply,
  MessageStatus 
} from '@/types/chat';

export class ChatService {
  // Conversation management
  static async createConversation(
    title: string,
    type: 'direct' | 'group' | 'broadcast' | 'emergency',
    description?: string,
    isEncrypted: boolean = true
  ): Promise<ChatConversation> {
    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({
        title,
        type,
        description,
        is_encrypted: isEncrypted,
        created_by: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      type: data.type,
      description: data.description,
      isEncrypted: data.is_encrypted,
      createdBy: data.created_by,
      isActive: data.is_active,
      encryptionKeyId: data.encryption_key_id,
      retentionPolicyDays: data.retention_policy_days,
      metadata: data.metadata,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  static async getUserConversations(userId: string): Promise<ChatConversation[]> {
    const { data, error } = await supabase
      .from('chat_conversations')
      .select(`
        *,
        chat_participants!inner(user_id)
      `)
      .eq('chat_participants.user_id', userId)
      .eq('is_active', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    
    return data.map(conv => ({
      id: conv.id,
      title: conv.title,
      type: conv.type,
      description: conv.description,
      isEncrypted: conv.is_encrypted,
      createdBy: conv.created_by,
      isActive: conv.is_active,
      encryptionKeyId: conv.encryption_key_id,
      retentionPolicyDays: conv.retention_policy_days,
      metadata: conv.metadata,
      createdAt: conv.created_at,
      updatedAt: conv.updated_at
    }));
  }

  // Participant management
  static async addParticipant(
    conversationId: string,
    userId: string,
    role: 'admin' | 'moderator' | 'member' = 'member'
  ): Promise<ChatParticipant> {
    const { data, error } = await supabase
      .from('chat_participants')
      .insert({
        conversation_id: conversationId,
        user_id: userId,
        role
      })
      .select()
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      conversationId: data.conversation_id,
      userId: data.user_id,
      role: data.role,
      joinedAt: data.joined_at,
      leftAt: data.left_at,
      isActive: data.is_active,
      notificationPreferences: data.notification_preferences
    };
  }

  // Message management
  static async sendMessage(
    conversationId: string,
    content: string,
    messageType: 'text' | 'image' | 'file' | 'voice' | 'video' | 'location' = 'text',
    replyToMessageId?: string,
    priority: 'low' | 'normal' | 'high' | 'urgent' = 'normal'
  ): Promise<ChatMessage> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.user.id,
        content,
        message_type: messageType,
        reply_to_message_id: replyToMessageId,
        priority
      })
      .select()
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      conversationId: data.conversation_id,
      senderId: data.sender_id,
      content: data.content,
      messageType: data.message_type,
      replyToMessageId: data.reply_to_message_id,
      isEdited: data.is_edited,
      isDeleted: data.is_deleted,
      priority: data.priority,
      encryptedContent: data.encrypted_content,
      expiresAt: data.expires_at,
      metadata: data.metadata,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  static async getConversationMessages(
    conversationId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    
    return data.map(msg => ({
      id: msg.id,
      conversationId: msg.conversation_id,
      senderId: msg.sender_id,
      content: msg.content,
      messageType: msg.message_type,
      replyToMessageId: msg.reply_to_message_id,
      isEdited: msg.is_edited,
      isDeleted: msg.is_deleted,
      priority: msg.priority,
      encryptedContent: msg.encrypted_content,
      expiresAt: msg.expires_at,
      metadata: msg.metadata,
      createdAt: msg.created_at,
      updatedAt: msg.updated_at
    }));
  }

  // Message templates
  static async getMessageTemplates(category?: string): Promise<MessageTemplate[]> {
    let query = supabase
      .from('chat_message_templates')
      .select('*')
      .eq('is_active', true);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('usage_count', { ascending: false });

    if (error) throw error;
    
    return data.map(template => ({
      id: template.id,
      title: template.title,
      content: template.content,
      category: template.category,
      variables: template.variables,
      isSystemTemplate: template.is_system_template,
      createdBy: template.created_by,
      usageCount: template.usage_count,
      isActive: template.is_active,
      createdAt: template.created_at
    }));
  }

  // Smart replies
  static async getSmartReplies(conversationId: string, userId: string): Promise<SmartReply[]> {
    const { data, error } = await supabase
      .from('chat_smart_replies')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('suggested_for_user_id', userId)
      .eq('is_used', false)
      .gt('expires_at', new Date().toISOString())
      .order('confidence_score', { ascending: false })
      .limit(3);

    if (error) throw error;
    
    return data.map(reply => ({
      id: reply.id,
      conversationId: reply.conversation_id,
      replyText: reply.reply_text,
      confidenceScore: reply.confidence_score,
      contextHash: reply.context_hash,
      suggestedForUserId: reply.suggested_for_user_id,
      isUsed: reply.is_used,
      expiresAt: reply.expires_at,
      createdAt: reply.created_at
    }));
  }

  // File attachments
  static async uploadAttachment(
    messageId: string,
    file: File,
    isMedicalDocument: boolean = false
  ): Promise<void> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${messageId}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('chat-attachments')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { error: dbError } = await supabase
      .from('chat_attachments')
      .insert({
        message_id: messageId,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        storage_path: fileName,
        is_medical_document: isMedicalDocument
      });

    if (dbError) throw dbError;
  }

  // Message status tracking
  static async updateMessageStatus(
    messageId: string,
    status: 'sent' | 'delivered' | 'read'
  ): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('chat_message_status')
      .upsert({
        message_id: messageId,
        user_id: user.user.id,
        status
      });

    if (error) throw error;
  }

  // Real-time subscriptions
  static subscribeToConversation(conversationId: string, callback: (message: any) => void) {
    return supabase
      .channel(`conversation-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        callback
      )
      .subscribe();
  }

  static subscribeToMessageStatus(messageId: string, callback: (status: any) => void) {
    return supabase
      .channel(`message-status-${messageId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_message_status',
          filter: `message_id=eq.${messageId}`
        },
        callback
      )
      .subscribe();
  }
}
