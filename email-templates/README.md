# Plantillas de Correo Brevo - Definido en Verano

Este directorio contiene las plantillas HTML para correos electrónicos enviados a través de Brevo (Sendinblue).

## Plantillas Disponibles

### 1. brevo-free-week-welcome.html
**Propósito:** Bienvenida a la semana gratuita de entrenamiento

**Cuándo enviar:** Inmediatamente después de que el usuario se registre y acceda a la semana gratuita

**Contenido:**
- Bienvenida personalizada
- Información sobre la preparación del entrenamiento
- Detalles de acceso a la app
- Comparativa: Semana Gratuita vs Programa Completo
- Beneficios del programa completo
- Botón de acceso a la app
- Botón de contacto por WhatsApp

**Variables Dinámicas (Brevo):**
- `{{CONTACT_FIRSTNAME}}` - Nombre del usuario
- `{{UNSUBSCRIBE_LINK}}` - Enlace de desuscripción automático

**Instrucciones de Uso en Brevo:**

1. **Acceder a Brevo:** Ve a [app.brevo.com](https://app.brevo.com)
2. **Crear Nueva Campaña:** Campaigns → Create → Email campaign
3. **Seleccionar Destinatarios:** Elige el contacto o lista de contactos
4. **Editar Contenido:** 
   - Click en "Design" o "Code editor"
   - Copia el contenido HTML completo de `brevo-free-week-welcome.html`
   - Pega en el editor de código
5. **Personalizar:**
   - Reemplaza `https://app.bestronger.es/login` con la URL correcta de tu app
   - Reemplaza `https://wa.me/34XXXXXXXXX` con tu número de WhatsApp (formato: +34XXXXXXXXX)
   - Actualiza los enlaces del footer con tus URLs reales
6. **Previsualizar:** Click en "Preview" para ver cómo se ve en diferentes dispositivos
7. **Enviar:** Click en "Send" o "Schedule" para programar el envío

**Características Técnicas:**
- Diseño responsive (móvil y desktop)
- Colores consistentes con la landing (dorado #d4af37, negro #0a0a0a)
- Tabla comparativa con checkmarks y X
- Botones CTA destacados
- Footer con enlaces legales
- Compatible con clientes de correo principales

**Personalizaciones Recomendadas:**
- Cambiar el número de WhatsApp en el botón
- Actualizar URLs de app y enlaces del footer
- Ajustar el nombre de la empresa si es necesario
- Agregar logo si lo deseas (insertar imagen en el header)

**Notas Importantes:**
- Brevo soporta variables dinámicas con formato `{{VARIABLE_NAME}}`
- Asegúrate de que los enlaces sean válidos antes de enviar
- Prueba el correo en diferentes clientes (Gmail, Outlook, Apple Mail, etc.)
- Mantén el contenido conciso para mejor tasa de lectura
- El botón de WhatsApp redirige directamente a un chat


---

### 2. brevo-post-purchase-welcome.html
**Propósito:** Bienvenida post-compra del programa completo

**Cuándo enviar:** Inmediatamente después de completar el pago

**Contenido:**
- Agradecimiento por la compra
- Información sobre acceso (se recibirá en 24h)
- Lista completa de beneficios (8 items)
- 4 testimonios/reseñas de clientes reales
- Próximos pasos claros
- Sección de soporte
- Botón de acceso a la app
- Botón de contacto por WhatsApp

**Variables Dinámicas (Brevo):**
- `{{CONTACT_FIRSTNAME}}` - Nombre del usuario
- `{{UNSUBSCRIBE_LINK}}` - Enlace de desuscripción automático

**Instrucciones de Uso en Brevo:**

1. **Acceder a Brevo:** Ve a [app.brevo.com](https://app.brevo.com)
2. **Crear Nueva Campaña:** Campaigns → Create → Email campaign
3. **Seleccionar Destinatarios:** Elige el contacto o lista de contactos
4. **Editar Contenido:** 
   - Click en "Design" o "Code editor"
   - Copia el contenido HTML completo de `brevo-post-purchase-welcome.html`
   - Pega en el editor de código
5. **Personalizar:**
   - Reemplaza `https://app.bestronger.es/login` con la URL correcta de tu app
   - Reemplaza `https://wa.me/34XXXXXXXXX` con tu número de WhatsApp (formato: +34XXXXXXXXX)
   - Actualiza los enlaces del footer con tus URLs reales
   - Personaliza los testimonios con clientes reales si lo deseas
6. **Previsualizar:** Click en "Preview" para ver cómo se ve en diferentes dispositivos
7. **Enviar:** Click en "Send" o "Schedule" para programar el envío

**Características Técnicas:**
- Diseño responsive (móvil y desktop)
- Colores consistentes con la landing (dorado #d4af37, negro #0a0a0a)
- Tarjetas de testimonios con avatares
- Lista de beneficios con checkmarks
- Botones CTA destacados
- Footer con enlaces legales
- Compatible con clientes de correo principales

**Personalizaciones Recomendadas:**
- Cambiar el número de WhatsApp en el botón
- Actualizar URLs de app y enlaces del footer
- Reemplazar testimonios con clientes reales de tu programa
- Ajustar nombres y profesiones de testimonios
- Agregar logo si lo deseas (insertar imagen en el header)

**Notas Importantes:**
- Este correo debe enviarse automáticamente tras completar el pago
- Los testimonios son ejemplos - personaliza con clientes reales
- Asegúrate de que el acceso esté listo antes de enviar este correo
- El correo debe ser motivacional y establecer expectativas claras
