
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function RecentHistoryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-purple-600" />
          Historial Reciente
        </CardTitle>
        <CardDescription>
          Últimas actividades médicas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-medium">Consulta Cardiológica</p>
            <p className="text-sm text-muted-foreground">Dra. María García - 28 May 2024</p>
            <p className="text-xs text-muted-foreground">Revisión de rutina, resultados normales</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-medium">Análisis de Sangre</p>
            <p className="text-sm text-muted-foreground">Laboratorio Central - 25 May 2024</p>
            <p className="text-xs text-muted-foreground">Perfil lipídico, glucosa en ayunas</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-medium">Receta Médica</p>
            <p className="text-sm text-muted-foreground">Dr. Carlos López - 22 May 2024</p>
            <p className="text-xs text-muted-foreground">Metformina 500mg, renovación</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
