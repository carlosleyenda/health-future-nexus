import { supabase } from '@/integrations/supabase/client';
import { ChatConversation, ChatMessage, ChatParticipant, MessageTemplate, SmartReply } from '@/types/chat';

export class ChatService {
  // Conversation management
  static async createConversation(
    type: 'direct' | 'group' | 'broadcast' | 'emergency',
    participants: string[],
    title?: string,
    description?: string
  ): Promise<ChatConversation> {
    try {
      const { data: conversation, error } = await supabase
        .from('chat_conversations')
        .insert({
          type,
          title,
          description,
          created_by: (await supabase.auth.getUser()).data.user?.id,
          is_encrypted: true,
        })
        .select()
        .single();

      if (error) throw error;

      // Add participants
      for (const userId of participants) {
        await this.addParticipant(conversation.id, userId, 'participant');
      }

      return conversation;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  }

  static async getConversations(): Promise<ChatConversation[]> {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select(`
          *,
          chat_participants!inner(*)
        `)
        .eq('chat_participants.user_id', (await supabase.auth.getUser()).data.user?.id)
        .eq('chat_participants.is_active', true)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
  }

  // Participant management
  static async addParticipant(
    conversationId: string,
    userId: string,
    role: 'admin' | 'moderator' | 'participant' | 'read_only' = 'participant'
  ): Promise<ChatParticipant> {
    try {
      const { data, error } = await supabase
        .from('chat_participants')
        .insert({
          conversation_id: conversationId,
          user_id: userId,
          role,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding participant:', error);
      throw error;
    }
  }

  static async removeParticipant(conversationId: string, userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('chat_participants')
        .update({ 
          is_active: false,
          left_at: new Date().toISOString()
        })
        .eq('conversation_id', conversationId)
        .eq('user_id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing participant:', error);
      throw error;
    }
  }

  // Message management
  static async sendMessage(
    conversationId: string,
    content: string,
    messageType: 'text' | 'voice' | 'file' | 'image' | 'video' | 'template' = 'text',
    priority: 'low' | 'normal' | 'high' | 'emergency' = 'normal',
    replyToMessageId?: string,
    metadata?: Record<string, any>
  ): Promise<ChatMessage> {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.data.user.id,
          message_type: messageType,
          content,
          priority,
          reply_to_message_id: replyToMessageId,
          metadata: metadata || {}
        })
        .select()
        .single();

      if (error) throw error;

      // Update conversation timestamp
      await supabase
        .from('chat_conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      // Log audit trail
      await this.logAuditEvent('message_sent', 'message', data.id, {
        conversation_id: conversationId,
        message_type: messageType,
        priority
      });

      // Handle emergency messages
      if (priority === 'emergency') {
        await this.handleEmergencyMessage(conversationId, data.id);
      }

      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  static async getMessages(conversationId: string, limit = 50, offset = 0): Promise<ChatMessage[]> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  static async markMessageAsRead(messageId: string): Promise<void> {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { error } = await supabase
        .from('chat_message_status')
        .upsert({
          message_id: messageId,
          user_id: user.data.user.id,
          status: 'read'
        });

      if (error) throw error;

      // Log audit trail
      await this.logAuditEvent('message_read', 'message', messageId);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }

  // Template management
  static async getMessageTemplates(category?: string): Promise<MessageTemplate[]> {
    try {
      let query = supabase
        .from('chat_message_templates')
        .select('*')
        .eq('is_active', true);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('usage_count', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching templates:', error);
      return [];
    }
  }

  static async createTemplate(
    category: string,
    title: string,
    content: string,
    variables: string[] = []
  ): Promise<MessageTemplate> {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('chat_message_templates')
        .insert({
          created_by: user.data.user.id,
          category,
          title,
          content,
          variables
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  }

  // Smart replies
  static async getSmartReplies(conversationId: string): Promise<SmartReply[]> {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return [];

      const { data, error } = await supabase
        .from('chat_smart_replies')
        .select('*')
        .eq('conversation_id', conversationId)
        .eq('suggested_for_user_id', user.data.user.id)
        .eq('is_used', false)
        .gt('expires_at', new Date().toISOString())
        .order('confidence_score', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching smart replies:', error);
      return [];
    }
  }

  static async useSmartReply(replyId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('chat_smart_replies')
        .update({ is_used: true })
        .eq('id', replyId);

      if (error) throw error;
    } catch (error) {
      console.error('Error using smart reply:', error);
    }
  }

  // File sharing
  static async uploadFile(
    file: File,
    conversationId: string,
    isMedicalDocument = false
  ): Promise<string> {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `chat-files/${conversationId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('chat-attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save file metadata
      const { data, error } = await supabase
        .from('chat_attachments')
        .insert({
          message_id: '', // Will be updated when message is created
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          storage_path: filePath,
          is_medical_document: isMedicalDocument
        })
        .select()
        .single();

      if (error) throw error;

      return data.id;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Translation services
  static async translateMessage(
    messageId: string,
    targetLanguage: string
  ): Promise<string> {
    try {
      // Check if translation already exists
      const { data: existingTranslation } = await supabase
        .from('chat_translations')
        .select('translated_content')
        .eq('message_id', messageId)
        .eq('target_language', targetLanguage)
        .single();

      if (existingTranslation) {
        return existingTranslation.translated_content;
      }

      // Get original message
      const { data: message } = await supabase
        .from('chat_messages')
        .select('content')
        .eq('id', messageId)
        .single();

      if (!message) throw new Error('Message not found');

      // Call translation service (placeholder - would integrate with actual service)
      const translatedContent = await this.callTranslationService(
        message.content,
        targetLanguage
      );

      // Save translation
      await supabase
        .from('chat_translations')
        .insert({
          message_id: messageId,
          source_language: 'auto',
          target_language: targetLanguage,
          translated_content: translatedContent,
          translation_service: 'google'
        });

      return translatedContent;
    } catch (error) {
      console.error('Error translating message:', error);
      throw error;
    }
  }

  // Emergency handling
  private static async handleEmergencyMessage(conversationId: string, messageId: string): Promise<void> {
    try {
      // Get escalation rules
      const { data: rules } = await supabase
        .from('emergency_escalation_rules')
        .select('*')
        .eq('is_active', true);

      // Trigger escalation based on rules
      for (const rule of rules || []) {
        // This would implement the actual escalation logic
        console.log('Emergency escalation triggered:', rule);
      }

      // Log emergency event
      await this.logAuditEvent('emergency_message', 'message', messageId, {
        conversation_id: conversationId,
        escalation_triggered: true
      });
    } catch (error) {
      console.error('Error handling emergency message:', error);
    }
  }

  // Audit logging
  private static async logAuditEvent(
    action: string,
    resourceType: string,
    resourceId?: string,
    details?: Record<string, any>
  ): Promise<void> {
    try {
      const user = await supabase.auth.getUser();
      
      await supabase
        .from('chat_audit_log')
        .insert({
          user_id: user.data.user?.id,
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          details: details || {}
        });
    } catch (error) {
      console.error('Error logging audit event:', error);
    }
  }

  // Helper methods
  private static async callTranslationService(text: string, targetLanguage: string): Promise<string> {
    // Placeholder for translation service integration
    // In production, this would call Google Translate, Azure Translator, etc.
    return `[Translated to ${targetLanguage}] ${text}`;
  }

  // Real-time subscriptions
  static subscribeToConversation(conversationId: string, callback: (message: ChatMessage) => void) {
    return supabase
      .channel(`chat-${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`
      }, callback)
      .subscribe();
  }

  static subscribeToMessageStatus(messageId: string, callback: (status: any) => void) {
    return supabase
      .channel(`message-status-${messageId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chat_message_status',
        filter: `message_id=eq.${messageId}`
      }, callback)
      .subscribe();
  }

  // Helper methods for mapping database objects to TypeScript interfaces
  private static mapConversationFromDb(data: any): ChatConversation {
    return {
      id: data.id,
      type: data.type,
      title: data.title,
      description: data.description,
      createdBy: data.created_by,
      isEncrypted: data.is_encrypted,
      encryptionKeyId: data.encryption_key_id,
      retentionPolicyDays: data.retention_policy_days,
      isActive: data.is_active,
      metadata: data.metadata,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  private static mapParticipantFromDb(data: any): ChatParticipant {
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

  private static mapMessageFromDb(data: any): ChatMessage {
    return {
      id: data.id,
      conversationId: data.conversation_id,
      senderId: data.sender_id,
      messageType: data.message_type,
      content: data.content,
      encryptedContent: data.encrypted_content,
      metadata: data.metadata,
      replyToMessageId: data.reply_to_message_id,
      isEdited: data.is_edited,
      isDeleted: data.is_deleted,
      priority: data.priority,
      expiresAt: data.expires_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  private static mapTemplateFromDb(data: any): MessageTemplate {
    return {
      id: data.id,
      createdBy: data.created_by,
      category: data.category,
      title: data.title,
      content: data.content,
      variables: data.variables,
      isSystemTemplate: data.is_system_template,
      usageCount: data.usage_count,
      isActive: data.is_active,
      createdAt: data.created_at
    };
  }

  private static mapSmartReplyFromDb(data: any): SmartReply {
    return {
      id: data.id,
      conversationId: data.conversation_id,
      suggestedForUserId: data.suggested_for_user_id,
      replyText: data.reply_text,
      confidenceScore: data.confidence_score,
      contextHash: data.context_hash,
      isUsed: data.is_used,
      createdAt: data.created_at,
      expiresAt: data.expires_at
    };
  }
}
