
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class NotificationService {
  static async sendAppointmentConfirmation(appointmentId: string): Promise<boolean> {
    await delay(200);
    console.log(`Enviando confirmación de cita: ${appointmentId}`);
    return true;
  }

  static async sendAppointmentReminder(appointmentId: string): Promise<boolean> {
    await delay(200);
    console.log(`Enviando recordatorio de cita: ${appointmentId}`);
    return true;
  }

  static async sendPrescriptionNotification(prescriptionId: string): Promise<boolean> {
    await delay(200);
    console.log(`Enviando notificación de prescripción: ${prescriptionId}`);
    return true;
  }
}
