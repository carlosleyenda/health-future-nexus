
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MapPin, Phone } from "lucide-react";

const upcomingAppointments = [
  {
    id: "1",
    doctor: "Dra. María García",
    specialty: "Cardiología",
    date: "2024-06-05",
    time: "10:00 AM",
    type: "virtual" as const,
    status: "confirmed" as const
  },
  {
    id: "2",
    doctor: "Dr. Carlos López",
    specialty: "Medicina General",
    date: "2024-06-08",
    time: "2:30 PM",
    type: "in_person" as const,
    status: "scheduled" as const
  }
];

export default function UpcomingAppointments() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-600" />
          Próximas Citas
        </CardTitle>
        <CardDescription>
          Tus citas médicas programadas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingAppointments.map((appointment) => (
          <div key={appointment.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">{appointment.doctor}</h4>
                <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
              </div>
              <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                {appointment.status === "confirmed" ? "Confirmada" : "Programada"}
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {appointment.date} - {appointment.time}
              </div>
              <div className="flex items-center">
                {appointment.type === "virtual" ? (
                  <Video className="h-4 w-4 mr-1" />
                ) : (
                  <MapPin className="h-4 w-4 mr-1" />
                )}
                {appointment.type === "virtual" ? "Virtual" : "Presencial"}
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              {appointment.type === "virtual" && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Video className="h-4 w-4 mr-1" />
                  Unirse
                </Button>
              )}
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                Contactar
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
