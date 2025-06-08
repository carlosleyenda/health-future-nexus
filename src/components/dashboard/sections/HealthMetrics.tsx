
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

const healthMetrics = [
  { label: "Presión Arterial", value: "120/80", unit: "mmHg", status: "normal" },
  { label: "Frecuencia Cardíaca", value: "72", unit: "bpm", status: "normal" },
  { label: "Peso", value: "75.2", unit: "kg", status: "stable" },
  { label: "Glucosa", value: "95", unit: "mg/dL", status: "normal" }
];

export default function HealthMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-red-600" />
          Métricas de Salud
        </CardTitle>
        <CardDescription>
          Últimas mediciones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {healthMetrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{metric.label}</p>
              <p className="text-xs text-muted-foreground">Última medición</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">
                {metric.value} <span className="text-sm font-normal text-muted-foreground">{metric.unit}</span>
              </p>
              <Badge 
                variant={metric.status === "normal" ? "default" : "secondary"}
                className="text-xs"
              >
                {metric.status === "normal" ? "Normal" : "Estable"}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
