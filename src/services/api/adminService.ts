
import { delay } from '@/lib/delay';

export class AdminService {
  static async getAnalytics() {
    await delay(300);
    return {
      totalUsers: 15420,
      activeUsers: 8932,
      totalAppointments: 45236,
      appointmentsThisMonth: 1234,
      revenue: 2340000,
      satisfaction: 89.5,
      patientsGrowth: 12.5,
      doctorsGrowth: 8.3,
      appointmentsGrowth: 15.7,
      revenueGrowth: 22.1,
      revenueChart: [
        { month: 'Ene', revenue: 180000 },
        { month: 'Feb', revenue: 195000 },
        { month: 'Mar', revenue: 210000 },
        { month: 'Abr', revenue: 225000 },
        { month: 'May', revenue: 240000 },
        { month: 'Jun', revenue: 234000 },
      ],
      appointmentsChart: [
        { month: 'Ene', appointments: 1200 },
        { month: 'Feb', appointments: 1350 },
        { month: 'Mar', appointments: 1180 },
        { month: 'Abr', appointments: 1420 },
        { month: 'May', appointments: 1380 },
        { month: 'Jun', appointments: 1234 },
      ],
      specialtyDistribution: [
        { name: 'Medicina General', value: 35 },
        { name: 'Cardiología', value: 20 },
        { name: 'Dermatología', value: 15 },
        { name: 'Neurología', value: 15 },
        { name: 'Otros', value: 15 },
      ],
    };
  }

  static async getSystemHealth() {
    await delay(200);
    return {
      status: 'healthy' as const,
      uptime: '99.9%',
      responseTime: 120,
      activeConnections: 1420,
      serverLoad: 65,
      cpu: 45,
      memory: 67,
      activeUsers: 892,
      alerts: [
        { id: '1', message: 'High CPU usage detected', severity: 'warning' },
      ],
    };
  }

  static async getAllUsers() {
    await delay(400);
    return [
      { id: '1', name: 'Juan Pérez', email: 'juan@test.com', role: 'patient', status: 'active' },
      { id: '2', name: 'María García', email: 'maria@test.com', role: 'doctor', status: 'active' },
      { id: '3', name: 'Carlos Admin', email: 'admin@test.com', role: 'admin', status: 'active' },
    ];
  }
}
