import React from 'react';
import { useRoleBasedAI } from '@/hooks/useRoleBasedAI';
import PatientAI from './PatientAI';
import DoctorAI from './DoctorAI';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Loader2 } from 'lucide-react';

// Componentes para otros roles - pueden implementarse según necesidad
const AdminAI = () => (
  <Card>
    <CardContent className="p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">Asistente Administrativo IA</h3>
      <p className="text-muted-foreground">Panel de administración en desarrollo...</p>
    </CardContent>
  </Card>
);

const PharmacyAI = () => (
  <Card>
    <CardContent className="p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">Asistente Farmacéutico IA</h3>
      <p className="text-muted-foreground">Funcionalidades farmacéuticas en desarrollo...</p>
    </CardContent>
  </Card>
);

const EnterpriseAI = () => (
  <Card>
    <CardContent className="p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">Asistente Empresarial IA</h3>
      <p className="text-muted-foreground">Analytics empresarial en desarrollo...</p>
    </CardContent>
  </Card>
);

export default function RoleBasedAIAssistant() {
  const { userRole, isLoading } = useRoleBasedAI();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando tu asistente de IA personalizado...</p>
        </CardContent>
      </Card>
    );
  }

  // Renderizar componente específico según el rol
  switch (userRole) {
    case 'patient':
      return <PatientAI />;
    case 'doctor':
      return <DoctorAI />;
    case 'admin':
      return <AdminAI />;
    case 'pharmacy':
      return <PharmacyAI />;
    case 'enterprise':
      return <EnterpriseAI />;
    default:
      return (
        <Card>
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-amber-500" />
            <h3 className="text-xl font-semibold mb-2">Rol no reconocido</h3>
            <p className="text-muted-foreground">
              No se pudo determinar tu rol de usuario. Por favor, contacta soporte técnico.
            </p>
          </CardContent>
        </Card>
      );
  }
}