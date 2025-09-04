// Demo data service for functional app without backend dependencies

export interface DemoDoctor {
  id: string;
  name: string;
  specialty: string;
  country: string;
  languages: string[];
  experience: number;
  rating: number;
  consultationFee: number;
  available: boolean;
  nextAvailable: string;
  bio: string;
  education: string[];
  certifications: string[];
}

export interface DemoAppointment {
  id: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  type: 'virtual' | 'in_person';
  reason: string;
  country: string;
  cost: number;
  currency: string;
}

const demoDoctors: DemoDoctor[] = [
  // Perú
  {
    id: 'dr-001-pe',
    name: 'Dr. Carlos Mendoza',
    specialty: 'Medicina General',
    country: 'peru',
    languages: ['Español', 'Quechua'],
    experience: 12,
    rating: 4.8,
    consultationFee: 150,
    available: true,
    nextAvailable: '2024-01-15T09:00:00',
    bio: 'Especialista en medicina general con amplia experiencia en telemedicina.',
    education: ['Universidad Nacional Mayor de San Marcos'],
    certifications: ['Colegio Médico del Perú', 'Telemedicina Certificada']
  },
  {
    id: 'dr-002-pe',
    name: 'Dra. María Gonzales',
    specialty: 'Pediatría',
    country: 'peru',
    languages: ['Español'],
    experience: 8,
    rating: 4.9,
    consultationFee: 180,
    available: true,
    nextAvailable: '2024-01-15T10:30:00',
    bio: 'Pediatra especializada en desarrollo infantil y medicina preventiva.',
    education: ['Universidad Peruana Cayetano Heredia'],
    certifications: ['Sociedad Peruana de Pediatría']
  },
  
  // Chile
  {
    id: 'dr-003-cl',
    name: 'Dr. José Silva',
    specialty: 'Cardiología',
    country: 'chile',
    languages: ['Español', 'Inglés'],
    experience: 15,
    rating: 4.7,
    consultationFee: 45000,
    available: true,
    nextAvailable: '2024-01-15T14:00:00',
    bio: 'Cardiólogo con especialización en medicina preventiva cardiovascular.',
    education: ['Universidad de Chile'],
    certifications: ['Sociedad Chilena de Cardiología']
  },
  {
    id: 'dr-004-cl',
    name: 'Dra. Carmen Rojas',
    specialty: 'Dermatología',
    country: 'chile',
    languages: ['Español'],
    experience: 10,
    rating: 4.6,
    consultationFee: 38000,
    available: true,
    nextAvailable: '2024-01-15T16:00:00',
    bio: 'Dermatóloga especializada en dermatología estética y oncológica.',
    education: ['Pontificia Universidad Católica de Chile'],
    certifications: ['Sociedad Chilena de Dermatología']
  },

  // Colombia
  {
    id: 'dr-005-co',
    name: 'Dr. Luis Hernández',
    specialty: 'Medicina General',
    country: 'colombia',
    languages: ['Español'],
    experience: 9,
    rating: 4.5,
    consultationFee: 120000,
    available: true,
    nextAvailable: '2024-01-15T08:00:00',
    bio: 'Médico general con experiencia en medicina familiar y comunitaria.',
    education: ['Universidad Nacional de Colombia'],
    certifications: ['Colegio Médico Colombiano']
  },
  {
    id: 'dr-006-co',
    name: 'Dra. Ana Vargas',
    specialty: 'Ginecología',
    country: 'colombia',
    languages: ['Español', 'Inglés'],
    experience: 13,
    rating: 4.8,
    consultationFee: 150000,
    available: true,
    nextAvailable: '2024-01-15T11:00:00',
    bio: 'Ginecóloga especializada en salud reproductiva y medicina materno-fetal.',
    education: ['Universidad del Rosario'],
    certifications: ['Federación Colombiana de Ginecología']
  },

  // Venezuela
  {
    id: 'dr-007-ve',
    name: 'Dr. Roberto Pérez',
    specialty: 'Medicina General',
    country: 'venezuela',
    languages: ['Español'],
    experience: 16,
    rating: 4.4,
    consultationFee: 25,
    available: true,
    nextAvailable: '2024-01-15T13:00:00',
    bio: 'Médico con amplia experiencia en medicina general y atención primaria.',
    education: ['Universidad Central de Venezuela'],
    certifications: ['Colegio de Médicos de Venezuela']
  },
  {
    id: 'dr-008-ve',
    name: 'Dra. Isabel Morales',
    specialty: 'Psiquiatría',
    country: 'venezuela',
    languages: ['Español'],
    experience: 11,
    rating: 4.7,
    consultationFee: 30,
    available: true,
    nextAvailable: '2024-01-15T15:30:00',
    bio: 'Psiquiatra especializada en salud mental comunitaria y terapia familiar.',
    education: ['Universidad de Los Andes'],
    certifications: ['Sociedad Venezolana de Psiquiatría']
  }
];

export class DemoDataService {
  static getDoctorsByCountry(country: string): DemoDoctor[] {
    return demoDoctors.filter(doctor => doctor.country === country);
  }

  static getAllDoctors(): DemoDoctor[] {
    return demoDoctors;
  }

  static getDoctorById(id: string): DemoDoctor | undefined {
    return demoDoctors.find(doctor => doctor.id === id);
  }

  static getDoctorsBySpecialty(specialty: string, country?: string): DemoDoctor[] {
    let filtered = demoDoctors.filter(doctor => 
      doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
    );
    
    if (country) {
      filtered = filtered.filter(doctor => doctor.country === country);
    }
    
    return filtered;
  }

  static createAppointment(appointmentData: Partial<DemoAppointment>): DemoAppointment {
    const appointment: DemoAppointment = {
      id: `apt-${Date.now()}`,
      patientName: appointmentData.patientName || '',
      doctorId: appointmentData.doctorId || '',
      doctorName: appointmentData.doctorName || '',
      date: appointmentData.date || '',
      time: appointmentData.time || '',
      status: 'scheduled',
      type: appointmentData.type || 'virtual',
      reason: appointmentData.reason || '',
      country: appointmentData.country || '',
      cost: appointmentData.cost || 0,
      currency: appointmentData.currency || 'USD'
    };

    // Save to localStorage
    const appointments = this.getAppointments();
    appointments.push(appointment);
    localStorage.setItem('demo_appointments', JSON.stringify(appointments));

    return appointment;
  }

  static getAppointments(): DemoAppointment[] {
    const stored = localStorage.getItem('demo_appointments');
    return stored ? JSON.parse(stored) : [];
  }

  static getAppointmentsByPatient(patientName: string): DemoAppointment[] {
    return this.getAppointments().filter(apt => apt.patientName === patientName);
  }

  static updateAppointmentStatus(id: string, status: DemoAppointment['status']): void {
    const appointments = this.getAppointments();
    const index = appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      appointments[index].status = status;
      localStorage.setItem('demo_appointments', JSON.stringify(appointments));
    }
  }

  // Emergency contacts by country
  static getEmergencyContacts(country: string) {
    const contacts = {
      peru: {
        ambulance: '116',
        police: '105',
        fire: '116',
        clinics: [
          { name: 'Clínica Anglo Americana', phone: '+51 1 616-8900' },
          { name: 'Clínica San Felipe', phone: '+51 1 219-0000' }
        ]
      },
      chile: {
        ambulance: '131',
        police: '133',
        fire: '132',
        clinics: [
          { name: 'Clínica Las Condes', phone: '+56 2 2210-4000' },
          { name: 'Clínica Alemana', phone: '+56 2 2210-1111' }
        ]
      },
      colombia: {
        ambulance: '123',
        police: '123',
        fire: '119',
        clinics: [
          { name: 'Hospital San Ignacio', phone: '+57 1 594-6161' },
          { name: 'Clínica del Country', phone: '+57 1 530-0470' }
        ]
      },
      venezuela: {
        ambulance: '911',
        police: '911',
        fire: '911',
        clinics: [
          { name: 'Hospital de Clínicas Caracas', phone: '+58 212 508-6111' },
          { name: 'Centro Médico de Caracas', phone: '+58 212 555-8000' }
        ]
      }
    };

    return contacts[country as keyof typeof contacts] || contacts.peru;
  }
}