
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileText, Users, Calendar, Stethoscope, MessageSquare } from "lucide-react";

export default function DoctorQuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50">
            <Video className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium">Iniciar Consulta</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50">
            <Users className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium">Ver Pacientes</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50">
            <FileText className="h-6 w-6 text-purple-600" />
            <span className="text-sm font-medium">Expedientes</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50">
            <Calendar className="h-6 w-6 text-orange-600" />
            <span className="text-sm font-medium">Agenda</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-red-50">
            <Stethoscope className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium">Diagnósticos</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-indigo-50">
            <MessageSquare className="h-6 w-6 text-indigo-600" />
            <span className="text-sm font-medium">Mensajes</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
