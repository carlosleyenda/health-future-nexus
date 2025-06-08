
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppointmentBooking from './AppointmentBooking';

interface AppointmentBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AppointmentBookingModal({ open, onOpenChange }: AppointmentBookingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agendar Nueva Cita</DialogTitle>
        </DialogHeader>
        <AppointmentBooking onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
