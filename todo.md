# Definido en Verano - Project TODO

## Core Features
- [x] Landing page con 9 secciones (Hero, Problem, Solution, Testimonials, Coaching, Nutrition, App, CTA, FAQ)
- [x] Assessment page (7-question survey)
- [x] Checkout page con botón único Stripe (todos los métodos de pago)
- [x] URLs dinámicas (funciona en preview y producción)
- [x] Success page post-purchase
- [x] Admin dashboard para gestionar leads y órdenes

## Payment Integration
- [x] Stripe LIVE integration (keys configuradas y testeadas)
- [x] Stripe checkout flow (Assessment → Checkout → Stripe → Success)
- [x] PayPal frontend integration (backend listo, frontend pendiente)
- [x] Klarna integration (via Stripe Checkout)
- [x] Apple Pay integration (via Stripe Checkout)
- [x] Google Pay integration (via Stripe Checkout)

## Marketing & Lead Capture
- [x] Lead magnet popup (semana gratis)
- [x] Free resources section (3 PDFs)
- [x] Brevo integration (API validada)
- [x] Lead capture system
- [ ] PDF files para descargar (Guía 7 Errores, Calculadora Macros, Checklist 30 días)

## SEO & Analytics
- [x] Meta tags completos
- [x] Schema.json estructurado
- [x] robots.txt y sitemap.xml
- [x] .htaccess con redirecciones
- [x] Google Analytics 4 (placeholder)
- [x] Facebook Pixel (placeholder)
- [x] Google Ads tracking (placeholder)

## Database & Backend
- [x] Database schema (customers, orders, assessmentResponses, leads, freeResources)
- [x] tRPC routers (payments, leads, admin)
- [x] Stripe service
- [x] PayPal service
- [x] Brevo service

## Deployment
- [x] FTP-ready compiled files
- [x] Real domain configuration (definidoenverano.bestronger.es)
- [ ] Real tracking IDs (GA4, Facebook Pixel, Google Ads)

## Email & Notifications
- [x] Actualizar emails en landing (contacto, newsletter, noreply)
- [x] Implementar webhook de Stripe para pagos completados
- [x] Configurar notificaciones en Manus para notificaciones@bestronger.es
- [ ] Integrar Brevo para emails de bienvenida automáticos
- [ ] Cambiar precio de vuelta a €197 (actualmente es €0.50 para pruebas)

## UX Improvements (Current Session)
- [x] Convertir TestimonialSection a slider horizontal
- [x] Expandir TransformationGallery con 7 transformaciones
- [x] Convertir TransformationGallery a slider horizontal

## Testing
- [x] Stripe LIVE payment flow (tested successfully)
- [x] Stripe Checkout redirect (tested successfully)
- [ ] PayPal payment flow
- [ ] Email notifications after purchase
- [ ] Complete funnel test (Landing → Lead Capture → Assessment → Payment → Success → Email)

## Next Steps
1. Connect PayPal to frontend (Checkout.tsx)
2. Provide 3 PDF files for free resources
3. Configure Brevo welcome email flow
4. Add real tracking IDs
5. Test complete funnel

## Términos y Condiciones
- [x] Crear página de Términos y Condiciones
- [x] Agregar ruta /terms a App.tsx
- [x] Agregar enlace en Footer

## Política de Privacidad
- [x] Crear página de Política de Privacidad
- [x] Agregar ruta /privacy a App.tsx
- [x] Agregar enlace en Footer

## Política de Cookies y Banner AEPD 2023
- [x] Crear página de Política de Cookies
- [x] Crear componente CookieBanner con gestión de consentimiento
- [x] Agregar ruta /cookies a App.tsx
- [x] Integrar CookieBanner en App.tsx
- [x] Agregar enlace en Footer

## Optimización de Banner de Cookies para Móvil
- [x] Refactorizar CookieBanner con diseño responsive
- [x] Implementar dos pasos: banner compacto + modal de configuración
- [x] Agregar funcionalidad deslizable y minimizable
- [x] Testear en versión móvil

## Aviso Legal
- [x] Crear página de Aviso Legal
- [x] Agregar ruta /legal a App.tsx
- [x] Agregar enlace en Footer

## Consentimiento Informado
- [x] Crear tabla de consentimientos en base de datos
- [x] Crear página de Consentimiento Informado
- [x] Agregar ruta /informed-consent a App.tsx
- [x] Integrar checkbox de consentimiento en Checkout
- [x] Crear procedimiento tRPC para guardar consentimiento (IP, fecha, hora)
- [x] Testear flujo completo

## Garantía y Política de Devolución
- [x] Crear página de Garantía y Devolución
- [x] Agregar ruta /refund-policy a App.tsx
- [x] Agregar enlace en Footer

## Recuadros de Fases de Precios
- [x] Crear componente PricingPhaseCard
- [x] Agregar recuadros de fases a Home.tsx (2-3 veces)
- [x] Testear y guardar checkpoint

## Modificación de Recuadros de Fases Dinámicos
- [x] Crear lógica de cálculo de fases basada en tiempo real
- [x] Refactorizar PricingPhaseCard para mostrar fase actual
- [x] Reorganizar posiciones (inicio, mitad, final)
- [x] Testear y guardar checkpoint

## Variantes de Recuadros de Fases
- [x] Crear variantes de PricingPhaseCard (Current, Next, Future)
- [x] Ajustar tamaño y visibilidad del contenido
- [x] Actualizar Home.tsx con variantes correctas
- [x] Testear y guardar checkpoint

## Reorganización de Posiciones de Fases
- [x] Actualizar Home.tsx con orden correcto (Lanzamiento, Expansión, Consolidación)
- [x] Testear y guardar checkpoint

## Bug Fix: PricingPhaseCard Solo Muestra Un Recuadro
- [x] Refactorizar PricingPhaseCard para renderizar todas las variantes
- [x] Testear que se muestren los 3 recuadros
- [x] Guardar checkpoint

## Bug Fix: Recuadros de Fases No Se Muestran Correctamente
- [x] Ajustar fecha de lanzamiento a hoy (28 feb 2026)
- [x] Revisar lógica de cálculo de fases en pricingPhases.ts
- [x] Verificar que los tres recuadros se muestren
- [x] Testear y guardar checkpoint

## Bloque de Oferta Destacada
- [x] Crear componente PricingOfferBlock
- [x] Agregar bloque a Home.tsx a mitad de página
- [x] Testear y guardar checkpoint

## Arreglos de Página
- [x] Mover Fase de Consolidación antes de CTASection
- [x] Identificar y arreglar caracteres escapados \n
- [x] Testear y guardar checkpoint

## Plantilla de Correo Brevo
- [x] Crear plantilla HTML para semana gratuita
- [x] Guardar y documentar uso en proyecto


## Calculadora de Calorías y Macros
- [x] Crear componente CalorieCalculator
- [x] Agregar ruta /calculadora a App.tsx
- [x] Testear y guardar checkpoint

## Checklist Interactivo de 30 Días
- [x] Crear componente ChecklistDay30 con localStorage
- [x] Agregar funcionalidad de guardar progreso por email
- [x] Agregar ruta /checklist-30-dias a App.tsx
- [x] Testear y guardar checkpoint


## Refactorización de Checklist (Sin Emails Automáticos)
- [x] Refactorizar ChecklistDay30 para guardar/recuperar sin emails automáticos
- [x] Testear y guardar checkpoint
