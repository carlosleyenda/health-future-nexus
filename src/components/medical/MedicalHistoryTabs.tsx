
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MedicalRecordsTab from './tabs/MedicalRecordsTab';
import AllergiesTab from './tabs/AllergiesTab';
import PrescriptionsTab from './tabs/PrescriptionsTab';

interface MedicalHistoryTabsProps {
  patientId: string;
}

export default function MedicalHistoryTabs({ patientId }: MedicalHistoryTabsProps) {
  return (
    <Tabs defaultValue="history" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="history">Historial Médico</TabsTrigger>
        <TabsTrigger value="allergies">Alergias</TabsTrigger>
        <TabsTrigger value="prescriptions">Recetas</TabsTrigger>
      </TabsList>

      <TabsContent value="history" className="space-y-4">
        <MedicalRecordsTab patientId={patientId} />
      </TabsContent>

      <TabsContent value="allergies" className="space-y-4">
        <AllergiesTab patientId={patientId} />
      </TabsContent>

      <TabsContent value="prescriptions" className="space-y-4">
        <PrescriptionsTab patientId={patientId} />
      </TabsContent>
    </Tabs>
  );
}
