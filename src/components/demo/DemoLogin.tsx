import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth';
import { 
  User, 
  Stethoscope, 
  Shield, 
  Building, 
  Pill,
  ArrowRight,
  Crown,
  Heart,
  Briefcase,
  Store
} from 'lucide-react';

const demoUsers = [
  {
    role: 'patient',
    email: 'ana.garcia@paciente.demo',
    password: 'demo123',
    name: 'Ana García',
    description: 'Paciente con historial médico completo',
    icon: <Heart className="h-6 w-6" />,
    color: 'bg-green-100 text-green-800 border-green-200',
    features: ['Citas médicas', 'Historial clínico', 'Chat con doctores', 'Recordatorios']
  },
  {
    role: 'doctor',
    email: 'carlos.rodriguez@doctor.demo',
    password: 'demo123',
    name: 'Dr. Carlos Rodríguez',
    description: 'Médico general con 10 años de experiencia',
    icon: <Stethoscope className="h-6 w-6" />,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    features: ['Gestión de pacientes', 'Consultas virtuales', 'Recetas digitales', 'Analytics']
  },
  {
    role: 'admin',
    email: 'admin@sistema.demo',
    password: 'demo123',
    name: 'Admin Sistema',
    description: 'Administrador con acceso completo',
    icon: <Shield className="h-6 w-6" />,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    features: ['Panel completo', 'Gestión usuarios', 'Analytics avanzados', 'Configuración']
  },
  {
    role: 'enterprise',
    email: 'empresa@salud.demo',
    password: 'demo123',
    name: 'Empresa Salud',
    description: 'Cliente empresarial con múltiples empleados',
    icon: <Briefcase className="h-6 w-6" />,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    features: ['Dashboard empresarial', 'Reportes', 'API access', 'Soporte 24/7']
  },
  {
    role: 'pharmacy',
    email: 'farmacia@central.demo',
    password: 'demo123',
    name: 'Farmacia Central',
    description: 'Farmacia partner con inventario completo',
    icon: <Store className="h-6 w-6" />,
    color: 'bg-teal-100 text-teal-800 border-teal-200',
    features: ['Gestión inventario', 'Recetas digitales', 'Entregas', 'Reportes ventas']
  },
  {
    role: 'delivery_person',
    email: 'carlos.delivery@repartidor.demo',
    password: 'demo123',
    name: 'Carlos Mendoza',
    description: 'Repartidor con motocicleta - Zona Lima',
    icon: <Pill className="h-6 w-6" />,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    features: ['Entregas pendientes', 'Rastreo GPS', 'Chat con clientes', 'Gestión de rutas']
  }
];

export default function DemoLogin() {
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuthStore();

  const handleDemoLogin = async (user: typeof demoUsers[0]) => {
    setLoading(user.role);
    
    try {
      // Use the existing signIn function which handles demo users
      const { error } = await signIn(user.email, user.password);
      
      if (!error) {
        toast.success(`¡Bienvenido como ${user.name}!`);
        
        // Redirect based on role
        const dashboardPaths = {
          patient: '/patient/dashboard',
          doctor: '/doctor/dashboard', 
          admin: '/admin/dashboard',
          enterprise: '/enterprise',
          pharmacy: '/pharmacy-dashboard',
          delivery_person: '/repartidor'
        };
        
        navigate(dashboardPaths[user.role as keyof typeof dashboardPaths] || '/');
      } else {
        toast.error('Error al acceder como usuario demo');
      }
    } catch (error) {
      toast.error('Error al acceder como usuario demo');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Acceso Demo - Clínica Virtual
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Explora la plataforma con diferentes roles de usuario
          </p>
          <Badge variant="secondary" className="text-sm">
            <Crown className="h-3 w-3 mr-1" />
            Modo Demostración - Datos de prueba
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoUsers.map((user) => (
            <Card 
              key={user.role} 
              className="transition-all duration-200 hover:shadow-lg hover:scale-105 border-2"
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full ${user.color} flex items-center justify-center mx-auto mb-3`}>
                  {user.icon}
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="text-sm">
                  {user.description}
                </CardDescription>
                <Badge variant="outline" className="mt-2 w-fit mx-auto">
                  {user.role.toUpperCase()}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Características:</h4>
                  <ul className="text-xs space-y-1">
                    {user.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-3 rounded text-xs">
                  <div className="font-medium text-gray-700 mb-1">Credenciales Demo:</div>
                  <div className="text-gray-600">
                    <div>Email: {user.email}</div>
                    <div>Password: {user.password}</div>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleDemoLogin(user)}
                  disabled={loading !== null}
                  className="w-full"
                  variant={user.role === 'admin' ? 'default' : 'outline'}
                >
                  {loading === user.role ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Accediendo...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Acceder como {user.role}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Información importante</span>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  • Estos son usuarios de demostración con datos ficticios
                </p>
                <p>
                  • Los pagos están en modo de prueba (no se realizan cargos reales)
                </p>
                <p>
                  • Puedes cambiar entre roles en cualquier momento
                </p>
                <p>
                  • Toda la funcionalidad está disponible para explorar
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}