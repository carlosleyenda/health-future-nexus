
// Servicio para Testing y Quality Assurance

import type { 
  E2ETestSuite, 
  AccessibilityTest, 
  PerformanceTest, 
  SecurityTest 
} from '@/types/testing-qa';

export class QAService {
  private apiKey: string;

  constructor(apiKey: string = process.env.QA_API_KEY || '') {
    this.apiKey = apiKey;
  }

  // E2E Testing with Playwright
  async runE2ETests(suiteId: string, environment: string): Promise<E2ETestSuite> {
    const response = await fetch('/api/testing/e2e/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ suiteId, environment })
    });

    if (!response.ok) {
      throw new Error(`E2E Testing error: ${response.status}`);
    }

    return response.json();
  }

  async getE2EResults(suiteId: string): Promise<E2ETestSuite> {
    const response = await fetch(`/api/testing/e2e/results/${suiteId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`E2E Results error: ${response.status}`);
    }

    return response.json();
  }

  // Accessibility Testing (WCAG Compliance)
  async runAccessibilityTest(url: string, standard: string): Promise<AccessibilityTest> {
    const response = await fetch('/api/testing/accessibility/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ url, standard })
    });

    if (!response.ok) {
      throw new Error(`Accessibility Testing error: ${response.status}`);
    }

    return response.json();
  }

  async getAccessibilityReport(testId: string): Promise<AccessibilityTest> {
    const response = await fetch(`/api/testing/accessibility/report/${testId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Accessibility Report error: ${response.status}`);
    }

    return response.json();
  }

  // Performance Testing
  async runPerformanceTest(config: {
    url: string;
    type: string;
    users: number;
    duration: number;
  }): Promise<PerformanceTest> {
    const response = await fetch('/api/testing/performance/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(config)
    });

    if (!response.ok) {
      throw new Error(`Performance Testing error: ${response.status}`);
    }

    return response.json();
  }

  async getPerformanceMetrics(testId: string): Promise<PerformanceTest> {
    const response = await fetch(`/api/testing/performance/metrics/${testId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Performance Metrics error: ${response.status}`);
    }

    return response.json();
  }

  // Security Testing (Penetration Testing)
  async runSecurityTest(target: string, testType: string): Promise<SecurityTest> {
    const response = await fetch('/api/testing/security/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ target, testType })
    });

    if (!response.ok) {
      throw new Error(`Security Testing error: ${response.status}`);
    }

    return response.json();
  }

  async getSecurityFindings(testId: string): Promise<SecurityTest> {
    const response = await fetch(`/api/testing/security/findings/${testId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Security Findings error: ${response.status}`);
    }

    return response.json();
  }

  // Test Management
  async scheduleTests(schedule: {
    testType: string;
    frequency: string;
    environment: string;
    notifications: string[];
  }): Promise<{ scheduled: boolean; nextRun: string }> {
    const response = await fetch('/api/testing/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(schedule)
    });

    if (!response.ok) {
      throw new Error(`Test Scheduling error: ${response.status}`);
    }

    return response.json();
  }

  async generateQAReport(period: string): Promise<{
    coverage: number;
    reliability: number;
    performance: number;
    security: number;
    accessibility: number;
    recommendations: string[];
  }> {
    const response = await fetch(`/api/testing/qa-report/${period}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`QA Report error: ${response.status}`);
    }

    return response.json();
  }
}

export const qaService = new QAService();
