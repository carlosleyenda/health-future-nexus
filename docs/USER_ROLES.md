
# ROLES Y PERMISOS DEL SISTEMA

## 1. JERARQUÍA DE USUARIOS

### 1.1 PACIENTES
**Nivel de Acceso**: Básico
**Funcionalidades Principales**:
- Gestión de perfil personal
- Agendamiento de citas
- Consultas virtuales
- Acceso a historial médico
- Monitoreo de salud personal
- Gestión de medicamentos
- Pagos y facturación

**Permisos Específicos**:
- `READ`: Propio perfil médico
- `WRITE`: Datos personales básicos
- `CREATE`: Citas médicas, consultas
- `UPDATE`: Información de contacto
- `DELETE`: Citas no confirmadas

### 1.2 MÉDICOS GENERALES
**Nivel de Acceso**: Profesional
**Funcionalidades Principales**:
- Gestión de agenda médica
- Consultas virtuales y presenciales
- Acceso a expedientes de pacientes
- Prescripción de medicamentos
- Seguimiento de tratamientos
- Referencia a especialistas

**Permisos Específicos**:
- `READ`: Expedientes de pacientes asignados
- `WRITE`: Notas médicas, diagnósticos
- `CREATE`: Recetas, planes de tratamiento
- `UPDATE`: Diagnósticos, medicamentos
- `APPROVE`: Citas médicas

### 1.3 MÉDICOS ESPECIALISTAS
**Nivel de Acceso**: Especializado
**Funcionalidades Específicas por Especialidad**:
- Cardiología: ECG, ecocardiogramas
- Dermatología: Análisis de imágenes
- Endocrinología: Monitoreo hormonal
- Ginecología: Salud reproductiva
- Neurología: Evaluaciones cognitivas
- Pediatría: Desarrollo infantil
- Psiquiatría: Salud mental
- Y 15+ especialidades adicionales

**Permisos Avanzados**:
- `READ`: Estudios especializados
- `INTERPRET`: Análisis de laboratorio
- `PRESCRIBE`: Medicamentos especializados
- `REFER`: Interconsultas

### 1.4 PERSONAL ADMINISTRATIVO

#### Administrador General
**Nivel de Acceso**: Total
**Responsabilidades**:
- Configuración del sistema
- Gestión de usuarios
- Supervisión de calidad
- Análisis financiero
- Reportes ejecutivos

#### Coordinador de Citas
**Nivel de Acceso**: Operativo
**Responsabilidades**:
- Programación de consultas
- Gestión de cancelaciones
- Optimización de horarios
- Seguimiento de ausencias

#### Asistente Médico Virtual
**Nivel de Acceso**: Limitado
**Responsabilidades**:
- Triaje inicial
- Preparación de consultas
- Seguimiento básico
- Gestión documental

### 1.5 PERSONAL DE DELIVERY

#### Médicos a Domicilio
**Nivel de Acceso**: Móvil
**Funcionalidades**:
- Atención presencial
- Procedimientos menores
- Toma de muestras
- Emergencias domiciliarias

#### Paramédicos/Enfermeros
**Nivel de Acceso**: Técnico
**Funcionalidades**:
- Signos vitales
- Medicamentos básicos
- Curaciones
- Educación en salud

#### Técnicos en Dispositivos
**Nivel de Acceso**: Técnico
**Funcionalidades**:
- Instalación de equipos
- Capacitación técnica
- Soporte remoto
- Mantenimiento

## 2. MATRIZ DE PERMISOS

### 2.1 Gestión de Pacientes
| Rol | Crear | Leer | Actualizar | Eliminar |
|-----|-------|------|------------|----------|
| Paciente | Propio | Propio | Propio | - |
| Médico | - | Asignados | Asignados | - |
| Admin | ✓ | ✓ | ✓ | ✓ |

### 2.2 Historiales Médicos
| Rol | Crear | Leer | Actualizar | Eliminar |
|-----|-------|------|------------|----------|
| Paciente | - | Propio | - | - |
| Médico | ✓ | Pacientes | ✓ | - |
| Admin | - | ✓ | - | ✓ |

### 2.3 Citas Médicas
| Rol | Crear | Leer | Actualizar | Eliminar |
|-----|-------|------|------------|----------|
| Paciente | ✓ | Propias | Propias | Propias |
| Médico | ✓ | Agenda | ✓ | ✓ |
| Coordinador | ✓ | ✓ | ✓ | ✓ |

### 2.4 Prescripciones
| Rol | Crear | Leer | Actualizar | Eliminar |
|-----|-------|------|------------|----------|
| Paciente | - | Propias | - | - |
| Médico | ✓ | Pacientes | ✓ | ✓ |
| Farmacéutico | - | ✓ | Estado | - |

## 3. FLUJOS DE TRABAJO POR ROL

### 3.1 Flujo del Paciente
1. **Registro** → Verificación de identidad
2. **Perfil Médico** → Completar historial
3. **Agendar Cita** → Seleccionar especialidad
4. **Consulta Virtual** → Video llamada
5. **Seguimiento** → Monitoreo continuo
6. **Medicamentos** → Delivery automático

### 3.2 Flujo del Médico
1. **Login Profesional** → Verificación credenciales
2. **Dashboard** → Resumen del día
3. **Preparación** → Revisión de casos
4. **Consultas** → Atención de pacientes
5. **Prescripciones** → Recetas digitales
6. **Seguimiento** → Monitoreo post-consulta

### 3.3 Flujo Administrativo
1. **Supervisión** → Monitoreo general
2. **Reportes** → Análisis de KPIs
3. **Optimización** → Mejora de procesos
4. **Calidad** → Control de servicios
5. **Facturación** → Gestión financiera

## 4. SEGURIDAD Y ACCESO

### 4.1 Autenticación
- **2FA Obligatorio** para médicos y admin
- **Biometría** para acceso móvil
- **SSO** para integración empresarial
- **Session Management** automático

### 4.2 Autorización
- **RBAC** (Role-Based Access Control)
- **ABAC** (Attribute-Based Access Control)
- **Dynamic Permissions** según contexto
- **Audit Trail** completo

### 4.3 Compliance
- **HIPAA** para datos médicos
- **GDPR** para privacidad
- **Logging** de accesos
- **Encryption** en tránsito y reposo
