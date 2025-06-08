
// Servicio para Automatización Avanzada

import type { DroneDelivery, PharmacyRobot, TriageAI } from '@/types/automation';

export class AutomationService {
  private apiKey: string;

  constructor(apiKey: string = process.env.AUTOMATION_API_KEY || '') {
    this.apiKey = apiKey;
  }

  // Drone Delivery Services
  async dispatchDrone(delivery: Partial<DroneDelivery>): Promise<DroneDelivery> {
    const response = await fetch('/api/automation/drone/dispatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(delivery)
    });

    if (!response.ok) {
      throw new Error(`Drone Dispatch error: ${response.status}`);
    }

    return response.json();
  }

  async trackDrone(droneId: string): Promise<DroneDelivery> {
    const response = await fetch(`/api/automation/drone/${droneId}/track`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Drone Tracking error: ${response.status}`);
    }

    return response.json();
  }

  async checkDroneAvailability(location: { lat: number; lng: number }): Promise<{
    available: boolean;
    eta: number;
    weather: boolean;
  }> {
    const response = await fetch('/api/automation/drone/availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(location)
    });

    if (!response.ok) {
      throw new Error(`Drone Availability error: ${response.status}`);
    }

    return response.json();
  }

  // Pharmacy Robot Services
  async assignRobotTask(robotId: string, task: any): Promise<PharmacyRobot> {
    const response = await fetch(`/api/automation/robot/${robotId}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(task)
    });

    if (!response.ok) {
      throw new Error(`Robot Task error: ${response.status}`);
    }

    return response.json();
  }

  async getRobotStatus(robotId: string): Promise<PharmacyRobot> {
    const response = await fetch(`/api/automation/robot/${robotId}/status`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Robot Status error: ${response.status}`);
    }

    return response.json();
  }

  async optimizeRobotWorkflow(pharmacyId: string): Promise<{ optimized: boolean; savings: number }> {
    const response = await fetch(`/api/automation/robot/optimize/${pharmacyId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Robot Optimization error: ${response.status}`);
    }

    return response.json();
  }

  // AI Triage Services
  async performTriage(patientData: any): Promise<TriageAI> {
    const response = await fetch('/api/automation/triage/assess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(patientData)
    });

    if (!response.ok) {
      throw new Error(`AI Triage error: ${response.status}`);
    }

    return response.json();
  }

  async getTriageHistory(patientId: string): Promise<TriageAI[]> {
    const response = await fetch(`/api/automation/triage/history/${patientId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Triage History error: ${response.status}`);
    }

    return response.json();
  }

  async updateTriageModel(trainingData: any): Promise<{ updated: boolean; accuracy: number }> {
    const response = await fetch('/api/automation/triage/update-model', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(trainingData)
    });

    if (!response.ok) {
      throw new Error(`Triage Model Update error: ${response.status}`);
    }

    return response.json();
  }
}

export const automationService = new AutomationService();
