
export interface ChatConversation {
  id: string;
  type: 'direct' | 'group' | 'broadcast' | 'emergency';
  title?: string;
  description?: string;
  createdBy: string;
  isEncrypted: boolean;
  encryptionKeyId?: string;
  retentionPolicyDays: number;
  isActive: boolean;
  metadata: Record<string, any>;
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
  notificationPreferences: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  messageType: 'text' | 'voice' | 'file' | 'image' | 'video' | 'template' | 'system';
  content?: string;
  encryptedContent?: string;
  metadata: Record<string, any>;
  replyToMessageId?: string;
  isEdited: boolean;
  isDeleted: boolean;
  priority: 'low' | 'normal' | 'high' | 'emergency';
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageStatus {
  id: string;
  messageId: string;
  userId: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
}

export interface MessageTemplate {
  id: string;
  createdBy: string;
  category: string;
  title: string;
  content: string;
  variables: string[];
  isSystemTemplate: boolean;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface ChatAttachment {
  id: string;
  messageId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  storagePath: string;
  encryptionKeyId?: string;
  virusScanStatus: 'pending' | 'clean' | 'infected' | 'failed';
  isMedicalDocument: boolean;
  createdAt: string;
}

export interface SmartReply {
  id: string;
  conversationId: string;
  suggestedForUserId: string;
  replyText: string;
  confidenceScore?: number;
  contextHash?: string;
  isUsed: boolean;
  createdAt: string;
  expiresAt: string;
}

export interface ChatTranslation {
  id: string;
  messageId: string;
  sourceLanguage: string;
  targetLanguage: string;
  translatedContent: string;
  translationService: string;
  confidenceScore?: number;
  createdAt: string;
}

export interface EmergencyEscalationRule {
  id: string;
  createdBy: string;
  ruleName: string;
  triggerConditions: Record<string, any>;
  escalationLevels: Record<string, any>;
  isActive: boolean;
  createdAt: string;
}

export interface ChatAuditLog {
  id: string;
  userId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  details: Record<string, any>;
  createdAt: string;
}
