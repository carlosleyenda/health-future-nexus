
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bot, Brain, AlertTriangle, CheckCircle } from 'lucide-react';
import { DiagnosticAIService } from '@/services/ai/diagnosticService';
import type { DiagnosticResult } from '@/services/ai/diagnosticService';

export default function SimpleAIDiagnostic() {
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const analysisResults = await DiagnosticAIService.analyzeSymptoms({
        symptoms,
        patientAge: 30,
        patientGender: 'unknown'
      });
      setResults(analysisResults);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Asistente de IA Médica
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Describe tus síntomas
          </label>
          <Textarea
            placeholder="Ej: Tengo dolor de cabeza, fiebre y me siento cansado desde hace 2 días..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <Button 
          onClick={handleAnalyze}
          disabled={!symptoms.trim() || isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <Bot className="h-4 w-4 mr-2 animate-spin" />
              Analizando...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Analizar Síntomas
            </>
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Resultados del análisis:</h4>
            {results.map((result, index) => (
              <div key={index} className="p-3 border rounded-lg bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{result.condition}</h5>
                  <Badge className={getSeverityColor(result.severity)}>
                    {Math.round(result.probability * 100)}%
                  </Badge>
                </div>
                
                {result.redFlags.length > 0 && (
                  <div className="mb-2">
                    <div className="flex items-center gap-1 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-700">Señales de alerta:</span>
                    </div>
                    <ul className="text-sm text-red-600 pl-5">
                      {result.redFlags.map((flag, i) => (
                        <li key={i} className="list-disc">{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700">Recomendaciones:</span>
                  </div>
                  <ul className="text-sm text-gray-600 pl-5 space-y-1">
                    {result.recommendations.slice(0, 3).map((rec, i) => (
                      <li key={i} className="list-disc">{rec}</li>
                    ))}
                  </ul>
                </div>

                {result.urgencyLevel > 7 && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-700 font-medium">
                      ⚠️ Se recomienda atención médica urgente
                    </p>
                  </div>
                )}
              </div>
            ))}
            
            <div className="text-xs text-gray-500 italic border-t pt-2">
              Nota: Esta información es solo orientativa. Siempre consulta con un profesional médico para un diagnóstico preciso.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
