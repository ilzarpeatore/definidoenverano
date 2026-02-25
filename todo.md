# Definido en Verano - Project TODO

## Core Features
- [x] Landing page con 9 secciones (Hero, Problem, Solution, Testimonials, Coaching, Nutrition, App, CTA, FAQ)
- [x] Assessment page (7-question survey)
- [x] Checkout page con múltiples opciones de pago
- [x] Success page post-purchase
- [x] Admin dashboard para gestionar leads y órdenes

## Payment Integration
- [x] Stripe LIVE integration (keys configuradas y testeadas)
- [x] Stripe checkout flow (Assessment → Checkout → Stripe → Success)
- [ ] PayPal frontend integration (backend listo, frontend pendiente)
- [ ] Klarna integration
- [ ] Apple Pay integration
- [ ] Google Pay integration

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
- [ ] Real domain configuration (definidoenverano.bestronger.es)
- [ ] Real tracking IDs (GA4, Facebook Pixel, Google Ads)

## Testing
- [x] Stripe LIVE payment flow (tested successfully)
- [ ] PayPal payment flow
- [ ] Email notifications after purchase
- [ ] Complete funnel test (Landing → Lead Capture → Assessment → Payment → Success → Email)

## Next Steps
1. Connect PayPal to frontend (Checkout.tsx)
2. Provide 3 PDF files for free resources
3. Configure Brevo welcome email flow
4. Add real tracking IDs
5. Test complete funnel

## Payment Methods Implementation
- [x] Stripe LIVE integration (fully working)
- [ ] PayPal SDK integration (frontend + backend)
- [ ] Apple Pay integration (frontend)
- [ ] Google Pay integration (frontend)
- [ ] Klarna integration (frontend + backend)

## Frontend Payment Implementation
- [ ] Add PayPal SDK script to index.html
- [ ] Create PayPal button component in Checkout.tsx
- [ ] Add Apple Pay session handling
- [ ] Add Google Pay API integration
- [ ] Test all payment methods with real transactions
