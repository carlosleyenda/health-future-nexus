
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class EmergencyService {
  static async sendAlert(alertData: {
    patientId: string;
    emergencyType: string;
    location: { lat: number; lng: number };
    severity: string;
  }) {
    await delay(1000);
    
    console.log('Enviando alerta de emergencia:', alertData);
    
    return {
      alertId: crypto.randomUUID(),
      status: 'sent',
      estimatedResponse: '8-12 minutos',
      emergencyServices: ['911', 'Cruz Roja', 'Bomberos'],
      timestamp: new Date().toISOString()
    };
  }

  static async getEmergencyContacts(patientId: string) {
    await delay(300);
    return [
      {
        id: 'ec1',
        name: 'María Pérez',
        phone: '+52 55 1234 5678',
        relationship: 'Esposa',
        isPrimary: true
      }
    ];
  }

  static async getEmergencyHistory(patientId: string) {
    await delay(400);
    return [
      {
        id: 'eh1',
        type: 'cardiac',
        date: '2024-05-15T14:30:00Z',
        resolved: true,
        responseTime: '7 minutos'
      }
    ];
  }
}
