# Distribución de Recursos: PDFs y Webinars

## 1. DISTRIBUCIÓN DE PDFs

### 1.1 Flujo de Distribución

```
Usuario completa Quiz
  ↓
Sistema calcula Perfil
  ↓
Sistema genera Reporte Personalizado
  ↓
Usuario rellena formulario (Email + Nombre)
  ↓
Sistema envía Email Automático con:
  ├─ Reporte PDF personalizado (generado dinámicamente)
  ├─ Links de descarga de PDFs específicos del perfil
  ├─ Acceso a comunidad privada
  └─ Código de descuento
  ↓
Usuario descarga PDFs desde email o dashboard
```

### 1.2 Almacenamiento de PDFs

**Opción Recomendada: S3 (CDN)**

```
Estructura de carpetas en S3:
/recursos/
├── perfiles/
│   ├── ejecutivo/
│   │   ├── oficina-ergonomica.pdf
│   │   └── ejercicios-en-la-oficina.pdf
│   ├── emprendedor/
│   │   ├── estres-y-dolor.pdf
│   │   └── recuperacion-integral.pdf
│   ├── atleta/
│   │   ├── volver-a-entrenar.pdf
│   │   └── prevencion-lesiones.pdf
│   └── recien-diagnosticado/
│       ├── primeros-pasos.pdf
│       └── postura-correcta.pdf
├── reportes/
│   └── [reportes personalizados generados dinámicamente]
└── compartidos/
    ├── 7-errores-comunes.pdf
    └── [otros recursos generales]
```

### 1.3 Generación de Reportes Personalizados

**Los reportes se generan dinámicamente en PDF con:**

```
┌─────────────────────────────────────────────────────┐
│        REPORTE PERSONALIZADO - MÉTODO RESET         │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Generado para: [NOMBRE DEL USUARIO]                │
│ Fecha: [FECHA]                                      │
│ Perfil: [PERFIL IDENTIFICADO]                       │
│ Severidad: [X/10]                                   │
│                                                     │
│ [CONTENIDO PERSONALIZADO SEGÚN PERFIL]             │
│                                                     │
│ Código de Descuento: [CÓDIGO ÚNICO]                │
│ Válido hasta: [FECHA]                              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Herramientas para generar PDFs dinámicos:**
- **Node.js:** puppeteer, pdfkit, html-pdf
- **Recomendado:** puppeteer (mejor calidad)

### 1.4 Email con Links de Descarga

**Email Template: "Tu Reporte Personalizado"**

```
Asunto: Tu Reporte Personalizado - Método RESET

Hola [NOMBRE],

¡Gracias por completar tu evaluación!

Hemos analizado tus respuestas y creado un plan personalizado 
para tu tipo de dolor.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 TU PERFIL: [PERFIL]
Severidad: [X/10]
Tiempo de Recuperación: [X días]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📥 DESCARGA TUS RECURSOS:

[BOTÓN] Descargar Reporte Completo (PDF)
↳ Tu análisis personalizado + plan de acción

[BOTÓN] Guía 1: [NOMBRE GUÍA 1] (PDF)
↳ [Descripción corta]

[BOTÓN] Guía 2: [NOMBRE GUÍA 2] (PDF)
↳ [Descripción corta]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎁 OFERTA ESPECIAL PARA TI:
[DESCUENTO]% de descuento en el Programa RESET
Código: [CÓDIGO]
Válido hasta: [FECHA]

[BOTÓN] ACCEDER AL PROGRAMA CON DESCUENTO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 ACCESO A COMUNIDAD PRIVADA:
Únete a otros usuarios como tú para recibir:
• Tips diarios
• Soporte de coach
• Motivación y accountability

[BOTÓN] UNIRME A LA COMUNIDAD

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¿Preguntas? Contáctanos por WhatsApp: +34 677177641

Saludos,
Equipo Método RESET
```

### 1.5 Dashboard de Usuario (Opcional)

**Página privada donde el usuario puede:**

```
┌─────────────────────────────────────────────────────┐
│          MI PANEL - MÉTODO RESET                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 👤 Perfil: [NOMBRE]                                │
│ 📊 Severidad: [X/10]                               │
│ 📅 Fecha de Evaluación: [FECHA]                    │
│                                                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                     │
│ 📥 MIS RECURSOS:                                    │
│                                                     │
│ [📄] Reporte Personalizado                         │
│      Descargado: Sí | [DESCARGAR]                  │
│                                                     │
│ [📄] Guía 1: Oficina Ergonómica                    │
│      Descargado: No | [DESCARGAR]                  │
│                                                     │
│ [📄] Guía 2: Ejercicios en la Oficina              │
│      Descargado: No | [DESCARGAR]                  │
│                                                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                     │
│ 🎓 PRÓXIMOS PASOS:                                 │
│                                                     │
│ [ ] Descargar Reporte                              │
│ [ ] Leer Guía 1                                    │
│ [ ] Leer Guía 2                                    │
│ [ ] Unirse a Comunidad                             │
│ [ ] Comenzar Ejercicios                            │
│                                                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                     │
│ 🎁 TU CÓDIGO DE DESCUENTO:                         │
│    [CÓDIGO] (Válido hasta [FECHA])                 │
│                                                     │
│ [BOTÓN] ACCEDER AL PROGRAMA                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 2. WEBINARS - ESPACIOS RESERVADOS

### 2.1 Estructura de Webinars

**De momento: Espacios reservados (sin contenido)**

```
Perfil A: Ejecutivo Atrapado
├─ Webinar: "Dolor Lumbar para Profesionales"
│  ├─ Estado: ⏳ PRÓXIMAMENTE
│  ├─ Descripción: [Placeholder]
│  ├─ Duración: 60 min
│  ├─ Fecha: [Por definir]
│  └─ [NOTIFICARME CUANDO ESTÉ DISPONIBLE]
```

### 2.2 Página de Webinars

**En el reporte personalizado:**

```
┌─────────────────────────────────────────────────────┐
│         🎓 WEBINARS EXCLUSIVOS                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Webinar 1: "Dolor Lumbar para Profesionales"      │
│ ⏳ PRÓXIMAMENTE                                     │
│                                                     │
│ Aprenderás:                                         │
│ • Causas del dolor lumbar en profesionales         │
│ • Ejercicios efectivos para oficina                │
│ • Cambios de hábitos que funcionan                 │
│ • Preguntas y respuestas en vivo                   │
│                                                     │
│ Duración: 60 minutos                               │
│ Instructor: [Nombre Coach]                         │
│                                                     │
│ [BOTÓN] NOTIFICARME CUANDO ESTÉ DISPONIBLE        │
│                                                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                     │
│ Webinar 2: "Recuperación Integral para             │
│            Emprendedores"                          │
│ ⏳ PRÓXIMAMENTE                                     │
│                                                     │
│ [BOTÓN] NOTIFICARME CUANDO ESTÉ DISPONIBLE        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 2.3 Sistema de Notificaciones para Webinars

**Cuando el usuario hace clic en "Notificarme":**

```
1. Se guarda su preferencia en BD
2. Se añade a lista de espera para ese webinar
3. Cuando se programa el webinar:
   - Se envía email con fecha y hora
   - Se envía link de acceso
   - Se envía recordatorio 24h antes
   - Se envía recordatorio 1h antes
```

### 2.4 Tabla en BD para Webinars

```sql
CREATE TABLE webinars (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255),
  descripcion TEXT,
  perfil VARCHAR(50),
  duracion INT,
  instructor VARCHAR(255),
  
  -- Estado
  estado ENUM('proximamente', 'programado', 'completado'),
  fecha_programada DATETIME,
  link_acceso VARCHAR(500),
  
  -- Grabación
  link_grabacion VARCHAR(500),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE webinar_notificaciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  webinar_id INT,
  notificado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (webinar_id) REFERENCES webinars(id)
);
```

### 2.5 Página de Administración para Webinars

**Panel privado para ti (admin):**

```
┌─────────────────────────────────────────────────────┐
│    ADMINISTRACIÓN DE WEBINARS                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│ [+ CREAR NUEVO WEBINAR]                            │
│                                                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                     │
│ Webinar 1: "Dolor Lumbar para Profesionales"      │
│ Estado: ⏳ PRÓXIMAMENTE                             │
│ Perfil: Ejecutivo Atrapado                         │
│ Inscritos: 45 usuarios                             │
│ [EDITAR] [PROGRAMAR] [ELIMINAR]                    │
│                                                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                     │
│ Webinar 2: "Recuperación Integral para             │
│            Emprendedores"                          │
│ Estado: ⏳ PRÓXIMAMENTE                             │
│ Perfil: Emprendedor Quemado                        │
│ Inscritos: 32 usuarios                             │
│ [EDITAR] [PROGRAMAR] [ELIMINAR]                    │
│                                                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                     │
│ [CREAR NUEVO]                                      │
│ Título: [_________________________]                │
│ Descripción: [_________________________]           │
│ Perfil: [Seleccionar ▼]                            │
│ Duración: [___] minutos                            │
│ Instructor: [_________________________]            │
│ [GUARDAR]                                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 3. FLUJO TÉCNICO DE DISTRIBUCIÓN

### 3.1 Arquitectura

```
┌─────────────────────────────────────────────────────┐
│              USUARIO COMPLETA QUIZ                  │
└──────────────────┬──────────────────────────────────┘
                   ↓
        ┌──────────────────────────┐
        │  tRPC: quiz.submit()     │
        │  - Guardar respuestas    │
        │  - Calcular perfil       │
        │  - Generar código desc.  │
        └──────────────┬───────────┘
                       ↓
        ┌──────────────────────────┐
        │  Generar PDF Reporte     │
        │  (puppeteer)             │
        │  - Contenido dinámico    │
        │  - Personalizado         │
        └──────────────┬───────────┘
                       ↓
        ┌──────────────────────────┐
        │  Guardar en S3           │
        │  - Reporte PDF           │
        │  - Generar URL           │
        └──────────────┬───────────┘
                       ↓
        ┌──────────────────────────┐
        │  Enviar Email (Brevo)    │
        │  - Reporte PDF           │
        │  - Links de PDFs         │
        │  - Código descuento      │
        │  - Comunidad privada     │
        └──────────────┬───────────┘
                       ↓
        ┌──────────────────────────┐
        │  Mostrar Reporte en UI   │
        │  - Resumen               │
        │  - Botones de descarga   │
        │  - Próximos pasos        │
        └──────────────────────────┘
```

### 3.2 Endpoints tRPC Necesarios

```typescript
// Guardar respuestas y generar reporte
quiz.submit({
  email, nombre, telefono,
  ubicacion_dolor, duracion_dolor, ocupacion,
  horas_sentado, triggers, tratamientos, objetivo
})
// Retorna: { perfil, severidad, codigo_descuento, reportePdfUrl }

// Obtener reporte (para dashboard)
quiz.getReport({ email })
// Retorna: { reporte, recursos, webinars, codigo_descuento }

// Obtener recursos por perfil
quiz.getResources({ perfil })
// Retorna: { pdfs: [...], webinars: [...] }

// Notificarse de webinar
quiz.notifyWebinar({ userId, webinarId })
// Retorna: { success: true }

// Admin: Crear/actualizar webinar
admin.createWebinar({ titulo, descripcion, perfil, fecha, link })
// Retorna: { webinarId }
```

### 3.3 Flujo de Descarga de PDFs

**Opción 1: Descarga directa desde S3**
```
Usuario hace clic en "Descargar"
  ↓
Se genera URL presignada de S3 (válida 1 hora)
  ↓
Se inicia descarga del PDF
  ↓
Se registra descarga en BD (analytics)
```

**Opción 2: Descarga desde dashboard**
```
Usuario accede a su panel
  ↓
Ve lista de PDFs disponibles
  ↓
Hace clic en "Descargar"
  ↓
Se genera URL presignada
  ↓
Se inicia descarga
```

---

## 4. SEGURIDAD Y PRIVACIDAD

### 4.1 Acceso a Recursos

**Solo usuarios autenticados pueden descargar:**

```
1. Usuario completa quiz
2. Se crea cuenta/sesión
3. Se asignan recursos según perfil
4. Solo ese usuario puede descargar sus recursos
5. URLs presignadas expiran en 1 hora
```

### 4.2 Almacenamiento Seguro

```
- PDFs en S3 (privado)
- URLs presignadas (acceso temporal)
- Logs de descarga (auditoría)
- Datos personales encriptados
```

---

## 5. PRÓXIMOS PASOS

### Fase 1: Implementación Base
- [ ] Crear tabla quiz_responses en BD
- [ ] Crear tabla webinars en BD
- [ ] Crear tabla webinar_notificaciones en BD
- [ ] Implementar endpoints tRPC

### Fase 2: Generación de PDFs
- [ ] Crear templates de PDFs personalizados
- [ ] Implementar generación dinámica (puppeteer)
- [ ] Subir PDFs estáticos a S3
- [ ] Configurar URLs presignadas

### Fase 3: Emails
- [ ] Crear template de email en Brevo
- [ ] Configurar envío automático post-quiz
- [ ] Implementar notificaciones de webinars

### Fase 4: Webinars
- [ ] Crear tabla de webinars
- [ ] Crear panel de administración
- [ ] Implementar sistema de notificaciones
- [ ] Crear página de webinars (placeholder)

---

## 6. ESTIMACIÓN DE COSTOS

### Almacenamiento S3
- ~50 MB de PDFs = ~$1/mes

### Generación de PDFs (puppeteer)
- ~100 reportes/mes = ~$5-10/mes (servidor)

### Emails (Brevo)
- Plan actual cubre envíos

### Webinars (cuando estén listos)
- Zoom/Google Meet: Gratis o $15/mes

**Total estimado: $20-30/mes**

