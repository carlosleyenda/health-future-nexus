
// Servicio para integración con Fitbit

import type { FitbitDevice, IoTDeviceReading } from '@/types/iot-devices';

export class FitbitService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = process.env.FITBIT_CLIENT_ID || '';
    this.clientSecret = process.env.FITBIT_CLIENT_SECRET || '';
    this.redirectUri = process.env.FITBIT_REDIRECT_URI || '';
  }

  getAuthUrl(userId: string): string {
    const scopes = [
      'activity',
      'heartrate',
      'location',
      'nutrition',
      'profile',
      'settings',
      'sleep',
      'social',
      'weight'
    ].join('%20');

    return `https://www.fitbit.com/oauth2/authorize?` +
      `response_type=code&` +
      `client_id=${this.clientId}&` +
      `redirect_uri=${encodeURIComponent(this.redirectUri)}&` +
      `scope=${scopes}&` +
      `state=${userId}`;
  }

  async exchangeCodeForTokens(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
    userId: string;
    expiresIn: number;
  }> {
    const response = await fetch('https://api.fitbit.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
        code: code
      })
    });

    if (!response.ok) {
      throw new Error(`Fitbit OAuth error: ${response.status}`);
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      userId: data.user_id,
      expiresIn: data.expires_in
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }> {
    const response = await fetch('https://api.fitbit.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    });

    if (!response.ok) {
      throw new Error(`Fitbit token refresh error: ${response.status}`);
    }

    return response.json();
  }

  async getHeartRateData(accessToken: string, date: string): Promise<IoTDeviceReading[]> {
    const response = await fetch(
      `https://api.fitbit.com/1/user/-/activities/heart/date/${date}/1d/1min.json`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Fitbit API error: ${response.status}`);
    }

    const data = await response.json();
    return this.transformHeartRateData(data);
  }

  async getStepsData(accessToken: string, date: string): Promise<IoTDeviceReading[]> {
    const response = await fetch(
      `https://api.fitbit.com/1/user/-/activities/steps/date/${date}/1d/15min.json`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Fitbit API error: ${response.status}`);
    }

    const data = await response.json();
    return this.transformStepsData(data);
  }

  async getSleepData(accessToken: string, date: string): Promise<IoTDeviceReading[]> {
    const response = await fetch(
      `https://api.fitbit.com/1.2/user/-/sleep/date/${date}.json`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Fitbit API error: ${response.status}`);
    }

    const data = await response.json();
    return this.transformSleepData(data);
  }

  async subscribeToUpdates(accessToken: string, subscriptionId: string): Promise<boolean> {
    const response = await fetch(
      `https://api.fitbit.com/1/user/-/activities/apiSubscriptions/${subscriptionId}.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    return response.ok;
  }

  private transformHeartRateData(data: any): IoTDeviceReading[] {
    if (!data['activities-heart-intraday']?.dataset) return [];

    return data['activities-heart-intraday'].dataset.map((entry: any) => ({
      deviceId: 'fitbit-hr',
      timestamp: `${data['activities-heart'][0]?.dateTime}T${entry.time}`,
      readings: {
        heart_rate: {
          value: entry.value,
          unit: 'bpm'
        }
      },
      rawData: entry,
      processed: false
    }));
  }

  private transformStepsData(data: any): IoTDeviceReading[] {
    if (!data['activities-steps-intraday']?.dataset) return [];

    return data['activities-steps-intraday'].dataset.map((entry: any) => ({
      deviceId: 'fitbit-steps',
      timestamp: `${data['activities-steps'][0]?.dateTime}T${entry.time}`,
      readings: {
        steps: {
          value: entry.value,
          unit: 'steps'
        }
      },
      rawData: entry,
      processed: false
    }));
  }

  private transformSleepData(data: any): IoTDeviceReading[] {
    if (!data.sleep?.length) return [];

    return data.sleep.flatMap((sleep: any) => 
      sleep.minuteData?.map((minute: any) => ({
        deviceId: 'fitbit-sleep',
        timestamp: minute.dateTime,
        readings: {
          sleep_stage: {
            value: this.mapSleepStage(minute.value),
            unit: 'stage'
          }
        },
        rawData: minute,
        processed: false
      })) || []
    );
  }

  private mapSleepStage(value: string): number {
    const stageMap: Record<string, number> = {
      'asleep': 1,
      'restless': 2,
      'awake': 3
    };
    return stageMap[value] || 0;
  }
}

export const fitbitService = new FitbitService();
