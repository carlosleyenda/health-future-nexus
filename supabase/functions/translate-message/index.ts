
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
    const { text, targetLanguage, sourceLanguage = 'auto' } = await req.json();
    
    if (!text || !targetLanguage) {
      throw new Error('Text and target language are required');
    }

    // Check if we have Google Translate API key
    const googleApiKey = Deno.env.get('GOOGLE_TRANSLATE_API_KEY');
    
    let translatedText: string;
    let service = 'fallback';
    let confidence = 0.8;

    if (googleApiKey) {
      // Use Google Translate API
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            target: targetLanguage,
            source: sourceLanguage === 'auto' ? undefined : sourceLanguage,
            format: 'text'
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        translatedText = result.data.translations[0].translatedText;
        service = 'google';
        confidence = 0.95;
      } else {
        throw new Error('Google Translate API failed');
      }
    } else {
      // Fallback to OpenAI for translation
      const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
      if (!openAIApiKey) {
        throw new Error('No translation service available');
      }

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
              content: `You are a professional medical translator. Translate the following text to ${getLanguageName(targetLanguage)} while preserving medical terminology and context. Only return the translation, no explanations.`
            },
            {
              role: 'user',
              content: text
            }
          ],
          max_tokens: 500,
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${await response.text()}`);
      }

      const aiResponse = await response.json();
      translatedText = aiResponse.choices[0].message.content.trim();
      service = 'openai';
      confidence = 0.85;
    }

    return new Response(
      JSON.stringify({ 
        translatedText,
        sourceLanguage,
        targetLanguage,
        service,
        confidence
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Translation error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function getLanguageName(languageCode: string): string {
  const languages: Record<string, string> = {
    'es': 'Spanish',
    'en': 'English',
    'fr': 'French',
    'pt': 'Portuguese',
    'de': 'German',
    'it': 'Italian',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese',
    'ar': 'Arabic'
  };
  
  return languages[languageCode] || languageCode;
}
