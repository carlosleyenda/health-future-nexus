
import { delay } from '@/lib/utils';

export interface AdminStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  revenue: number;
  appointmentsToday: number;
  newPatientsThisMonth: number;
}

export interface UserManagement {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  lastLogin: string;
}

export class AdminService {
  static async getDashboardStats(): Promise<AdminStats> {
    await delay(400);
    return {
      totalPatients: 1250,
      totalDoctors: 45,
      totalAppointments: 3420,
      revenue: 285000,
      appointmentsToday: 12,
      newPatientsThisMonth: 89
    };
  }

  static async getRevenueAnalytics(period: string) {
    await delay(500);
    return [
      { month: 'Enero', revenue: 45000, appointments: 320 },
      { month: 'Febrero', revenue: 52000, appointments: 380 },
      { month: 'Marzo', revenue: 48000, appointments: 360 }
    ];
  }

  static async getUserManagement(): Promise<UserManagement[]> {
    await delay(600);
    return [
      {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan@test.com',
        role: 'patient',
        status: 'active',
        lastLogin: '2024-06-08T10:00:00Z'
      }
    ];
  }

  static async updateUserStatus(userId: string, status: 'active' | 'suspended'): Promise<boolean> {
    await delay(300);
    return true;
  }
}
