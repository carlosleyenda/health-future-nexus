
// Chat-related type definitions

export interface ChatConversation {
  id: string;
  title: string;
  type: 'direct' | 'group' | 'broadcast' | 'emergency';
  description?: string;
  isEncrypted: boolean;
  createdBy: string;
  isActive: boolean;
  encryptionKeyId?: string;
  retentionPolicyDays?: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ChatParticipant {
  id: string;
  conversationId: string;
  userId: string;
  role: 'admin' | 'moderator' | 'participant' | 'read_only';
  joinedAt: string;
  leftAt?: string;
  isActive: boolean;
  notificationPreferences?: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content?: string;
  messageType: 'text' | 'image' | 'file' | 'voice' | 'video' | 'system' | 'template';
  replyToMessageId?: string;
  isEdited: boolean;
  isDeleted: boolean;
  priority: 'low' | 'normal' | 'high' | 'emergency';
  encryptedContent?: string;
  expiresAt?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface MessageTemplate {
  id: string;
  title: string;
  content: string;
  category: string;
  variables: string[];
  isSystemTemplate: boolean;
  createdBy: string;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface SmartReply {
  id: string;
  conversationId: string;
  replyText: string;
  confidenceScore: number;
  contextHash: string;
  suggestedForUserId: string;
  isUsed: boolean;
  expiresAt: string;
  createdAt: string;
}

export interface MessageStatus {
  id: string;
  messageId: string;
  userId: string;
  status: 'sent' | 'delivered' | 'read';
  timestamp: string;
}

export interface ChatAttachment {
  id: string;
  messageId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  storagePath: string;
  isMedicalDocument: boolean;
  encryptionKeyId?: string;
  virusScanStatus?: 'pending' | 'clean' | 'infected';
  createdAt: string;
}
