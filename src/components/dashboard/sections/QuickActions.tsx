
import React from 'react';
import { Button } from "@/components/ui/button";
import { Video, Calendar, FileText, Pill } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
        <Video className="h-6 w-6 text-blue-600" />
        <span className="text-sm">Consulta Virtual</span>
      </Button>
      <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
        <Calendar className="h-6 w-6 text-green-600" />
        <span className="text-sm">Agendar Cita</span>
      </Button>
      <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
        <FileText className="h-6 w-6 text-purple-600" />
        <span className="text-sm">Ver Historial</span>
      </Button>
      <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
        <Pill className="h-6 w-6 text-red-600" />
        <span className="text-sm">Medicamentos</span>
      </Button>
    </div>
  );
}
