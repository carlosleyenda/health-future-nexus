
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = 'https://voaexnezngeboavpmnyt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYWV4bmV6bmdlYm9hdnBtbnl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNzM2NzYsImV4cCI6MjA2NDk0OTY3Nn0.TJ2UyNdPcUPkUfhobQZzMtOuYb1sKKUwktQYjO1cIM4';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { conversationId, lastMessages, userRole } = await req.json();
    
    if (!conversationId || !lastMessages) {
      throw new Error('Missing required parameters');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Build context from recent messages
    const context = lastMessages.map((msg: any) => 
      `${msg.sender_role || 'user'}: ${msg.content}`
    ).join('\n');

    // Generate smart replies based on user role and context
    const prompt = buildPromptForRole(userRole, context);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: prompt
          },
          {
            role: 'user',
            content: `Generate 3 appropriate smart replies for this medical conversation context:\n\n${context}`
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${await response.text()}`);
    }

    const aiResponse = await response.json();
    const suggestions = aiResponse.choices[0].message.content
      .split('\n')
      .filter((line: string) => line.trim())
      .slice(0, 3);

    // Save smart replies to database
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const smartReplies = suggestions.map((reply: string) => ({
      conversation_id: conversationId,
      suggested_for_user_id: req.headers.get('x-user-id'),
      reply_text: reply.replace(/^\d+\.\s*/, '').trim(),
      confidence_score: 0.8,
      context_hash: generateContextHash(context),
      expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
    }));

    const { data, error } = await supabase
      .from('chat_smart_replies')
      .insert(smartReplies)
      .select();

    if (error) {
      console.error('Error saving smart replies:', error);
      throw new Error('Failed to save smart replies');
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        replies: data
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Smart replies error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function buildPromptForRole(userRole: string, context: string): string {
  const basePrompt = `You are an AI assistant helping to generate appropriate smart reply suggestions for medical communications. 
  
  IMPORTANT GUIDELINES:
  - Keep responses professional and medical-appropriate
  - Respect patient confidentiality and HIPAA compliance
  - Generate contextually relevant suggestions
  - Keep responses concise (under 50 words each)
  - Use appropriate medical terminology when relevant
  - Be empathetic and supportive in tone`;

  switch (userRole) {
    case 'doctor':
      return `${basePrompt}
      
      You are generating replies for a DOCTOR. Focus on:
      - Professional medical advice and recommendations
      - Follow-up questions for patient care
      - Treatment plan discussions
      - Appointment scheduling suggestions
      - Prescription or medication discussions`;

    case 'patient':
      return `${basePrompt}
      
      You are generating replies for a PATIENT. Focus on:
      - Questions about symptoms or treatment
      - Appointment requests or scheduling
      - Clarification requests about medical advice
      - Expressions of gratitude or concern
      - Confirmation of understanding`;

    case 'specialist':
      return `${basePrompt}
      
      You are generating replies for a SPECIALIST. Focus on:
      - Specialized medical opinions and consultations
      - Collaboration with primary care physicians
      - Detailed diagnostic discussions
      - Treatment recommendations within specialty
      - Referral suggestions`;

    default:
      return basePrompt;
  }
}

function generateContextHash(context: string): string {
  // Simple hash function for context identification
  let hash = 0;
  for (let i = 0; i < context.length; i++) {
    const char = context.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}
