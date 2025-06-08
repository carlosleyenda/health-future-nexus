
import { delay } from '@/lib/delay';

export class AdminService {
  static async getAnalytics() {
    await delay(300);
    return {
      totalUsers: 15420,
      activeUsers: 8932,
      totalAppointments: 45236,
      revenue: 2340000,
      patientsGrowth: 12.5,
      doctorsGrowth: 8.3,
      appointmentsGrowth: 15.7,
      revenueGrowth: 22.1,
    };
  }

  static async getSystemHealth() {
    await delay(200);
    return {
      status: 'healthy' as const,
      uptime: '99.9%',
      responseTime: '120ms',
      activeConnections: 1420,
      serverLoad: 65,
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
