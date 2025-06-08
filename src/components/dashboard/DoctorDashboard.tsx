
import React from 'react';

export const DoctorDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard del Doctor</h1>
        <p className="text-muted-foreground">Gestiona tus pacientes y consultas</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Citas de Hoy</h3>
          <p className="text-3xl font-bold text-blue-600">8</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Pacientes Activos</h3>
          <p className="text-3xl font-bold text-green-600">124</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Consultas Virtuales</h3>
          <p className="text-3xl font-bold text-purple-600">3</p>
        </div>
      </div>
    </div>
  );
};
