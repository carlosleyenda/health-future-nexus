
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Brain, User, Settings, TrendingUp, MessageSquare, Star } from 'lucide-react';
import { usePersonalizedAI } from '@/hooks/usePersonalizedAI';

export default function AIPersonalityDashboard() {
  const { aiPersonality, getAIStats, isLoading } = usePersonalizedAI();
  const stats = getAIStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!aiPersonality || !stats) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Tu asistente de IA se está configurando...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Perfil de IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Tu Asistente de IA Personalizado
          </CardTitle>
          <CardDescription>
            Configurado específicamente para tu rol y preferencias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Personalidad</p>
              <Badge variant="outline" className="capitalize">
                {aiPersonality.personalityType}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Estilo de Comunicación</p>
              <Badge variant="outline" className="capitalize">
                {aiPersonality.communicationStyle}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Nivel de Complejidad</p>
              <Badge variant="outline" className="capitalize">
                {aiPersonality.preferences.complexity}
              </Badge>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Efectividad de Respuestas</span>
              <span className="text-sm text-gray-600">{stats.avgEffectiveness}/10</span>
            </div>
            <Progress value={stats.avgEffectiveness * 10} className="h-2" />
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Satisfacción del Usuario</span>
              <span className="text-sm text-gray-600">{stats.satisfactionRate}%</span>
            </div>
            <Progress value={stats.satisfactionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de Uso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.totalInteractions}</p>
                <p className="text-sm text-gray-600">Interacciones Totales</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.capabilities}</p>
                <p className="text-sm text-gray-600">Capacidades Activas</p>
              </div>
              <Settings className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.avgEffectiveness}</p>
                <p className="text-sm text-gray-600">Puntuación Promedio</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Capacidades de IA */}
      <Card>
        <CardHeader>
          <CardTitle>Capacidades de tu IA</CardTitle>
          <CardDescription>
            Funcionalidades disponibles según tu rol y experiencia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiPersonality.capabilities.map((capability, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium capitalize">
                    {capability.type.replace(/_/g, ' ')}
                  </p>
                  <p className="text-sm text-gray-600">
                    Nivel: {capability.level} | Precisión: {Math.round(capability.accuracy * 100)}%
                  </p>
                </div>
                <Badge 
                  variant={capability.level === 'expert' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {capability.level}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuración */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de IA</CardTitle>
          <CardDescription>
            Personaliza cómo interactúa contigo tu asistente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tono de Respuesta</p>
                <p className="text-sm text-gray-600 capitalize">
                  Actual: {aiPersonality.preferences.tone}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Cambiar
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Longitud de Respuesta</p>
                <p className="text-sm text-gray-600 capitalize">
                  Actual: {aiPersonality.preferences.responseLength}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Ajustar
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Idioma</p>
                <p className="text-sm text-gray-600">
                  Actual: {aiPersonality.preferences.language === 'es' ? 'Español' : 'English'}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Cambiar
              </Button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-xs text-gray-500">
              Última actualización: {new Date(stats.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
