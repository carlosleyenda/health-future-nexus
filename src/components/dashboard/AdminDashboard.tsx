
import React from 'react';

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">Gestiona usuarios y configuración del sistema</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Usuarios</h3>
          <p className="text-3xl font-bold text-blue-600">15,420</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Doctores</h3>
          <p className="text-3xl font-bold text-green-600">1,200</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Pacientes</h3>
          <p className="text-3xl font-bold text-purple-600">14,200</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Ingresos</h3>
          <p className="text-3xl font-bold text-orange-600">$2.3M</p>
        </div>
      </div>
    </div>
  );
};
