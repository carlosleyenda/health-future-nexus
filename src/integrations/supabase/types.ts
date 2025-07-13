export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
      currency_rates: {
        Row: {
          base_currency: string
          created_at: string
          id: string
          provider: string
          rate: number
          target_currency: string
          valid_at: string
        }
        Insert: {
          base_currency: string
          created_at?: string
          id?: string
          provider: string
          rate: number
          target_currency: string
          valid_at?: string
        }
        Update: {
          base_currency?: string
          created_at?: string
          id?: string
          provider?: string
          rate?: number
          target_currency?: string
          valid_at?: string
        }
        Relationships: []
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
      financial_audit_log: {
        Row: {
          action: string
          compliance_reason: string | null
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          performed_by: string | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          compliance_reason?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          performed_by?: string | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          compliance_reason?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          performed_by?: string | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      financial_transactions: {
        Row: {
          amount: number
          appointment_id: string | null
          cashback_amount: number | null
          completed_at: string | null
          created_at: string
          currency: string
          delivery_service_id: string | null
          description: string
          external_transaction_id: string | null
          health_coins_earned: number | null
          id: string
          insurance_covered_amount: number | null
          metadata: Json | null
          payment_method: string
          payment_provider: string | null
          pharmacy_order_id: string | null
          status: string
          tax_amount: number | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          cashback_amount?: number | null
          completed_at?: string | null
          created_at?: string
          currency?: string
          delivery_service_id?: string | null
          description: string
          external_transaction_id?: string | null
          health_coins_earned?: number | null
          id?: string
          insurance_covered_amount?: number | null
          metadata?: Json | null
          payment_method: string
          payment_provider?: string | null
          pharmacy_order_id?: string | null
          status?: string
          tax_amount?: number | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          cashback_amount?: number | null
          completed_at?: string | null
          created_at?: string
          currency?: string
          delivery_service_id?: string | null
          description?: string
          external_transaction_id?: string | null
          health_coins_earned?: number | null
          id?: string
          insurance_covered_amount?: number | null
          metadata?: Json | null
          payment_method?: string
          payment_provider?: string | null
          pharmacy_order_id?: string | null
          status?: string
          tax_amount?: number | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      fraud_alerts: {
        Row: {
          alert_type: string
          created_at: string
          description: string
          device_info: Json | null
          id: string
          ip_address: unknown | null
          resolution_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          risk_score: number
          status: string
          transaction_id: string | null
          triggered_rules: string[] | null
          user_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string
          description: string
          device_info?: Json | null
          id?: string
          ip_address?: unknown | null
          resolution_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_score: number
          status?: string
          transaction_id?: string | null
          triggered_rules?: string[] | null
          user_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string
          description?: string
          device_info?: Json | null
          id?: string
          ip_address?: unknown | null
          resolution_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_score?: number
          status?: string
          transaction_id?: string | null
          triggered_rules?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fraud_alerts_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "financial_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      health_savings_goals: {
        Row: {
          auto_contribute_amount: number | null
          auto_contribute_frequency: string | null
          category: string | null
          created_at: string
          currency: string
          current_amount: number
          goal_name: string
          id: string
          is_active: boolean | null
          target_amount: number
          target_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_contribute_amount?: number | null
          auto_contribute_frequency?: string | null
          category?: string | null
          created_at?: string
          currency?: string
          current_amount?: number
          goal_name: string
          id?: string
          is_active?: boolean | null
          target_amount: number
          target_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_contribute_amount?: number | null
          auto_contribute_frequency?: string | null
          category?: string | null
          created_at?: string
          currency?: string
          current_amount?: number
          goal_name?: string
          id?: string
          is_active?: boolean | null
          target_amount?: number
          target_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      health_wallets: {
        Row: {
          auto_pay_enabled: boolean | null
          balance: number
          cashback_earned: number
          created_at: string
          crypto_enabled: boolean | null
          currency: string
          health_coins: number
          hsa_connected: boolean | null
          id: string
          loyalty_tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_pay_enabled?: boolean | null
          balance?: number
          cashback_earned?: number
          created_at?: string
          crypto_enabled?: boolean | null
          currency?: string
          health_coins?: number
          hsa_connected?: boolean | null
          id?: string
          loyalty_tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_pay_enabled?: boolean | null
          balance?: number
          cashback_earned?: number
          created_at?: string
          crypto_enabled?: boolean | null
          currency?: string
          health_coins?: number
          hsa_connected?: boolean | null
          id?: string
          loyalty_tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      insurance_claims: {
        Row: {
          approved_amount: number | null
          claim_amount: number
          claim_number: string
          created_at: string
          denial_reason: string | null
          diagnosis_codes: string[] | null
          id: string
          insurance_provider: string
          invoice_id: string | null
          metadata: Json | null
          policy_number: string
          procedure_codes: string[] | null
          processed_at: string | null
          status: string
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_amount?: number | null
          claim_amount: number
          claim_number: string
          created_at?: string
          denial_reason?: string | null
          diagnosis_codes?: string[] | null
          id?: string
          insurance_provider: string
          invoice_id?: string | null
          metadata?: Json | null
          policy_number: string
          procedure_codes?: string[] | null
          processed_at?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_amount?: number | null
          claim_amount?: number
          claim_number?: string
          created_at?: string
          denial_reason?: string | null
          diagnosis_codes?: string[] | null
          id?: string
          insurance_provider?: string
          invoice_id?: string | null
          metadata?: Json | null
          policy_number?: string
          procedure_codes?: string[] | null
          processed_at?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_claims_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          appointment_id: string | null
          billing_address: Json | null
          created_at: string
          currency: string
          discount_amount: number | null
          doctor_id: string | null
          due_date: string | null
          id: string
          invoice_number: string
          line_items: Json
          metadata: Json | null
          notes: string | null
          paid_at: string | null
          payment_terms: string | null
          status: string
          subtotal: number
          tax_amount: number
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          appointment_id?: string | null
          billing_address?: Json | null
          created_at?: string
          currency?: string
          discount_amount?: number | null
          doctor_id?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          line_items?: Json
          metadata?: Json | null
          notes?: string | null
          paid_at?: string | null
          payment_terms?: string | null
          status?: string
          subtotal: number
          tax_amount?: number
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          appointment_id?: string | null
          billing_address?: Json | null
          created_at?: string
          currency?: string
          discount_amount?: number | null
          doctor_id?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          line_items?: Json
          metadata?: Json | null
          notes?: string | null
          paid_at?: string | null
          payment_terms?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      kyc_verifications: {
        Row: {
          address_verified: boolean | null
          created_at: string
          document_expiry: string | null
          document_number: string | null
          document_type: string | null
          id: string
          identity_verified: boolean | null
          metadata: Json | null
          phone_verified: boolean | null
          rejection_reason: string | null
          risk_score: number | null
          status: string
          updated_at: string
          user_id: string
          verification_date: string | null
          verification_level: string
          verification_provider: string | null
        }
        Insert: {
          address_verified?: boolean | null
          created_at?: string
          document_expiry?: string | null
          document_number?: string | null
          document_type?: string | null
          id?: string
          identity_verified?: boolean | null
          metadata?: Json | null
          phone_verified?: boolean | null
          rejection_reason?: string | null
          risk_score?: number | null
          status?: string
          updated_at?: string
          user_id: string
          verification_date?: string | null
          verification_level?: string
          verification_provider?: string | null
        }
        Update: {
          address_verified?: boolean | null
          created_at?: string
          document_expiry?: string | null
          document_number?: string | null
          document_type?: string | null
          id?: string
          identity_verified?: boolean | null
          metadata?: Json | null
          phone_verified?: boolean | null
          rejection_reason?: string | null
          risk_score?: number | null
          status?: string
          updated_at?: string
          user_id?: string
          verification_date?: string | null
          verification_level?: string
          verification_provider?: string | null
        }
        Relationships: []
      }
      payment_intents: {
        Row: {
          amount: number
          appointment_id: string | null
          created_at: string | null
          currency: string
          id: string
          metadata: Json | null
          service_type: string
          status: string
          stripe_payment_intent_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          metadata?: Json | null
          service_type?: string
          status?: string
          stripe_payment_intent_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          metadata?: Json | null
          service_type?: string
          status?: string
          stripe_payment_intent_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          billing_address: Json | null
          brand: string | null
          country: string | null
          created_at: string
          currency: string | null
          expiry_month: number | null
          expiry_year: number | null
          external_id: string
          id: string
          is_active: boolean | null
          is_default: boolean | null
          is_verified: boolean | null
          last_four: string | null
          provider: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_address?: Json | null
          brand?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          expiry_month?: number | null
          expiry_year?: number | null
          external_id: string
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          is_verified?: boolean | null
          last_four?: string | null
          provider: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_address?: Json | null
          brand?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          expiry_month?: number | null
          expiry_year?: number | null
          external_id?: string
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          is_verified?: boolean | null
          last_four?: string | null
          provider?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          description: string | null
          features: Json
          id: string
          is_active: boolean | null
          name: string
          price_monthly: number
          price_yearly: number | null
          stripe_price_id_monthly: string | null
          stripe_price_id_yearly: string | null
          user_type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          name: string
          price_monthly: number
          price_yearly?: number | null
          stripe_price_id_monthly?: string | null
          stripe_price_id_yearly?: string | null
          user_type?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          price_monthly?: number
          price_yearly?: number | null
          stripe_price_id_monthly?: string | null
          stripe_price_id_yearly?: string | null
          user_type?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          billing_cycle: string
          cancelled_at: string | null
          created_at: string
          currency: string
          current_period_end: string
          current_period_start: string
          external_subscription_id: string
          id: string
          metadata: Json | null
          payment_method_id: string | null
          plan_name: string
          provider: string
          status: string
          trial_ends_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          billing_cycle: string
          cancelled_at?: string | null
          created_at?: string
          currency?: string
          current_period_end: string
          current_period_start: string
          external_subscription_id: string
          id?: string
          metadata?: Json | null
          payment_method_id?: string | null
          plan_name: string
          provider: string
          status?: string
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          billing_cycle?: string
          cancelled_at?: string | null
          created_at?: string
          currency?: string
          current_period_end?: string
          current_period_start?: string
          external_subscription_id?: string
          id?: string
          metadata?: Json | null
          payment_method_id?: string | null
          plan_name?: string
          provider?: string
          status?: string
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_documents: {
        Row: {
          created_at: string
          currency: string
          document_type: string
          document_url: string | null
          id: string
          jurisdiction: string
          metadata: Json | null
          status: string
          tax_amount: number
          tax_year: number
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          document_type: string
          document_url?: string | null
          id?: string
          jurisdiction: string
          metadata?: Json | null
          status?: string
          tax_amount: number
          tax_year: number
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          document_type?: string
          document_url?: string | null
          id?: string
          jurisdiction?: string
          metadata?: Json | null
          status?: string
          tax_amount?: number
          tax_year?: number
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
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
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          user_id: string
          required_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "patient" | "doctor" | "admin" | "enterprise" | "pharmacy"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["patient", "doctor", "admin", "enterprise", "pharmacy"],
    },
  },
} as const
