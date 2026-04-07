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


## Calculadora de Calorías y Macros (ELIMINADO)
- [x] Eliminar componente CalorieCalculator
- [x] Eliminar ruta /calculadora de App.tsx

## Checklist Interactivo de 30 Días (ELIMINADO)
- [x] Eliminar componente ChecklistDay30
- [x] Eliminar ruta /checklist-30-dias de App.tsx

## Nuevos Recursos (Reemplazo)
- [x] Crear componente CostCalculator (Calculadora: Costo del Dolor Lumbar)
- [x] Crear componente CervicalExercisesGuide (Guía: Ejercicios para Aliviar Dolor Cervical)
- [x] Crear componente PosturalChecklistHome (Checklist: Evaluación Postural en Casa)
- [x] Actualizar FreeResourcesSection con nuevos recursos
- [x] Agregar rutas en App.tsx (/cost-calculator, /cervical-exercises, /postural-checklist)

## Mejoras de Copy y Tono (Current Session)
- [x] Cambiar "Evaluación" a "Valoración" en todo el sitio para tono más empático
- [x] Actualizar LeadMagnetPopup: "Evaluación Personalizada" → "Valoración Personalizada"
- [x] Actualizar QuickAssessment: "Evaluación Rápida" → "Valoración Rápida"
- [x] Actualizar Home.tsx CTA: "Realizar Evaluación" → "Realizar Valoración"
- [x] Actualizar AssessmentResults: Todos los textos de "evaluación" a "valoración" (8 instancias)
- [x] Verificar cambios en navegador y confirmar tono más empático


## Optimizaciones Críticas (Current Session - Batch Update)
- [x] Solucionar responsive de fotos (móvil y tablet - aspect-ratio + lazy loading)
- [x] Añadir número de teléfono visible en pop-up para WhatsApp (+34 666 777 888)
- [x] Optimizar velocidad de carga (lazy loading en todas las imágenes)
- [x] Revisar y mejorar copy de CTAs (urgencia + beneficio + micro-copy)
- [x] Optimizar posicionamiento SEO (meta tags, schemas JSON-LD, keywords para reset.bestronger.es)
- [x] Implementar A/B testing en CTAs y pop-ups (hook useABTest con localStorage)
- [x] Configurar analytics avanzado (funnel tracking, Facebook Pixel, Google Ads)
- [x] Implementar chatbot/live chat con agente Manus (componente flotante + escalado)


## Bug Fixes - Session Actual
- [x] Botones de blog ('solicitar evaluación' y 'comenzar evaluación') redireccionan a /quick-assessment
- [x] Imágenes de publicaciones del blog (URLs de CDN validadas)
- [x] Eliminar botón 'Acceder a la App' de landing page (AppSection)
- [x] Corregir redireccionamientos de CTA a /checkout (CTASection)
- [x] Agregar más botones CTA estratégicos (SolutionSection, TestimonialSection)


## Botónes de Compra en Assessment (Current Session)
- [x] Agregar botones "Contratar" y "Comprar" al final de AssessmentResults
- [x] Configurar redireccionamientos (Contratar → /checkout, Comprar → /checkout)
- [x] Testear y guardar checkpoint


## Mejoras del Formulario de Assessment (Current Session)
- [x] Agregar checkbox de aceptación de términos y privacidad
- [x] Cambiar botón "Contratar" para contactar por WhatsApp
- [x] Arreglar navegación hacia atrás (botón Volver en Checkout)
- [x] Guardar checkpoint


## Sincronización Dinámica de Precios (Current Session)
- [x] Crear hook usePricingSync() con actualización cada 5 minutos (localStorage + refetch cada 5min)
- [x] Actualizar componentes (HeroSection, CTASection)
- [x] Actualizar páginas (Checkout, CostCalculator)
- [x] Verificar sincronización en navegador (sin errores TypeScript)
- [x] Guardar checkpoint final

## PricingContext Implementation (Current Session)
- [x] Crear PricingContext.tsx para estado global de precios
- [x] Crear PricingProvider en main.tsx
- [x] Reemplazar usePricingSync() con usePricing() en HeroSection
- [x] Reemplazar usePricingSync() con usePricing() en CTASection
- [x] Reemplazar usePricingSync() con usePricing() en Checkout
- [x] Reemplazar useCurrentPrice() con usePricing() en CostCalculator
- [x] Reemplazar usePricingSync() con usePricing() en PricingOfferBlock
- [x] Crear tests para PricingContext (PricingContext.test.ts)
- [ ] Cambiar precio de Stripe de €0.50 (testing) a €197 (production) - CRÍTICO
- [ ] Crear dashboard de usuario post-compra
- [ ] Implementar email automatizado post-compra con Brevo

## Bug Fix: Testimonial Photos Duplicadas (Current Session)
- [x] Identificar problema: todas las personas en TestimonialSection tenían la misma foto
- [x] Generar 3 fotos únicas: Carlos M. (programador), María G. (abogada), David L. (consultor)
- [x] Actualizar URLs en TestimonialSection.tsx con imágenes únicas
- [x] Verificar que cada testimonial muestre foto diferente

## Bug Fix: Button Redirects (Current Session)
- [x] Encontrar todas las instancias de /assessment en componentes
- [x] Cambiar /assessment a /quick-assessment en Checkout.tsx (2 instancias)
- [x] Cambiar /assessment a /quick-assessment en PricingOfferBlock.tsx (1 instancia)
- [x] Verificar que todos los botones redirigen correctamente

## Bug Fix: Remove Nutrition Plan References (Current Session)
- [x] Encontrar todas las referencias a "Plan de nutrición personalizado"
- [x] Eliminar de PricingOfferBlock.tsx (benefits list)
- [x] Eliminar de Success.tsx (post-purchase checklist)
- [x] Verificar que no hay más referencias en componentes principales
