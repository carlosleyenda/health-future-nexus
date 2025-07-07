import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, Users, Calendar, MessageSquare, FileText, 
  Pill, Truck, CreditCard, BarChart3, Settings,
  Stethoscope, Activity, Building2, Package,
  Crown, Target, Share2, TrendingUp, Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  description?: string;
}

interface RoleBasedNavigationProps {
  userRole: 'patient' | 'doctor' | 'admin' | 'enterprise' | 'pharmacy' | null;
  collapsed?: boolean;
}

const navigationConfig: Record<string, NavigationItem[]> = {
  patient: [
    { name: 'Mi Dashboard', href: '/patient/dashboard', icon: Home, description: 'Vista general de salud' },
    { name: 'Mis Citas', href: '/appointments', icon: Calendar, description: 'Gestionar citas médicas' },
    { name: 'Consultas', href: '/consultations', icon: Stethoscope, description: 'Video consultas virtuales' },
    { name: 'Mi Salud', href: '/health', icon: Activity, description: 'Monitoreo y métricas' },
    { name: 'Medicamentos', href: '/pharmacy', icon: Pill, description: 'Seguimiento de medicamentos' },
    { name: 'Historial Médico', href: '/medical-records', icon: FileText, description: 'Registros médicos completos' },
    { name: 'Delivery Médico', href: '/delivery', icon: Truck, description: 'Servicios a domicilio' },
    { name: 'Mis Pagos', href: '/payments', icon: CreditCard, description: 'Wallet y transacciones' },
    { name: 'Chat Médico', href: '/chat', icon: MessageSquare, badge: '3', description: 'Soporte 24/7' },
    { name: 'IA Assistant', href: '/ai-assistant', icon: Target, description: 'Asistente médico inteligente' },
    { name: 'Configuración', href: '/settings', icon: Settings, description: 'Preferencias y cuenta' }
  ],
  
  doctor: [
    { name: 'Mi Dashboard', href: '/doctor/dashboard', icon: Home, description: 'Panel de control médico' },
    { name: 'Mis Pacientes', href: '/patients', icon: Users, description: 'Gestión de pacientes' },
    { name: 'Mi Agenda', href: '/schedule', icon: Calendar, description: 'Horarios y disponibilidad' },
    { name: 'Consultas', href: '/consultations', icon: Stethoscope, description: 'Consultas virtuales' },
    { name: 'Historial Médico', href: '/medical-records', icon: FileText, description: 'Registros de pacientes' },
    { name: 'Chat Médico', href: '/chat', icon: MessageSquare, badge: '12', description: 'Comunicación con pacientes' },
    { name: 'Finanzas', href: '/payments', icon: CreditCard, description: 'Ingresos y facturación' },
    { name: 'IA Diagnóstica', href: '/ai-assistant', icon: Target, description: 'Herramientas de diagnóstico' },
    { name: 'Marketplace', href: '/marketplace', icon: Crown, description: 'Servicios y promoción' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, description: 'Métricas de práctica' },
    { name: 'Configuración', href: '/settings', icon: Settings, description: 'Perfil y preferencias' }
  ],
  
  admin: [
    { name: 'Dashboard Ejecutivo', href: '/executive', icon: TrendingUp, description: 'Métricas en tiempo real' },
    { name: 'Panel Admin', href: '/admin/dashboard', icon: Home, description: 'Control administrativo' },
    { name: 'Gestión de Usuarios', href: '/users', icon: Users, description: 'Administrar usuarios' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, description: 'Reportes y análisis' },
    { name: 'Finanzas', href: '/payments', icon: CreditCard, description: 'Supervisión financiera' },
    { name: 'Marketplace', href: '/marketplace', icon: Crown, description: 'Gestión de doctores' },
    { name: 'Sistema de Referidos', href: '/referrals', icon: Share2, description: 'Programa de afiliados' },
    { name: 'Precios', href: '/pricing', icon: Target, description: 'Gestión de planes' },
    { name: 'Chat Sistema', href: '/chat', icon: MessageSquare, description: 'Soporte y moderación' },
    { name: 'Compliance', href: '/compliance', icon: Shield, description: 'Auditoría y seguridad' },
    { name: 'Configuración', href: '/settings', icon: Settings, description: 'Configuración del sistema' }
  ],
  
  enterprise: [
    { name: 'Dashboard Hospital', href: '/enterprise', icon: Building2, description: 'Panel hospitalario' },
    { name: 'Gestión Médica', href: '/doctors', icon: Stethoscope, description: 'Equipo médico' },
    { name: 'Pacientes', href: '/patients', icon: Users, description: 'Gestión de pacientes' },
    { name: 'Operaciones', href: '/operations', icon: Activity, description: 'Métricas operacionales' },
    { name: 'Finanzas', href: '/payments', icon: CreditCard, description: 'Facturación institucional' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, description: 'Business intelligence' },
    { name: 'Compliance', href: '/compliance', icon: Shield, description: 'Regulaciones y auditoría' },
    { name: 'API Management', href: '/api', icon: Target, description: 'Integraciones API' },
    { name: 'Configuración', href: '/settings', icon: Settings, description: 'Configuración enterprise' }
  ],
  
  pharmacy: [
    { name: 'Dashboard Farmacia', href: '/pharmacy-dashboard', icon: Pill, description: 'Panel de control' },
    { name: 'Órdenes', href: '/orders', icon: Package, description: 'Gestión de pedidos' },
    { name: 'Inventario', href: '/inventory', icon: Package, description: 'Control de stock' },
    { name: 'Entregas', href: '/delivery', icon: Truck, description: 'Seguimiento de entregas' },
    { name: 'Finanzas', href: '/payments', icon: CreditCard, description: 'Ingresos y pagos' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, description: 'Métricas de ventas' },
    { name: 'Red de Farmacias', href: '/network', icon: Building2, description: 'Partners y red' },
    { name: 'Configuración', href: '/settings', icon: Settings, description: 'Configuración de farmacia' }
  ]
};

export default function RoleBasedNavigation({ userRole, collapsed = false }: RoleBasedNavigationProps) {
  const location = useLocation();
  
  if (!userRole) return null;
  
  const navigation = navigationConfig[userRole] || [];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="space-y-1 px-2">
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        
        return (
          <NavLink
            key={item.name}
            to={item.href}
            className={`
              group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
              ${active
                ? 'bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <Icon className={`h-5 w-5 flex-shrink-0 ${
              active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
            } ${collapsed ? '' : 'mr-3'}`} />
            
            {!collapsed && (
              <>
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge className="ml-2 bg-red-100 text-red-800 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
            
            {collapsed && item.badge && (
              <div className="absolute left-8 top-2 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}