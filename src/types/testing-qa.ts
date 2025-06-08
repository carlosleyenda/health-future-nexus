
// Tipos para Testing y Quality Assurance

export interface E2ETestSuite {
  id: string;
  name: string;
  description: string;
  tests: E2ETest[];
  environment: 'development' | 'staging' | 'production';
  browser: string[];
  status: 'pending' | 'running' | 'passed' | 'failed' | 'cancelled';
  startTime?: string;
  endTime?: string;
  duration?: number;
  results: TestResults;
}

export interface E2ETest {
  id: string;
  name: string;
  description: string;
  steps: TestStep[];
  assertions: TestAssertion[];
  status: 'pending' | 'running' | 'passed' | 'failed' | 'skipped';
  duration?: number;
  error?: string;
  screenshots: string[];
  video?: string;
}

export interface TestStep {
  id: string;
  action: 'navigate' | 'click' | 'type' | 'wait' | 'scroll' | 'select';
  selector?: string;
  value?: string;
  timeout?: number;
  description: string;
}

export interface TestAssertion {
  id: string;
  type: 'visible' | 'text' | 'value' | 'url' | 'count' | 'attribute';
  selector?: string;
  expected: any;
  actual?: any;
  passed?: boolean;
  message?: string;
}

export interface TestResults {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  coverage: TestCoverage;
}

export interface TestCoverage {
  statements: number;
  branches: number;
  functions: number;
  lines: number;
}

export interface AccessibilityTest {
  id: string;
  url: string;
  standard: 'WCAG_2_0' | 'WCAG_2_1' | 'WCAG_2_2';
  level: 'A' | 'AA' | 'AAA';
  rules: AccessibilityRule[];
  violations: AccessibilityViolation[];
  score: number;
  timestamp: string;
}

export interface AccessibilityRule {
  id: string;
  description: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  tags: string[];
  enabled: boolean;
}

export interface AccessibilityViolation {
  id: string;
  ruleId: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  help: string;
  helpUrl: string;
  elements: ViolationElement[];
}

export interface ViolationElement {
  selector: string;
  html: string;
  target: string[];
  failureSummary: string;
}

export interface PerformanceTest {
  id: string;
  url: string;
  type: 'load' | 'stress' | 'spike' | 'endurance';
  metrics: PerformanceMetrics;
  thresholds: PerformanceThresholds;
  results: PerformanceResults;
  timestamp: string;
  duration: number;
}

export interface PerformanceMetrics {
  responseTime: number;
  throughput: number;
  errorRate: number;
  resourceUtilization: ResourceUtilization;
  userExperience: UserExperienceMetrics;
}

export interface ResourceUtilization {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export interface UserExperienceMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}

export interface PerformanceThresholds {
  maxResponseTime: number;
  minThroughput: number;
  maxErrorRate: number;
  maxResourceUsage: number;
}

export interface PerformanceResults {
  passed: boolean;
  violations: ThresholdViolation[];
  recommendations: string[];
  bottlenecks: Bottleneck[];
}

export interface ThresholdViolation {
  metric: string;
  threshold: number;
  actual: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface Bottleneck {
  type: 'database' | 'network' | 'cpu' | 'memory' | 'disk';
  description: string;
  impact: number;
  recommendation: string;
}

export interface SecurityTest {
  id: string;
  type: 'vulnerability' | 'penetration' | 'auth' | 'encryption' | 'compliance';
  target: string;
  findings: SecurityFinding[];
  riskScore: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp: string;
  tester: string;
}

export interface SecurityFinding {
  id: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  category: string;
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  references: string[];
  cvss?: number;
  cve?: string;
  location: string;
  evidence: SecurityEvidence[];
}

export interface SecurityEvidence {
  type: 'screenshot' | 'request' | 'response' | 'log';
  content: string;
  description: string;
}
