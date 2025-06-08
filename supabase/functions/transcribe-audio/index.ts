
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
    const { audioData, sessionId, speakerType, timestampInCall } = await req.json();
    
    if (!audioData || !sessionId) {
      throw new Error('Audio data and session ID are required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Convert base64 audio to blob
    const binaryAudio = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
    const audioBlob = new Blob([binaryAudio], { type: 'audio/webm' });

    // Prepare form data for OpenAI Whisper
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', 'es'); // Spanish for medical consultations
    formData.append('response_format', 'verbose_json');

    // Send to OpenAI Whisper
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${await response.text()}`);
    }

    const transcriptionResult = await response.json();
    const transcribedText = transcriptionResult.text;
    const confidence = transcriptionResult.confidence || 0.95;

    // Save transcription to database
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { error } = await supabase
      .from('video_call_transcripts')
      .insert({
        session_id: sessionId,
        speaker_type: speakerType || 'unknown',
        content: transcribedText,
        timestamp_in_call: timestampInCall || 0,
        confidence_score: confidence,
      });

    if (error) {
      console.error('Error saving transcription:', error);
      throw new Error('Failed to save transcription');
    }

    return new Response(
      JSON.stringify({ 
        transcription: transcribedText,
        confidence: confidence,
        success: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Transcription error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
