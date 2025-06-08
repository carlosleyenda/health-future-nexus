
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Clock } from "lucide-react";

const medications = [
  { name: "Metformina", dosage: "500mg", frequency: "2 veces al día", nextDose: "8:00 PM" },
  { name: "Lisinopril", dosage: "10mg", frequency: "1 vez al día", nextDose: "9:00 AM" }
];

export default function MedicationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Pill className="h-5 w-5 mr-2 text-blue-600" />
          Medicamentos
        </CardTitle>
        <CardDescription>
          Recordatorios y dosis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {medications.map((med, index) => (
          <div key={index} className="border rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">{med.name}</h4>
                <p className="text-sm text-muted-foreground">{med.dosage} - {med.frequency}</p>
              </div>
              <Badge variant="outline">Activo</Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              Próxima dosis: {med.nextDose}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
