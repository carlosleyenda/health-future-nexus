
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";

export default function RevenueSummary() {
  const revenueData = {
    today: 1250,
    thisWeek: 8760,
    thisMonth: 35420,
    growth: 12.5
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Resumen de Ingresos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              ${revenueData.today.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Hoy</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              ${revenueData.thisWeek.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Esta Semana</div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              ${revenueData.thisMonth.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Este Mes</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Crecimiento mensual</span>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">+{revenueData.growth}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
