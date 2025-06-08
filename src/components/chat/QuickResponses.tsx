
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';

interface QuickResponsesProps {
  onSelectResponse: (response: string) => void;
}

export default function QuickResponses({ onSelectResponse }: QuickResponsesProps) {
  const quickResponses = [
    {
      category: 'Saludos',
      responses: [
        'Buenos días, ¿cómo se siente hoy?',
        'Hola, estoy revisando su caso',
        'Gracias por contactarme'
      ]
    },
    {
      category: 'Medicamentos',
      responses: [
        'Tome la medicación con las comidas',
        'Continúe con el tratamiento por 7 días más',
        'Suspenda la medicación y contacte de inmediato',
        'La dosis debe tomarse cada 8 horas'
      ]
    },
    {
      category: 'Seguimiento',
      responses: [
        'Sus síntomas son normales en el proceso de recuperación',
        'Necesitamos programar una cita de seguimiento',
        'Los resultados se ven prometedores',
        'Agende una cita para la próxima semana'
      ]
    },
    {
      category: 'Emergencia',
      responses: [
        'Diríjase inmediatamente a urgencias',
        'Llame al 911 si los síntomas empeoran',
        'Esto requiere atención médica inmediata',
        'Voy a llamarle en 5 minutos'
      ]
    },
    {
      category: 'Resultados',
      responses: [
        'Sus análisis están dentro de valores normales',
        'Necesitamos repetir algunos estudios',
        'Los resultados muestran una mejora significativa',
        'Revisaré los resultados y le escribo pronto'
      ]
    }
  ];

  return (
    <Card className="border-t-0 rounded-t-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-600" />
          Respuestas Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-32">
          <div className="space-y-3">
            {quickResponses.map((category) => (
              <div key={category.category}>
                <Badge variant="outline" className="text-xs mb-2">
                  {category.category}
                </Badge>
                <div className="grid grid-cols-1 gap-1">
                  {category.responses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-left justify-start h-auto p-2 text-xs"
                      onClick={() => onSelectResponse(response)}
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
