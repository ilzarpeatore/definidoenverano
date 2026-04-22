# Especificación Completa: Quiz Interactivo de Diagnóstico de Dolor

## 1. ESTRUCTURA DEL QUIZ

### 1.1 Flujo General

```
INICIO
  ↓
Presentación (Bienvenida + Explicación)
  ↓
7 Preguntas Secuenciales
  ↓
Cálculo de Puntuación
  ↓
Identificación de Perfil
  ↓
Generación de Reporte Personalizado
  ↓
Formulario de Captura (Email + Nombre)
  ↓
Página de Agradecimiento + Descarga de Reporte
  ↓
Email Automático con Recursos
```

### 1.2 Preguntas del Quiz (7 Preguntas)

#### PREGUNTA 1: Ubicación del Dolor
**Tipo:** Radio buttons (una sola respuesta)

```
¿Dónde sientes principalmente el dolor?

○ Espalda baja (lumbar)
  └─ Descripción: Zona entre costillas y caderas

○ Espalda media (dorsal)
  └─ Descripción: Entre omóplatos

○ Cuello (cervical)
  └─ Descripción: Parte superior de la espalda

○ Múltiples zonas
  └─ Descripción: Espalda baja + cuello, o varias áreas

○ No estoy seguro
  └─ Descripción: Tengo molestias pero no sé dónde exactamente
```

**Puntuación:**
- Espalda baja: 1 punto
- Espalda media: 1 punto
- Cuello: 1.5 puntos
- Múltiples zonas: 2 puntos
- No estoy seguro: 0.5 puntos

---

#### PREGUNTA 2: Duración del Dolor
**Tipo:** Radio buttons

```
¿Cuánto tiempo llevas con este dolor?

○ Menos de 1 semana
  └─ Descripción: Dolor reciente/agudo

○ 1 a 4 semanas
  └─ Descripción: Dolor subagudo

○ 1 a 6 meses
  └─ Descripción: Dolor crónico moderado

○ Más de 6 meses
  └─ Descripción: Dolor crónico severo

○ Intermitente (va y viene)
  └─ Descripción: A veces duele, a veces no
```

**Puntuación:**
- Menos de 1 semana: 1 punto
- 1-4 semanas: 2 puntos
- 1-6 meses: 3 puntos
- Más de 6 meses: 4 puntos
- Intermitente: 2 puntos

---

#### PREGUNTA 3: Ocupación Principal
**Tipo:** Radio buttons

```
¿Cuál es tu ocupación principal?

○ Trabajo de oficina/Escritorio
  └─ Descripción: Programador, administrativo, etc.

○ Ventas/Viajes
  └─ Descripción: Comercial, consultor, viajante

○ Trabajo físico/Construcción
  └─ Descripción: Obrero, artesano, etc.

○ Autónomo/Emprendedor
  └─ Descripción: Negocio propio

○ Educador/Profesor
  └─ Descripción: Enseñanza, formación

○ Otro
  └─ Descripción: Especificar
```

**Puntuación:**
- Oficina: 2 puntos
- Ventas/Viajes: 1.5 puntos
- Trabajo físico: 1 punto
- Autónomo: 2 puntos
- Educador: 1.5 puntos
- Otro: 1 punto

---

#### PREGUNTA 4: Horas Sentado Diariamente
**Tipo:** Slider (0-12 horas) + Radio buttons

```
¿Cuántas horas pasas sentado diariamente?

[Slider: 0 ─────●───── 12 horas]

○ Menos de 4 horas (Muy activo)
○ 4-6 horas (Moderadamente activo)
○ 6-8 horas (Sedentario)
○ Más de 8 horas (Muy sedentario)
```

**Puntuación:**
- Menos de 4h: 0.5 puntos
- 4-6h: 1.5 puntos
- 6-8h: 2.5 puntos
- Más de 8h: 3 puntos

---

#### PREGUNTA 5: Actividades que Empeoran el Dolor
**Tipo:** Checkboxes (múltiples respuestas)

```
¿Qué actividades empeoran tu dolor? (Selecciona todas las que apliquen)

☐ Estar sentado prolongadamente
☐ De pie prolongadamente
☐ Levantar objetos pesados
☐ Estrés/Tensión emocional
☐ Dormir mal
☐ Falta de movimiento
☐ Ejercicio intenso
☐ Nada específico (dolor constante)
```

**Puntuación:**
- Por cada opción seleccionada: +0.3 puntos (máximo 2.4 puntos)

---

#### PREGUNTA 6: Tratamientos Previos
**Tipo:** Checkboxes (múltiples respuestas)

```
¿Qué tratamientos has probado? (Selecciona todas las que apliquen)

☐ Medicinas/Analgésicos
☐ Fisioterapia
☐ Ejercicio/Gimnasia
☐ Masajes
☐ Inyecciones
☐ Cirugía
☐ Remedios naturales
☐ Nada aún
```

**Puntuación:**
- Nada aún: +1 punto
- Cada tratamiento probado: -0.2 puntos (indica que ya ha intentado soluciones)

---

#### PREGUNTA 7: Objetivo Principal
**Tipo:** Radio buttons

```
¿Cuál es tu objetivo principal?

○ Eliminar el dolor completamente
  └─ Descripción: Quiero estar 100% sin dolor

○ Mejorar la postura
  └─ Descripción: Corregir mi forma de estar

○ Ganar fuerza/Prevenir lesiones
  └─ Descripción: Fortalecer mi espalda

○ Volver a deportes/Actividades
  └─ Descripción: Quiero poder hacer lo que me gusta

○ Mejorar calidad de vida
  └─ Descripción: Dormir mejor, más energía

○ Entender mi dolor
  └─ Descripción: Saber qué me pasa
```

**Puntuación:**
- Eliminar dolor: 1.5 puntos
- Mejorar postura: 1 punto
- Ganar fuerza: 0.5 puntos
- Volver a deportes: 1 punto
- Mejorar calidad de vida: 1 punto
- Entender dolor: 0.5 puntos

---

## 2. CÁLCULO DE PUNTUACIÓN Y PERFILES

### 2.1 Fórmula de Severidad

```
SEVERIDAD = (Ubicación + Duración + Ocupación + Sedentarismo + Triggers + Tratamientos + Objetivo) / 7

Rango: 0-10
```

### 2.2 Perfiles Identificados

#### PERFIL A: EJECUTIVO ATRAPADO
**Rango de Severidad:** 5-7
**Características:**
- Ubicación: Espalda baja
- Duración: 1-6 meses
- Ocupación: Oficina
- Sedentarismo: 6-8+ horas
- Triggers: Estar sentado, estrés
- Tratamientos: Pocos o ninguno
- Objetivo: Eliminar dolor / Mejorar calidad de vida

**Porcentaje de usuarios:** 35%

---

#### PERFIL B: EMPRENDEDOR QUEMADO
**Rango de Severidad:** 7.5-10
**Características:**
- Ubicación: Múltiples zonas (espalda + cuello)
- Duración: >6 meses
- Ocupación: Autónomo/Emprendedor
- Sedentarismo: 8+ horas
- Triggers: Múltiples (estrés, postura, falta de movimiento)
- Tratamientos: Algunos intentados sin éxito
- Objetivo: Eliminar dolor / Mejorar calidad de vida

**Porcentaje de usuarios:** 20%

---

#### PERFIL C: ATLETA LESIONADO
**Rango de Severidad:** 4-6
**Características:**
- Ubicación: Espalda baja o cervical
- Duración: <1 mes a 6 meses
- Ocupación: Variada
- Sedentarismo: <6 horas
- Triggers: Ejercicio intenso, movimientos específicos
- Tratamientos: Algunos (fisioterapia, ejercicio)
- Objetivo: Volver a deportes / Ganar fuerza

**Porcentaje de usuarios:** 25%

---

#### PERFIL D: RECIÉN DIAGNOSTICADO
**Rango de Severidad:** 3-5
**Características:**
- Ubicación: Espalda baja
- Duración: <1 mes
- Ocupación: Variada
- Sedentarismo: Variable
- Triggers: No está claro
- Tratamientos: Ninguno o muy pocos
- Objetivo: Entender dolor / Eliminar dolor

**Porcentaje de usuarios:** 20%

---

## 3. RESULTADOS Y REPORTE PERSONALIZADO

### 3.1 Estructura del Reporte

```
┌─────────────────────────────────────────────────────────────┐
│                  REPORTE PERSONALIZADO                      │
│                   MÉTODO RESET                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ 1. RESUMEN EJECUTIVO                                        │
│    • Tu perfil                                              │
│    • Severidad (0-10)                                       │
│    • Diagnóstico probable                                   │
│    • Tiempo de recuperación estimado                        │
│                                                              │
│ 2. ANÁLISIS DETALLADO                                       │
│    • Ubicación del dolor                                    │
│    • Causas probables                                       │
│    • Factores de riesgo                                     │
│    • Comparativa con otros usuarios                         │
│                                                              │
│ 3. PLAN PERSONALIZADO                                       │
│    • 3 ejercicios recomendados (con videos)                │
│    • 5 hábitos a cambiar                                    │
│    • Cambios de estilo de vida                              │
│                                                              │
│ 4. RECURSOS EXCLUSIVOS                                      │
│    • Guía PDF descargable                                   │
│    • Acceso a webinar                                       │
│    • Comunidad privada                                      │
│    • Seguimiento personalizado                              │
│                                                              │
│ 5. OFERTA ESPECIAL                                          │
│    • Descuento personalizado                                │
│    • Bonificaciones según perfil                            │
│    • Garantía de satisfacción                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Contenido por Perfil

#### PERFIL A: EJECUTIVO ATRAPADO

**Diagnóstico:**
```
Dolor lumbar crónico por sedentarismo y estrés laboral.
Tu trabajo de oficina (7+ horas sentado) es el principal factor.
Buena noticia: Este tipo de dolor responde muy bien al tratamiento.
```

**Severidad:** 6.5/10 (Moderado-Alto)

**Tiempo de Recuperación:** 60-90 días

**3 Ejercicios Recomendados:**
1. Estiramiento de cadera (5 min) - Video
2. Fortalecimiento de core (10 min) - Video
3. Movilidad lumbar (5 min) - Video

**5 Hábitos a Cambiar:**
1. Levantarse cada 50 minutos
2. Ajustar altura de monitor
3. Hacer 5 min de movimiento cada 2 horas
4. Mejorar ergonomía del escritorio
5. Técnica correcta de levantamiento

**Recursos:**
- PDF: "Oficina Ergonómica"
- PDF: "Ejercicios en la Oficina"
- Webinar: "Dolor Lumbar para Profesionales"
- Acceso a comunidad privada

**Oferta:**
- 25% descuento en programa RESET
- Sesión 1:1 de evaluación GRATIS
- Código: EXEC25

---

#### PERFIL B: EMPRENDEDOR QUEMADO

**Diagnóstico:**
```
Dolor lumbar y cervical crónico severo por estrés, sedentarismo y tensión emocional.
Tu situación como emprendedor (múltiples factores de riesgo) requiere intervención integral.
Buena noticia: Muchos emprendedores como tú han recuperado su salud.
```

**Severidad:** 8.5/10 (Severo)

**Tiempo de Recuperación:** 90-120 días

**5 Ejercicios Recomendados:**
1. Estiramiento de cuello (5 min) - Video
2. Estiramiento de cadera (5 min) - Video
3. Fortalecimiento de core (10 min) - Video
4. Movilidad completa (10 min) - Video
5. Ejercicio de respiración/relajación (5 min) - Video

**5 Hábitos a Cambiar:**
1. Gestión del estrés (meditación 10 min/día)
2. Levantarse cada 45 minutos
3. Dormir 7-8 horas
4. Ejercicio regular (30 min, 3x/semana)
5. Desconexión laboral (sin trabajo después de 19:00)

**Recursos:**
- PDF: "Estrés y Dolor de Espalda"
- PDF: "Guía de Recuperación Integral"
- Webinar: "Dolor para Emprendedores"
- Acceso a comunidad privada
- 3 sesiones de coaching 1:1

**Oferta:**
- 40% descuento en programa RESET
- 3 sesiones de coaching 1:1 (valor €300)
- Garantía de satisfacción 60 días
- Código: EMPREND40

---

#### PERFIL C: ATLETA LESIONADO

**Diagnóstico:**
```
Lesión musculoesquelética por deporte/entrenamiento.
Tu nivel de actividad es positivo, pero necesitas rehabilitación correcta.
Buena noticia: Atletas como tú suelen recuperarse completamente en 30-60 días.
```

**Severidad:** 5.5/10 (Moderado)

**Tiempo de Recuperación:** 30-60 días

**4 Ejercicios Recomendados:**
1. Movilidad específica (5 min) - Video
2. Fortalecimiento de estabilizadores (10 min) - Video
3. Técnica correcta de movimiento (10 min) - Video
4. Prevención de recaídas (5 min) - Video

**5 Hábitos a Cambiar:**
1. Calentamiento adecuado (10 min antes de entrenar)
2. Enfriamiento y estiramiento (10 min después)
3. Descanso suficiente entre entrenamientos
4. Técnica correcta en tu deporte
5. Progresión gradual de intensidad

**Recursos:**
- PDF: "Volver a Entrenar sin Dolor"
- PDF: "Prevención de Lesiones para Atletas"
- Webinar: "Recuperación para Deportistas"
- Acceso a comunidad privada
- Plan de retorno personalizado

**Oferta:**
- 30% descuento en programa RESET
- Plan de retorno personalizado (valor €150)
- Seguimiento semanal por 4 semanas
- Código: ATLETA30

---

#### PERFIL D: RECIÉN DIAGNOSTICADO

**Diagnóstico:**
```
Dolor lumbar agudo reciente. Aún no está claro la causa exacta.
Tu situación es favorable porque el dolor es reciente y responde bien al tratamiento.
Buena noticia: Con intervención rápida, puedes estar sin dolor en 2-4 semanas.
```

**Severidad:** 4/10 (Leve-Moderado)

**Tiempo de Recuperación:** 14-30 días

**3 Ejercicios Recomendados:**
1. Ejercicio de alivio inmediato (5 min) - Video
2. Estiramiento suave (5 min) - Video
3. Movilidad básica (5 min) - Video

**5 Hábitos a Cambiar:**
1. Postura correcta en todo momento
2. Movimiento frecuente (cada 30 min)
3. Evitar movimientos bruscos
4. Dormir en posición correcta
5. Aplicar calor/frío según sea necesario

**Recursos:**
- PDF: "Primeros Pasos para el Dolor de Espalda"
- PDF: "Guía de Postura Correcta"
- Webinar: "¿Qué es el Dolor Lumbar?" (educativo)
- Acceso a comunidad privada

**Oferta:**
- 20% descuento en programa RESET
- Acceso a comunidad privada (valor €50)
- Garantía de satisfacción 30 días
- Código: NUEVO20

---

## 4. RECURSOS NECESARIOS

### 4.1 Videos de Ejercicios

**Total: 15 videos (3-10 minutos cada uno)**

Por Perfil:

**PERFIL A (Ejecutivo):**
1. Estiramiento de cadera (5 min)
2. Fortalecimiento de core (10 min)
3. Movilidad lumbar (5 min)

**PERFIL B (Emprendedor):**
4. Estiramiento de cuello (5 min)
5. Estiramiento de cadera (5 min)
6. Fortalecimiento de core (10 min)
7. Movilidad completa (10 min)
8. Ejercicio de respiración (5 min)

**PERFIL C (Atleta):**
9. Movilidad específica (5 min)
10. Fortalecimiento de estabilizadores (10 min)
11. Técnica correcta de movimiento (10 min)
12. Prevención de recaídas (5 min)

**PERFIL D (Recién Diagnosticado):**
13. Ejercicio de alivio inmediato (5 min)
14. Estiramiento suave (5 min)
15. Movilidad básica (5 min)

### 4.2 PDFs Descargables

**Total: 8 PDFs**

1. "Oficina Ergonómica" (PERFIL A)
2. "Ejercicios en la Oficina" (PERFIL A)
3. "Estrés y Dolor de Espalda" (PERFIL B)
4. "Guía de Recuperación Integral" (PERFIL B)
5. "Volver a Entrenar sin Dolor" (PERFIL C)
6. "Prevención de Lesiones para Atletas" (PERFIL C)
7. "Primeros Pasos para el Dolor de Espalda" (PERFIL D)
8. "Guía de Postura Correcta" (PERFIL D)

### 4.3 Webinars

**Total: 4 webinars (60 minutos cada uno)**

1. "Dolor Lumbar para Profesionales" (PERFIL A)
2. "Dolor para Emprendedores" (PERFIL B)
3. "Recuperación para Deportistas" (PERFIL C)
4. "¿Qué es el Dolor Lumbar?" (PERFIL D)

### 4.4 Sesiones de Coaching (Opcional)

**Para PERFIL B (Emprendedor):**
- 3 sesiones de 1:1 (30 min cada una)
- Evaluación personalizada
- Plan de acción específico

### 4.5 Acceso a Comunidad Privada

- Grupo privado en WhatsApp/Telegram
- Soporte de coach
- Interacción con otros usuarios
- Tips diarios
- Motivación y accountability

---

## 5. FLUJO DE CAPTURA Y EMAILS

### 5.1 Formulario de Captura

**Después de completar el quiz:**

```
┌─────────────────────────────────────────┐
│  Recibe tu Reporte Personalizado       │
├─────────────────────────────────────────┤
│                                         │
│  Nombre:                                │
│  [________________________]              │
│                                         │
│  Email:                                 │
│  [________________________]              │
│                                         │
│  Teléfono (opcional):                   │
│  [________________________]              │
│                                         │
│  ☑ Recibir tips semanales por email    │
│  ☑ Notificaciones de ofertas           │
│  ☑ Acceso a comunidad privada          │
│                                         │
│  [ENVIAR MI REPORTE]                    │
│                                         │
└─────────────────────────────────────────┘
```

### 5.2 Email Automático Post-Quiz

**Asunto:** "Tu Reporte Personalizado - Método RESET"

**Contenido:**
1. Saludo personalizado
2. Resumen de su perfil
3. Enlace a descargar reporte PDF
4. Enlace a videos de ejercicios
5. Enlace a webinar
6. Código de descuento
7. Invitación a comunidad privada
8. Próximos pasos

---

## 6. INTEGRACIÓN TÉCNICA

### 6.1 Base de Datos

**Tabla: quiz_responses**
```sql
CREATE TABLE quiz_responses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  nombre VARCHAR(255),
  telefono VARCHAR(20),
  
  -- Respuestas del quiz
  ubicacion_dolor VARCHAR(50),
  duracion_dolor VARCHAR(50),
  ocupacion VARCHAR(50),
  horas_sentado INT,
  triggers JSON,
  tratamientos JSON,
  objetivo VARCHAR(50),
  
  -- Resultados
  severidad DECIMAL(3,1),
  perfil VARCHAR(50),
  codigo_descuento VARCHAR(20),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);
```

### 6.2 Flujo de Datos

```
React Component (Quiz)
  ↓
Respuestas del usuario
  ↓
tRPC Mutation (quiz.submit)
  ↓
Calcular severidad + perfil
  ↓
Generar código de descuento
  ↓
Guardar en BD
  ↓
Enviar email automático (Brevo)
  ↓
Mostrar reporte personalizado
  ↓
Página de agradecimiento
```

### 6.3 Endpoints tRPC Necesarios

```typescript
// Guardar respuestas del quiz
quiz.submit({
  email, nombre, telefono,
  ubicacion_dolor, duracion_dolor, ocupacion,
  horas_sentado, triggers, tratamientos, objetivo
})

// Obtener reporte personalizado
quiz.getReport({ email })

// Obtener recursos por perfil
quiz.getResources({ perfil })
```

---

## 7. TIMELINE Y PRÓXIMOS PASOS

### Fase 1: Desarrollo (1-2 semanas)
- [ ] Crear componente React del quiz
- [ ] Implementar lógica de cálculo de severidad
- [ ] Crear tablas en BD
- [ ] Implementar endpoints tRPC
- [ ] Crear página de resultados

### Fase 2: Recursos (2-3 semanas)
- [ ] Grabar 15 videos de ejercicios
- [ ] Crear 8 PDFs
- [ ] Preparar 4 webinars
- [ ] Configurar comunidad privada

### Fase 3: Integración (1 semana)
- [ ] Integrar quiz en landing
- [ ] Configurar emails automáticos
- [ ] Probar flujo completo
- [ ] Optimizar conversión

### Fase 4: Lanzamiento (1 semana)
- [ ] Testing final
- [ ] Lanzamiento beta
- [ ] Recopilar feedback
- [ ] Optimizaciones finales

---

## 8. MÉTRICAS DE ÉXITO

- Tasa de finalización del quiz: >70%
- Tasa de conversión (quiz → compra): >15%
- Email open rate: >40%
- Click-through rate: >25%
- Satisfacción del usuario: >4.5/5
