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
