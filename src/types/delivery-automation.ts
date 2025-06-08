
// Automated Medical Delivery System Types

export interface DroneFleet {
  id: string;
  fleetName: string;
  operatorId: string;
  drones: MedicalDrone[];
  operationalRadius: number; // kilometers
  maxDailyDeliveries: number;
  currentDeliveries: number;
  status: 'active' | 'maintenance' | 'grounded' | 'emergency';
  baseLocation: {
    latitude: number;
    longitude: number;
    altitude: number;
    name: string;
  };
  weatherConditions: WeatherData;
  flightRestrictions: FlightRestriction[];
  certifications: string[];
  insurance: {
    provider: string;
    policyNumber: string;
    coverage: number;
    expiresAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MedicalDrone {
  id: string;
  fleetId: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  registrationNumber: string;
  status: 'available' | 'in_flight' | 'maintenance' | 'charging' | 'emergency';
  currentLocation: {
    latitude: number;
    longitude: number;
    altitude: number;
    heading: number;
    speed: number;
  };
  batteryLevel: number;
  flightHours: number;
  maxPayload: number; // kilograms
  maxRange: number; // kilometers
  operatingTemperature: {
    min: number;
    max: number;
  };
  cargo: {
    compartments: DroneCompartment[];
    temperatureControl: boolean;
    currentTemperature?: number;
    humidity?: number;
  };
  sensors: {
    gps: boolean;
    lidar: boolean;
    camera: boolean;
    thermalCamera: boolean;
    collisionAvoidance: boolean;
    weatherSensors: boolean;
  };
  flightData: {
    totalFlights: number;
    totalDistance: number;
    averageSpeed: number;
    lastMaintenance: string;
    nextMaintenance: string;
  };
  currentDelivery?: string; // delivery ID
  emergencyProtocols: string[];
  certifications: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DroneCompartment {
  id: string;
  size: 'small' | 'medium' | 'large';
  temperatureControlled: boolean;
  targetTemperature?: number;
  currentTemperature?: number;
  isOccupied: boolean;
  contents?: {
    itemId: string;
    itemType: 'medication' | 'blood_product' | 'sample' | 'equipment' | 'organ';
    description: string;
    weight: number;
    value: number;
    requirements: string[];
  };
  securityLevel: 'standard' | 'high' | 'critical';
  accessLog: {
    timestamp: string;
    action: 'loaded' | 'unloaded' | 'inspected';
    userId: string;
    location: string;
  }[];
}

export interface AutonomousVehicle {
  id: string;
  type: 'ground_robot' | 'delivery_van' | 'autonomous_car';
  model: string;
  manufacturer: string;
  licensePlate?: string;
  status: 'available' | 'in_transit' | 'loading' | 'unloading' | 'charging' | 'maintenance';
  currentLocation: {
    latitude: number;
    longitude: number;
    address: string;
    heading: number;
    speed: number;
  };
  batteryLevel?: number;
  fuelLevel?: number;
  maxPayload: number;
  operatingRadius: number;
  cargo: {
    compartments: VehicleCompartment[];
    temperatureControl: boolean;
    securityFeatures: string[];
  };
  sensors: {
    gps: boolean;
    cameras: number;
    lidar: boolean;
    radar: boolean;
    ultrasonic: boolean;
    temperatureSensors: boolean;
  };
  autonomyLevel: 1 | 2 | 3 | 4 | 5; // SAE levels
  safetyFeatures: string[];
  currentDeliveries: string[];
  routeOptimization: {
    algorithm: string;
    lastOptimized: string;
    efficiency: number;
  };
  maintenanceSchedule: {
    lastService: string;
    nextService: string;
    serviceIntervalKm: number;
    currentKm: number;
  };
  certifications: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VehicleCompartment {
  id: string;
  size: 'extra_small' | 'small' | 'medium' | 'large' | 'extra_large';
  temperatureControlled: boolean;
  targetTemperature?: number;
  currentTemperature?: number;
  humidity?: number;
  isOccupied: boolean;
  securityLevel: 'standard' | 'high' | 'critical';
  lockMechanism: 'electronic' | 'biometric' | 'dual_factor';
  contents?: {
    deliveryId: string;
    itemType: string;
    description: string;
    weight: number;
    specialRequirements: string[];
  };
  accessHistory: {
    timestamp: string;
    action: string;
    authorizedBy: string;
    location: string;
  }[];
}

export interface SmartLocker {
  id: string;
  networkId: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    facilityType: 'hospital' | 'pharmacy' | 'clinic' | 'residential' | 'office';
  };
  lockers: LockerCompartment[];
  status: 'operational' | 'maintenance' | 'offline' | 'full';
  powerSource: 'grid' | 'solar' | 'battery' | 'hybrid';
  connectivity: 'wifi' | '4g' | '5g' | 'ethernet';
  securityFeatures: {
    cameras: number;
    motionSensors: boolean;
    alarmSystem: boolean;
    biometricAccess: boolean;
    encryptedCommunication: boolean;
  };
  temperatureZones: TemperatureZone[];
  accessControl: {
    authMethods: string[];
    accessCodes: boolean;
    mobileApp: boolean;
    qrCodes: boolean;
  };
  maintenanceHistory: {
    date: string;
    type: string;
    performedBy: string;
    notes: string;
  }[];
  utilizationStats: {
    daily: number;
    weekly: number;
    monthly: number;
    peak_hours: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface LockerCompartment {
  id: string;
  smartLockerId: string;
  size: 'small' | 'medium' | 'large';
  temperatureZone?: string;
  currentTemperature?: number;
  humidity?: number;
  isOccupied: boolean;
  reservation?: {
    deliveryId: string;
    patientId: string;
    expiresAt: string;
    accessCode: string;
  };
  lastAccess: string;
  accessHistory: {
    timestamp: string;
    action: 'opened' | 'closed' | 'accessed';
    userId?: string;
    method: string;
  }[];
  contents?: {
    itemType: string;
    description: string;
    weight: number;
    value: number;
    specialInstructions: string[];
  };
  securityEvents: {
    timestamp: string;
    eventType: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    resolved: boolean;
  }[];
}

export interface TemperatureZone {
  id: string;
  name: string;
  targetTemperature: number;
  toleranceRange: number;
  currentTemperature: number;
  humidity: number;
  compartments: string[];
  alerts: {
    temperatureAlerts: boolean;
    humidityAlerts: boolean;
    powerFailureAlerts: boolean;
  };
  backupSystems: string[];
}

export interface WeatherData {
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
  };
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    visibility: number;
    precipitation: number;
    cloudCover: number;
    pressure: number;
  };
  forecast: {
    hourly: HourlyForecast[];
    alerts: WeatherAlert[];
  };
  flightConditions: {
    suitable: boolean;
    restrictions: string[];
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  windSpeed: number;
  precipitation: number;
  visibility: number;
  flightSuitability: boolean;
}

export interface WeatherAlert {
  id: string;
  type: 'storm' | 'wind' | 'fog' | 'ice' | 'extreme_temperature';
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  description: string;
  startTime: string;
  endTime: string;
  affectedAreas: string[];
  flightImpact: 'none' | 'limited' | 'suspended' | 'grounded';
}

export interface FlightRestriction {
  id: string;
  type: 'no_fly_zone' | 'temporary_restriction' | 'altitude_limit' | 'time_restriction';
  coordinates: {
    polygon?: { latitude: number; longitude: number }[];
    center?: { latitude: number; longitude: number };
    radius?: number;
  };
  altitudeRange?: {
    minimum: number;
    maximum: number;
  };
  timeRestrictions?: {
    startTime: string;
    endTime: string;
    daysOfWeek: number[];
  };
  reason: string;
  authority: 'faa' | 'local' | 'military' | 'emergency';
  severity: 'advisory' | 'restricted' | 'prohibited';
  effectiveDate: string;
  expirationDate?: string;
  exemptions: string[];
}

export interface AutomatedDelivery {
  id: string;
  deliveryServiceId: string;
  type: 'drone' | 'autonomous_vehicle' | 'robot' | 'smart_locker';
  status: 'scheduled' | 'preparing' | 'in_transit' | 'delivered' | 'failed' | 'cancelled';
  priority: 'routine' | 'urgent' | 'emergency' | 'critical';
  assignedVehicle?: string; // drone ID or vehicle ID
  route: DeliveryRoute;
  cargo: DeliveryCargo;
  timeline: {
    scheduled: string;
    prepared: string;
    dispatched: string;
    estimated_arrival: string;
    delivered: string;
  };
  tracking: TrackingData;
  proofOfDelivery: ProofOfDelivery;
  qualityChecks: QualityCheck[];
  compliance: ComplianceCheck[];
  costAnalysis: {
    operationalCost: number;
    fuelCost: number;
    laborCost: number;
    maintenanceCost: number;
    totalCost: number;
    costPerKm: number;
  };
  environmentalImpact: {
    carbonFootprint: number;
    energyConsumption: number;
    noiseLevel: number;
  };
  customerExperience: {
    notificationsSent: number;
    customerRating?: number;
    feedback?: string;
    issuesReported: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryRoute {
  id: string;
  origin: {
    latitude: number;
    longitude: number;
    address: string;
    facilityType: string;
  };
  destination: {
    latitude: number;
    longitude: number;
    address: string;
    facilityType: string;
  };
  waypoints: {
    latitude: number;
    longitude: number;
    purpose: 'fuel' | 'charging' | 'pickup' | 'dropoff' | 'maintenance';
    estimatedArrival: string;
  }[];
  optimizedPath: {
    latitude: number;
    longitude: number;
    altitude?: number;
  }[];
  distance: number;
  estimatedDuration: number;
  trafficConditions: 'light' | 'moderate' | 'heavy' | 'severe';
  weatherImpact: 'none' | 'minor' | 'moderate' | 'severe';
  restrictions: string[];
  alternativeRoutes: AlternativeRoute[];
  realTimeUpdates: {
    timestamp: string;
    position: { latitude: number; longitude: number };
    speed: number;
    estimatedArrival: string;
    delays: string[];
  }[];
}

export interface AlternativeRoute {
  id: string;
  reason: string;
  path: { latitude: number; longitude: number }[];
  distance: number;
  duration: number;
  riskLevel: 'low' | 'medium' | 'high';
  costImpact: number;
}

export interface DeliveryCargo {
  id: string;
  items: CargoItem[];
  totalWeight: number;
  totalVolume: number;
  totalValue: number;
  temperatureRequirements: {
    minimum: number;
    maximum: number;
    critical: boolean;
  };
  handlingInstructions: string[];
  securityLevel: 'standard' | 'high' | 'critical';
  specialRequirements: string[];
  packaging: {
    type: 'standard' | 'insulated' | 'climate_controlled' | 'secure';
    materials: string[];
    sustainability: string[];
  };
  chainOfCustody: CustodyRecord[];
}

export interface CargoItem {
  id: string;
  type: 'medication' | 'blood_product' | 'organ' | 'sample' | 'equipment' | 'supplies';
  name: string;
  description: string;
  quantity: number;
  weight: number;
  volume: number;
  value: number;
  expirationDate?: string;
  batchNumber?: string;
  serialNumber?: string;
  temperatureRange?: {
    minimum: number;
    maximum: number;
  };
  handlingRequirements: string[];
  regulatoryInfo: {
    controlledSubstance: boolean;
    prescriptionRequired: boolean;
    licenses: string[];
    permits: string[];
  };
  trackingNumber: string;
  qrCode: string;
  rfidTag?: string;
}

export interface CustodyRecord {
  timestamp: string;
  location: string;
  transferredFrom: string;
  transferredTo: string;
  condition: 'excellent' | 'good' | 'acceptable' | 'damaged';
  temperature?: number;
  humidity?: number;
  notes: string;
  digitalSignature: string;
  photo?: string;
}

export interface TrackingData {
  currentLocation: {
    latitude: number;
    longitude: number;
    address: string;
    timestamp: string;
  };
  locationHistory: {
    latitude: number;
    longitude: number;
    timestamp: string;
    event: string;
  }[];
  statusUpdates: {
    timestamp: string;
    status: string;
    description: string;
    location: string;
  }[];
  sensorData: {
    timestamp: string;
    temperature: number;
    humidity: number;
    vibration: number;
    tilt: number;
    shock: number;
  }[];
  communicationLog: {
    timestamp: string;
    type: 'sms' | 'email' | 'push' | 'voice';
    recipient: string;
    message: string;
    delivered: boolean;
  }[];
}

export interface ProofOfDelivery {
  id: string;
  deliveryId: string;
  timestamp: string;
  method: 'signature' | 'photo' | 'gps' | 'biometric' | 'access_code';
  recipient: {
    name: string;
    id: string;
    relationship: 'patient' | 'caregiver' | 'medical_staff' | 'facility';
  };
  location: {
    latitude: number;
    longitude: number;
    address: string;
    verified: boolean;
  };
  evidence: {
    signature?: string;
    photo?: string;
    biometricData?: string;
    accessCode?: string;
    witnessSignature?: string;
  };
  condition: {
    packaging: 'intact' | 'damaged' | 'tampered';
    temperature: 'within_range' | 'out_of_range';
    quantity: 'complete' | 'partial' | 'missing';
  };
  digitalCertificate: string;
  blockchainHash?: string;
  legallyBinding: boolean;
}

export interface QualityCheck {
  id: string;
  checkpoint: 'origin' | 'transit' | 'destination';
  timestamp: string;
  performedBy: string;
  checklist: {
    item: string;
    status: 'pass' | 'fail' | 'warning';
    notes?: string;
  }[];
  temperature: {
    recorded: number;
    expected: number;
    withinRange: boolean;
  };
  packaging: {
    integrity: 'intact' | 'damaged' | 'compromised';
    seals: 'intact' | 'broken' | 'tampered';
    labeling: 'correct' | 'incorrect' | 'missing';
  };
  documentation: {
    complete: boolean;
    accurate: boolean;
    legible: boolean;
    missingItems: string[];
  };
  overallScore: number;
  passed: boolean;
  corrective_actions: string[];
}

export interface ComplianceCheck {
  id: string;
  regulation: 'faa_part_107' | 'dot_hazmat' | 'fda_drug_transport' | 'hipaa' | 'gdpr';
  status: 'compliant' | 'non_compliant' | 'pending_review';
  checkpoints: {
    requirement: string;
    status: 'met' | 'not_met' | 'partial';
    evidence: string;
    notes?: string;
  }[];
  certifications: {
    name: string;
    number: string;
    expirationDate: string;
    valid: boolean;
  }[];
  auditTrail: {
    timestamp: string;
    action: string;
    user: string;
    details: string;
  }[];
  riskAssessment: {
    level: 'low' | 'medium' | 'high' | 'critical';
    factors: string[];
    mitigation: string[];
  };
  reportGenerated: boolean;
  reportUrl?: string;
}

// Supply Chain Types
export interface SupplyChainHub {
  id: string;
  name: string;
  type: 'central_warehouse' | 'regional_hub' | 'local_depot' | 'micro_fulfillment';
  location: {
    latitude: number;
    longitude: number;
    address: string;
    timezone: string;
  };
  capacity: {
    volume: number;
    weight: number;
    temperatureZones: number;
    automationLevel: number;
  };
  inventory: InventoryItem[];
  equipment: {
    drones: number;
    vehicles: number;
    robots: number;
    chargers: number;
    loading_bays: number;
  };
  staff: {
    total: number;
    shifts: number;
    specializations: string[];
  };
  operatingHours: {
    weekdays: { open: string; close: string };
    weekends: { open: string; close: string };
    holidays: { open: string; close: string };
  };
  connectivity: {
    internet: boolean;
    cellular: boolean;
    satellite: boolean;
    emergencyComm: boolean;
  };
  securityFeatures: string[];
  certifications: string[];
  performanceMetrics: {
    throughput: number;
    accuracy: number;
    uptime: number;
    customerSatisfaction: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  hubId: string;
  productId: string;
  name: string;
  description: string;
  category: string;
  currentStock: number;
  reservedStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  unit: string;
  weightPerUnit: number;
  volumePerUnit: number;
  valuePerUnit: number;
  location: {
    zone: string;
    aisle: string;
    shelf: string;
    bin: string;
  };
  conditions: {
    temperature: number;
    humidity: number;
    lightSensitive: boolean;
    shockSensitive: boolean;
  };
  expirationTracking: {
    hasExpiration: boolean;
    batches: ExpirationBatch[];
    fefoRotation: boolean;
  };
  supplier: {
    id: string;
    name: string;
    leadTime: number;
    reliability: number;
  };
  demandForecast: {
    daily: number;
    weekly: number;
    monthly: number;
    seasonal_factors: number[];
  };
  qualityControl: {
    testingRequired: boolean;
    certifications: string[];
    quarantineStatus: 'approved' | 'quarantined' | 'rejected';
  };
  movementHistory: {
    timestamp: string;
    type: 'inbound' | 'outbound' | 'transfer' | 'adjustment';
    quantity: number;
    reason: string;
    user: string;
  }[];
  alerts: {
    lowStock: boolean;
    expiring: boolean;
    qualityIssue: boolean;
    temperatureExcursion: boolean;
  };
}

export interface ExpirationBatch {
  batchNumber: string;
  expirationDate: string;
  quantity: number;
  manufacturingDate: string;
  supplier: string;
  qualityStatus: 'approved' | 'quarantined' | 'expired';
}

export interface EmergencyDelivery {
  id: string;
  type: 'critical_medication' | 'blood_transfusion' | 'organ_transport' | 'emergency_equipment' | 'disaster_response';
  priority: 'life_threatening' | 'urgent' | 'high' | 'emergency';
  requestedBy: {
    userId: string;
    name: string;
    role: string;
    facility: string;
    credentials: string[];
  };
  patient: {
    id: string;
    name: string;
    age: number;
    condition: string;
    location: string;
    vitals?: {
      heartRate: number;
      bloodPressure: string;
      temperature: number;
      oxygenSaturation: number;
    };
  };
  cargo: {
    type: string;
    description: string;
    quantity: number;
    criticality: 'life_saving' | 'urgent' | 'important';
    timeConstraints: {
      maxDeliveryTime: number; // minutes
      expirationTime?: string;
      goldenHour: boolean;
    };
  };
  deployment: {
    vehicleType: 'emergency_drone' | 'helicopter' | 'ambulance' | 'emergency_vehicle';
    vehicleId: string;
    crew: string[];
    medicalPersonnel: string[];
    equipment: string[];
  };
  route: {
    origin: string;
    destination: string;
    distance: number;
    estimatedTime: number;
    emergencyCorridors: boolean;
    airspaceCleared: boolean;
  };
  coordination: {
    emergencyServices: string[];
    hospitals: string[];
    airTrafficControl: boolean;
    lawEnforcement: boolean;
  };
  status: 'requested' | 'approved' | 'dispatched' | 'in_transit' | 'delivered' | 'completed';
  timeline: {
    requested: string;
    approved: string;
    dispatched: string;
    arrived: string;
    completed: string;
  };
  outcome: {
    successful: boolean;
    deliveryTime: number;
    complications: string[];
    patientOutcome: string;
    lessonsLearned: string[];
  };
  costs: {
    operational: number;
    fuel: number;
    personnel: number;
    equipment: number;
    total: number;
  };
  compliance: {
    regulations: string[];
    approvals: string[];
    documentation: string[];
    auditTrail: string[];
  };
}

export interface RegulatoryCompliance {
  id: string;
  jurisdiction: string;
  framework: 'faa_part_107' | 'easa' | 'icao' | 'dot' | 'fda' | 'customs';
  requirements: ComplianceRequirement[];
  certifications: OperationalCertification[];
  audits: ComplianceAudit[];
  violations: ComplianceViolation[];
  status: 'compliant' | 'non_compliant' | 'under_review' | 'suspended';
  lastReview: string;
  nextReview: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  contactInfo: {
    regulator: string;
    contact: string;
    phone: string;
    email: string;
  };
}

export interface ComplianceRequirement {
  id: string;
  category: string;
  requirement: string;
  mandatory: boolean;
  status: 'met' | 'not_met' | 'in_progress' | 'not_applicable';
  evidence: string[];
  dueDate?: string;
  responsible: string;
  notes: string;
}

export interface OperationalCertification {
  id: string;
  type: string;
  name: string;
  number: string;
  issuedBy: string;
  issuedDate: string;
  expirationDate: string;
  status: 'active' | 'expired' | 'suspended' | 'revoked';
  scope: string[];
  conditions: string[];
  renewalProcess: string;
  cost: number;
  documentUrl: string;
}

export interface ComplianceAudit {
  id: string;
  auditor: string;
  auditDate: string;
  scope: string[];
  findings: AuditFinding[];
  recommendations: string[];
  status: 'passed' | 'failed' | 'conditional' | 'pending';
  reportUrl: string;
  followUpDate?: string;
}

export interface AuditFinding {
  id: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  requirement: string;
  evidence: string;
  recommendation: string;
  status: 'open' | 'closed' | 'in_progress';
  dueDate?: string;
  responsible: string;
}

export interface ComplianceViolation {
  id: string;
  violationType: string;
  description: string;
  severity: 'minor' | 'major' | 'serious' | 'critical';
  dateOccurred: string;
  dateReported: string;
  regulator: string;
  penalties: {
    fine?: number;
    suspension?: boolean;
    revocation?: boolean;
    warning?: boolean;
  };
  correctiveActions: string[];
  status: 'reported' | 'investigating' | 'resolved' | 'appealed';
  impactOnOperations: string;
  lessonsLearned: string[];
}

// Integration Types
export interface DeliveryPartnership {
  id: string;
  partner: 'zipline' | 'wing' | 'amazon_prime_air' | 'ups_flight_forward' | 'fedex' | 'dhl';
  partnershipType: 'technology' | 'operational' | 'strategic' | 'exclusive';
  services: PartnerService[];
  coverage: {
    geographic: string[];
    serviceTypes: string[];
    capacities: string[];
  };
  integration: {
    apiEndpoint: string;
    authMethod: string;
    dataFormats: string[];
    realTimeUpdates: boolean;
    webhooks: boolean;
  };
  sla: {
    deliveryTime: number;
    uptime: number;
    accuracy: number;
    responseTime: number;
  };
  pricing: {
    model: 'per_delivery' | 'subscription' | 'volume_based' | 'hybrid';
    rates: PricingTier[];
    discounts: string[];
  };
  contract: {
    startDate: string;
    endDate: string;
    renewalTerms: string;
    terminationClause: string;
  };
  performance: {
    deliveriesCompleted: number;
    successRate: number;
    averageTime: number;
    customerSatisfaction: number;
  };
  status: 'active' | 'inactive' | 'trial' | 'terminated';
}

export interface PartnerService {
  serviceType: string;
  description: string;
  coverage: string;
  capacity: string;
  pricing: number;
  sla: string;
  availability: boolean;
}

export interface PricingTier {
  tier: string;
  minVolume: number;
  maxVolume: number;
  pricePerDelivery: number;
  additionalFees: {
    urgentDelivery: number;
    temperatureControl: number;
    specialHandling: number;
    insurance: number;
  };
}
