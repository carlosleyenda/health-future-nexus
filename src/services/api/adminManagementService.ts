
import { delay } from '@/lib/delay';
import type { CreateUserForm, SystemConfig, ReportData, DatabaseStats } from '@/types/admin';
import type { User } from '@/types';

export class AdminManagementService {
  static async createUser(userData: CreateUserForm): Promise<User> {
    await delay(800);
    
    // Simular creación de usuario
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      isActive: true,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return newUser;
  }

  static async getAllUsers(page = 1, limit = 10, search = ''): Promise<{
    users: User[];
    total: number;
    totalPages: number;
  }> {
    await delay(400);
    
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'juan.perez@example.com',
        role: 'patient',
        firstName: 'Juan',
        lastName: 'Pérez',
        phone: '+52 55 1234 5678',
        isActive: true,
        onboardingCompleted: true,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        email: 'dra.garcia@example.com',
        role: 'doctor',
        firstName: 'María',
        lastName: 'García',
        phone: '+52 55 2345 6789',
        isActive: true,
        onboardingCompleted: true,
        createdAt: '2024-01-20T14:30:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
      },
      {
        id: '3',
        email: 'admin@clinica.com',
        role: 'admin',
        firstName: 'Carlos',
        lastName: 'Administrador',
        phone: '+52 55 3456 7890',
        isActive: true,
        onboardingCompleted: true,
        createdAt: '2024-01-10T09:00:00Z',
        updatedAt: '2024-01-10T09:00:00Z',
      },
    ];

    const filteredUsers = search
      ? mockUsers.filter(user =>
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        )
      : mockUsers;

    const startIndex = (page - 1) * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

    return {
      users: paginatedUsers,
      total: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / limit),
    };
  }

  static async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    await delay(600);
    
    return {
      id: userId,
      email: userData.email || 'updated@example.com',
      role: userData.role || 'patient',
      firstName: userData.firstName || 'Updated',
      lastName: userData.lastName || 'User',
      phone: userData.phone || '+52 55 0000 0000',
      isActive: userData.isActive ?? true,
      onboardingCompleted: userData.onboardingCompleted ?? true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: new Date().toISOString(),
    };
  }

  static async deleteUser(userId: string): Promise<void> {
    await delay(500);
    console.log(`Usuario ${userId} eliminado`);
  }

  static async getSystemConfig(): Promise<SystemConfig> {
    await delay(300);
    
    return {
      id: 'system-config-1',
      consultationFee: 800,
      emergencyFee: 1200,
      followUpFee: 400,
      businessHours: {
        start: '08:00',
        end: '20:00',
      },
      weekends: true,
      maxAppointmentsPerDay: 15,
      appointmentDuration: 30,
      currency: 'MXN',
      taxRate: 16,
      companyInfo: {
        name: 'Clínica Virtual Premium',
        address: 'Av. Reforma 123, Ciudad de México, CDMX',
        phone: '+52 55 1234 5678',
        email: 'contacto@clinicavirtual.com',
        website: 'https://clinicavirtual.com',
      },
    };
  }

  static async updateSystemConfig(config: Partial<SystemConfig>): Promise<SystemConfig> {
    await delay(800);
    
    const currentConfig = await this.getSystemConfig();
    return { ...currentConfig, ...config };
  }

  static async generateReport(type: string, dateRange: { start: string; end: string }, format: string): Promise<ReportData> {
    await delay(1500);
    
    const mockData = {
      users: [
        { id: 1, name: 'Juan Pérez', email: 'juan@test.com', role: 'patient', registeredAt: '2024-01-15' },
        { id: 2, name: 'María García', email: 'maria@test.com', role: 'doctor', registeredAt: '2024-01-20' },
      ],
      appointments: [
        { id: 1, patient: 'Juan Pérez', doctor: 'María García', date: '2024-01-25', status: 'completed' },
        { id: 2, patient: 'Ana López', doctor: 'Carlos Rodríguez', date: '2024-01-26', status: 'scheduled' },
      ],
      revenue: [
        { month: 'Enero', income: 45000, expenses: 12000, profit: 33000 },
        { month: 'Febrero', income: 52000, expenses: 15000, profit: 37000 },
      ],
    };

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: type as 'users' | 'appointments' | 'revenue' | 'medications',
      dateRange,
      format: format as 'pdf' | 'csv' | 'excel',
      data: mockData[type as keyof typeof mockData] || [],
    };
  }

  static async getDatabaseStats(): Promise<DatabaseStats> {
    await delay(400);
    
    return {
      tables: [
        { name: 'users', records: 1520, size: '2.4 MB' },
        { name: 'appointments', records: 8935, size: '5.2 MB' },
        { name: 'medications', records: 450, size: '1.1 MB' },
        { name: 'prescriptions', records: 3220, size: '3.8 MB' },
      ],
      totalSize: '12.5 MB',
      lastBackup: '2024-01-28T02:00:00Z',
      performance: {
        queryTime: 145,
        connections: 24,
      },
    };
  }

  static async backupDatabase(): Promise<void> {
    await delay(2000);
    console.log('Base de datos respaldada exitosamente');
  }

  static async optimizeDatabase(): Promise<void> {
    await delay(1500);
    console.log('Base de datos optimizada');
  }
}
