export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_attachments: {
        Row: {
          created_at: string
          encryption_key_id: string | null
          file_name: string
          file_size: number
          file_type: string
          id: string
          is_medical_document: boolean
          message_id: string
          storage_path: string
          virus_scan_status: string | null
        }
        Insert: {
          created_at?: string
          encryption_key_id?: string | null
          file_name: string
          file_size: number
          file_type: string
          id?: string
          is_medical_document?: boolean
          message_id: string
          storage_path: string
          virus_scan_status?: string | null
        }
        Update: {
          created_at?: string
          encryption_key_id?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          is_medical_document?: boolean
          message_id?: string
          storage_path?: string
          virus_scan_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_audit_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      chat_compliance_settings: {
        Row: {
          created_at: string
          id: string
          is_system_setting: boolean
          organization_id: string | null
          setting_key: string
          setting_value: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_system_setting?: boolean
          organization_id?: string | null
          setting_key: string
          setting_value: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_system_setting?: boolean
          organization_id?: string | null
          setting_key?: string
          setting_value?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          encryption_key_id: string | null
          id: string
          is_active: boolean
          is_encrypted: boolean
          metadata: Json | null
          retention_policy_days: number | null
          title: string | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          encryption_key_id?: string | null
          id?: string
          is_active?: boolean
          is_encrypted?: boolean
          metadata?: Json | null
          retention_policy_days?: number | null
          title?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          encryption_key_id?: string | null
          id?: string
          is_active?: boolean
          is_encrypted?: boolean
          metadata?: Json | null
          retention_policy_days?: number | null
          title?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_message_status: {
        Row: {
          id: string
          message_id: string
          status: string
          timestamp: string
          user_id: string
        }
        Insert: {
          id?: string
          message_id: string
          status: string
          timestamp?: string
          user_id: string
        }
        Update: {
          id?: string
          message_id?: string
          status?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_message_status_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_message_templates: {
        Row: {
          category: string
          content: string
          created_at: string
          created_by: string
          id: string
          is_active: boolean
          is_system_template: boolean
          title: string
          usage_count: number | null
          variables: Json | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          created_by: string
          id?: string
          is_active?: boolean
          is_system_template?: boolean
          title: string
          usage_count?: number | null
          variables?: Json | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          is_active?: boolean
          is_system_template?: boolean
          title?: string
          usage_count?: number | null
          variables?: Json | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string | null
          conversation_id: string
          created_at: string
          encrypted_content: string | null
          expires_at: string | null
          id: string
          is_deleted: boolean
          is_edited: boolean
          message_type: string
          metadata: Json | null
          priority: string | null
          reply_to_message_id: string | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          conversation_id: string
          created_at?: string
          encrypted_content?: string | null
          expires_at?: string | null
          id?: string
          is_deleted?: boolean
          is_edited?: boolean
          message_type: string
          metadata?: Json | null
          priority?: string | null
          reply_to_message_id?: string | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          conversation_id?: string
          created_at?: string
          encrypted_content?: string | null
          expires_at?: string | null
          id?: string
          is_deleted?: boolean
          is_edited?: boolean
          message_type?: string
          metadata?: Json | null
          priority?: string | null
          reply_to_message_id?: string | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_reply_to_message_id_fkey"
            columns: ["reply_to_message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_participants: {
        Row: {
          conversation_id: string
          id: string
          is_active: boolean
          joined_at: string
          left_at: string | null
          notification_preferences: Json | null
          role: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          is_active?: boolean
          joined_at?: string
          left_at?: string | null
          notification_preferences?: Json | null
          role: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          is_active?: boolean
          joined_at?: string
          left_at?: string | null
          notification_preferences?: Json | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_smart_replies: {
        Row: {
          confidence_score: number | null
          context_hash: string | null
          conversation_id: string
          created_at: string
          expires_at: string
          id: string
          is_used: boolean
          reply_text: string
          suggested_for_user_id: string
        }
        Insert: {
          confidence_score?: number | null
          context_hash?: string | null
          conversation_id: string
          created_at?: string
          expires_at?: string
          id?: string
          is_used?: boolean
          reply_text: string
          suggested_for_user_id: string
        }
        Update: {
          confidence_score?: number | null
          context_hash?: string | null
          conversation_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          is_used?: boolean
          reply_text?: string
          suggested_for_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_smart_replies_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_translations: {
        Row: {
          confidence_score: number | null
          created_at: string
          id: string
          message_id: string
          source_language: string
          target_language: string
          translated_content: string
          translation_service: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          message_id: string
          source_language: string
          target_language: string
          translated_content: string
          translation_service: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          message_id?: string
          source_language?: string
          target_language?: string
          translated_content?: string
          translation_service?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_translations_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_escalation_rules: {
        Row: {
          created_at: string
          created_by: string
          escalation_levels: Json
          id: string
          is_active: boolean
          rule_name: string
          trigger_conditions: Json
        }
        Insert: {
          created_at?: string
          created_by: string
          escalation_levels: Json
          id?: string
          is_active?: boolean
          rule_name: string
          trigger_conditions: Json
        }
        Update: {
          created_at?: string
          created_by?: string
          escalation_levels?: Json
          id?: string
          is_active?: boolean
          rule_name?: string
          trigger_conditions?: Json
        }
        Relationships: []
      }
      video_call_audit_log: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          session_id: string | null
          timestamp_in_call: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          timestamp_in_call?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          timestamp_in_call?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_call_audit_log_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "video_call_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      video_call_medical_notes: {
        Row: {
          content: string
          created_at: string | null
          doctor_id: string
          dosage: string | null
          id: string
          is_prescription: boolean | null
          medication_name: string | null
          note_type: string
          session_id: string | null
          timestamp_in_call: number
        }
        Insert: {
          content: string
          created_at?: string | null
          doctor_id: string
          dosage?: string | null
          id?: string
          is_prescription?: boolean | null
          medication_name?: string | null
          note_type: string
          session_id?: string | null
          timestamp_in_call: number
        }
        Update: {
          content?: string
          created_at?: string | null
          doctor_id?: string
          dosage?: string | null
          id?: string
          is_prescription?: boolean | null
          medication_name?: string | null
          note_type?: string
          session_id?: string | null
          timestamp_in_call?: number
        }
        Relationships: [
          {
            foreignKeyName: "video_call_medical_notes_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "video_call_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      video_call_participants: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          joined_at: string | null
          left_at: string | null
          participant_type: string
          session_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          left_at?: string | null
          participant_type: string
          session_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          left_at?: string | null
          participant_type?: string
          session_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_call_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "video_call_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      video_call_quality_metrics: {
        Row: {
          audio_bitrate: number | null
          connection_type: string | null
          created_at: string | null
          id: string
          jitter_ms: number | null
          latency_ms: number | null
          packet_loss_percentage: number | null
          session_id: string | null
          timestamp_in_call: number
          user_id: string
          video_bitrate: number | null
          video_resolution: string | null
        }
        Insert: {
          audio_bitrate?: number | null
          connection_type?: string | null
          created_at?: string | null
          id?: string
          jitter_ms?: number | null
          latency_ms?: number | null
          packet_loss_percentage?: number | null
          session_id?: string | null
          timestamp_in_call: number
          user_id: string
          video_bitrate?: number | null
          video_resolution?: string | null
        }
        Update: {
          audio_bitrate?: number | null
          connection_type?: string | null
          created_at?: string | null
          id?: string
          jitter_ms?: number | null
          latency_ms?: number | null
          packet_loss_percentage?: number | null
          session_id?: string | null
          timestamp_in_call?: number
          user_id?: string
          video_bitrate?: number | null
          video_resolution?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_call_quality_metrics_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "video_call_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      video_call_recordings: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          encryption_key: string | null
          file_size_bytes: number | null
          id: string
          is_backed_up: boolean | null
          recording_url: string
          session_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          encryption_key?: string | null
          file_size_bytes?: number | null
          id?: string
          is_backed_up?: boolean | null
          recording_url: string
          session_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          encryption_key?: string | null
          file_size_bytes?: number | null
          id?: string
          is_backed_up?: boolean | null
          recording_url?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_call_recordings_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "video_call_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      video_call_screenshots: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          screenshot_url: string
          session_id: string | null
          taken_by: string
          timestamp_in_call: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          screenshot_url: string
          session_id?: string | null
          taken_by: string
          timestamp_in_call: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          screenshot_url?: string
          session_id?: string | null
          taken_by?: string
          timestamp_in_call?: number
        }
        Relationships: [
          {
            foreignKeyName: "video_call_screenshots_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "video_call_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      video_call_sessions: {
        Row: {
          appointment_id: string
          created_at: string | null
          doctor_id: string
          duration_minutes: number | null
          emergency_escalated: boolean | null
          ended_at: string | null
          id: string
          patient_consent_recording: boolean | null
          patient_consent_transcript: boolean | null
          patient_id: string
          recording_url: string | null
          session_token: string
          started_at: string | null
          status: string
          transcript_url: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_id: string
          created_at?: string | null
          doctor_id: string
          duration_minutes?: number | null
          emergency_escalated?: boolean | null
          ended_at?: string | null
          id?: string
          patient_consent_recording?: boolean | null
          patient_consent_transcript?: boolean | null
          patient_id: string
          recording_url?: string | null
          session_token: string
          started_at?: string | null
          status?: string
          transcript_url?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_id?: string
          created_at?: string | null
          doctor_id?: string
          duration_minutes?: number | null
          emergency_escalated?: boolean | null
          ended_at?: string | null
          id?: string
          patient_consent_recording?: boolean | null
          patient_consent_transcript?: boolean | null
          patient_id?: string
          recording_url?: string | null
          session_token?: string
          started_at?: string | null
          status?: string
          transcript_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      video_call_transcripts: {
        Row: {
          confidence_score: number | null
          content: string
          created_at: string | null
          id: string
          session_id: string | null
          speaker_type: string
          timestamp_in_call: number
        }
        Insert: {
          confidence_score?: number | null
          content: string
          created_at?: string | null
          id?: string
          session_id?: string | null
          speaker_type: string
          timestamp_in_call: number
        }
        Update: {
          confidence_score?: number | null
          content?: string
          created_at?: string | null
          id?: string
          session_id?: string | null
          speaker_type?: string
          timestamp_in_call?: number
        }
        Relationships: [
          {
            foreignKeyName: "video_call_transcripts_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "video_call_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      video_call_whiteboard_data: {
        Row: {
          created_at: string | null
          created_by: string
          drawing_data: Json
          id: string
          session_id: string | null
          timestamp_in_call: number
        }
        Insert: {
          created_at?: string | null
          created_by: string
          drawing_data: Json
          id?: string
          session_id?: string | null
          timestamp_in_call: number
        }
        Update: {
          created_at?: string | null
          created_by?: string
          drawing_data?: Json
          id?: string
          session_id?: string | null
          timestamp_in_call?: number
        }
        Relationships: [
          {
            foreignKeyName: "video_call_whiteboard_data_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "video_call_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
