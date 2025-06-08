
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Video, Calendar, FileText, Phone } from "lucide-react";
import AppointmentBookingModal from '@/components/appointments/AppointmentBookingModal';

export default function QuickActions() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="text-sm font-medium">Consulta Virtual</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50"
          onClick={() => setShowAppointmentModal(true)}
        >
          <Calendar className="h-6 w-6 text-green-600" />
          <span className="text-sm font-medium">Agendar Cita</span>
        </Button>
        
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50">
          <FileText className="h-6 w-6 text-purple-600" />
          <span className="text-sm font-medium">Ver Historial</span>
        </Button>
        
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-red-50">
          <Phone className="h-6 w-6 text-red-600" />
          <span className="text-sm font-medium">Emergencia</span>
        </Button>
      </div>

      <AppointmentBookingModal 
        open={showAppointmentModal}
        onOpenChange={setShowAppointmentModal}
      />
    </>
  );
}
