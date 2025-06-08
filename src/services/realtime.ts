
// Servicio de comunicación en tiempo real para la clínica
export class RealtimeService {
  private static instance: RealtimeService;
  private connection: WebSocket | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService();
    }
    return RealtimeService.instance;
  }

  connect(userId: string) {
    if (this.connection?.readyState === WebSocket.OPEN) {
      return;
    }

    // En un entorno real, esto sería una conexión WebSocket real
    console.log(`Conectando usuario ${userId} al servicio en tiempo real...`);
    
    // Simulación de conexión WebSocket
    this.simulateWebSocketConnection(userId);
  }

  private simulateWebSocketConnection(userId: string) {
    // Simulación de eventos en tiempo real
    setInterval(() => {
      this.notifyListeners('appointment_update', {
        type: 'appointment_confirmed',
        appointmentId: 'apt1',
        message: 'Tu cita ha sido confirmada por el doctor'
      });
    }, 30000); // Cada 30 segundos

    setInterval(() => {
      this.notifyListeners('health_alert', {
        type: 'vital_signs_alert',
        message: 'Recordatorio: Registra tus signos vitales',
        severity: 'low'
      });
    }, 60000); // Cada minuto
  }

  subscribe(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Retornar función de cleanup
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  private notifyListeners(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  // Enviar mensaje en video consulta
  sendMessage(appointmentId: string, message: string, senderId: string) {
    console.log(`Enviando mensaje en consulta ${appointmentId}:`, message);
    
    this.notifyListeners('consultation_message', {
      appointmentId,
      message,
      senderId,
      timestamp: new Date().toISOString()
    });
  }

  // Iniciar video llamada
  initiateVideoCall(appointmentId: string, doctorId: string, patientId: string) {
    console.log(`Iniciando videollamada para cita ${appointmentId}`);
    
    this.notifyListeners('video_call_started', {
      appointmentId,
      doctorId,
      patientId,
      roomId: `room_${appointmentId}`,
      timestamp: new Date().toISOString()
    });
  }

  // Compartir pantalla durante consulta
  shareScreen(appointmentId: string, userId: string) {
    this.notifyListeners('screen_share', {
      appointmentId,
      userId,
      action: 'start_sharing'
    });
  }

  // Finalizar video llamada
  endVideoCall(appointmentId: string) {
    this.notifyListeners('video_call_ended', {
      appointmentId,
      timestamp: new Date().toISOString()
    });
  }

  // Enviar alerta médica de emergencia
  sendEmergencyAlert(patientId: string, type: string, data: any) {
    console.log(`Alerta de emergencia para paciente ${patientId}:`, type);
    
    this.notifyListeners('emergency_alert', {
      patientId,
      type,
      data,
      timestamp: new Date().toISOString(),
      priority: 'high'
    });
  }

  disconnect() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
    this.listeners.clear();
  }
}

// Hook para usar el servicio de tiempo real
export const useRealtime = (userId: string) => {
  const realtimeService = RealtimeService.getInstance();

  React.useEffect(() => {
    if (userId) {
      realtimeService.connect(userId);
    }

    return () => {
      // No desconectar aquí para mantener la conexión activa
    };
  }, [userId, realtimeService]);

  return realtimeService;
};
