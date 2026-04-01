# 📊 GUÍA DE RASTREO DE MÉTRICAS CLAVE

---

## 1️⃣ TASA DE CONVERSIÓN (ASSESSMENT)

**Definición:** % de visitantes que completan el assessment

**Fórmula:** `(Usuarios que completan assessment / Visitantes totales) × 100`

### Cómo se rastrea:

**Google Analytics 4:**
1. Ir a **Analytics → Eventos**
2. Buscar evento: `assessment_completed`
3. Ver en tiempo real o reportes

**En el código (implementado):**
```javascript
// client/src/lib/analytics.ts
trackEvent('assessment_completed', {
  pain_level: answers.painSeverity,
  pain_type: answers.painLocation,
  duration: answers.painDuration
});
```

**En localStorage (backup):**
```javascript
// Datos guardados en navegador del usuario
localStorage.getItem('funnelStats')
// Retorna: { assessmentStarted, assessmentCompleted, ... }
```

**Dashboard en tiempo real:**
- Google Analytics → Tiempo real → Eventos
- Filtra por `assessment_completed`
- Verás conversiones en vivo

**Meta (Facebook Pixel):**
- Facebook Ads Manager → Analytics
- Evento: `ViewContent` (cuando inicia assessment)
- Evento: `AddToCart` (cuando completa assessment)

---

## 2️⃣ TASA DE CONVERSIÓN (CHECKOUT)

**Definición:** % de usuarios que completan el pago

**Fórmula:** `(Pagos completados / Usuarios en checkout) × 100`

### Cómo se rastrea:

**Stripe Dashboard:**
1. Ir a **Stripe.com → Dashboard**
2. **Payments → Transactions**
3. Filtrar por estado: `succeeded` (exitosos)
4. Ver ingresos totales y número de transacciones

**Google Analytics 4:**
1. **Analytics → Eventos**
2. Buscar evento: `payment_completed`
3. Parámetros: `transaction_id`, `revenue`, `payment_method`

**En el código:**
```javascript
// server/routers.ts
trackEvent('payment_completed', {
  transaction_id: session.id,
  revenue: 197,
  payment_method: 'stripe'
});
```

**Facebook Pixel:**
- Evento: `Purchase` (automático desde Stripe webhook)
- Parámetro: `value: 197` (EUR)
- Parámetro: `currency: EUR`

**Webhook Stripe (confirmación):**
```javascript
// server/_core/index.ts
POST /api/stripe-webhook
  - Evento: payment_intent.succeeded
  - Guarda en base de datos
  - Envía email de confirmación
```

---

## 3️⃣ COSTO POR ADQUISICIÓN (CPA)

**Definición:** Cuánto cuesta adquirir un cliente

**Fórmula:** `Gasto en publicidad / Clientes adquiridos`

### Cómo se rastrea:

**Google Ads:**
1. **Campaigns → Conversions**
2. Filtrar por `Purchase` conversion
3. Ver CPA automáticamente calculado

**Facebook Ads:**
1. **Ads Manager → Campaigns**
2. Columna: **Cost per Result**
3. Filtrar por resultado: `Purchase`

**Cálculo manual:**
```
Si gastas €500 en ads y vendes 10 programas:
CPA = €500 / 10 = €50 por cliente
```

**Dashboard personalizado (recomendado):**
```javascript
// Crear endpoint en tRPC para dashboard
GET /api/trpc/analytics.getCPA
  - Parámetro: dateRange (últimos 7 días, 30 días, etc.)
  - Retorna: { totalSpend, totalConversions, cpa }
```

---

## 4️⃣ RETORNO DE INVERSIÓN (ROI)

**Definición:** Ganancia neta por cada euro invertido

**Fórmula:** `((Ingresos - Gastos) / Gastos) × 100`

### Cómo se rastrea:

**Cálculo manual:**
```
Ingresos: 10 clientes × €197 = €1,970
Gastos: €500 (ads)
Ganancia: €1,970 - €500 = €1,470
ROI: (€1,470 / €500) × 100 = 294%
```

**Google Analytics 4:**
1. **Analytics → Conversions → ROAS** (Return on Ad Spend)
2. Conectar Google Ads para ver ROAS automático

**Stripe + Google Ads:**
1. Conectar Stripe a Google Ads
2. Google Ads calcula ROAS automáticamente
3. Ver en **Campaigns → ROAS column**

**Dashboard personalizado:**
```javascript
// Crear en tRPC
GET /api/trpc/analytics.getROI
  - Parámetro: dateRange
  - Retorna: { revenue, expenses, roi }
```

---

## 5️⃣ TIEMPO EN PÁGINA

**Definición:** Promedio de segundos que pasan en la landing

**Fórmula:** `Suma de tiempos / Número de sesiones`

### Cómo se rastrea:

**Google Analytics 4:**
1. **Analytics → Pages and screens**
2. Seleccionar página (ej: `/`)
3. Métrica: **Average session duration**
4. O **Engagement rate**

**En el código (implementado):**
```javascript
// client/src/lib/analytics.ts
useEffect(() => {
  const startTime = Date.now();
  
  return () => {
    const timeOnPage = (Date.now() - startTime) / 1000;
    trackEvent('time_on_page', { 
      duration: timeOnPage,
      page: window.location.pathname 
    });
  };
}, []);
```

**Heatmap (herramienta visual):**
- Usar Hotjar o Clarity (gratis)
- Ver dónde pasan más tiempo los usuarios
- Identificar secciones que generan engagement

---

## 6️⃣ BOUNCE RATE (TASA DE REBOTE)

**Definición:** % de visitantes que se van sin interactuar

**Fórmula:** `(Sesiones con 1 página / Sesiones totales) × 100`

### Cómo se rastrea:

**Google Analytics 4:**
1. **Analytics → Pages and screens**
2. Métrica: **Bounce rate**
3. Ideal: <40% para landing pages

**En el código:**
```javascript
// Detectar si usuario interactúa
const [hasInteracted, setHasInteracted] = useState(false);

useEffect(() => {
  const handleInteraction = () => {
    setHasInteracted(true);
    trackEvent('user_engaged', { page: window.location.pathname });
  };

  window.addEventListener('click', handleInteraction);
  window.addEventListener('scroll', handleInteraction);
  
  return () => {
    window.removeEventListener('click', handleInteraction);
    window.removeEventListener('scroll', handleInteraction);
  };
}, []);
```

**Mejora del bounce rate:**
- Agregar CTAs claros
- Mejorar velocidad de carga
- Hacer contenido más atractivo
- Agregar videos o imágenes

---

## 📱 DASHBOARD EN TIEMPO REAL (RECOMENDADO)

### Crear dashboard personalizado:

```javascript
// server/routers.ts
export const analyticsRouter = router({
  getDailyMetrics: publicProcedure.query(async () => {
    const today = new Date().toISOString().split('T')[0];
    
    return {
      assessmentCompleted: await db.query(
        'SELECT COUNT(*) FROM assessments WHERE DATE(created_at) = ?', [today]
      ),
      paymentsCompleted: await db.query(
        'SELECT COUNT(*) FROM payments WHERE DATE(created_at) = ? AND status = "succeeded"', [today]
      ),
      revenue: await db.query(
        'SELECT SUM(amount) FROM payments WHERE DATE(created_at) = ? AND status = "succeeded"', [today]
      ),
      conversionRate: (assessmentCompleted / pageViews) * 100,
    };
  }),
});
```

### Frontend dashboard:

```tsx
// client/src/pages/AdminDashboard.tsx
export default function AdminDashboard() {
  const { data: metrics } = trpc.analytics.getDailyMetrics.useQuery();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <h3>Assessments Hoy</h3>
        <p className="text-3xl font-bold">{metrics?.assessmentCompleted}</p>
      </Card>
      
      <Card>
        <h3>Pagos Hoy</h3>
        <p className="text-3xl font-bold">{metrics?.paymentsCompleted}</p>
      </Card>
      
      <Card>
        <h3>Ingresos Hoy</h3>
        <p className="text-3xl font-bold">€{metrics?.revenue}</p>
      </Card>
      
      <Card>
        <h3>Tasa Conversión</h3>
        <p className="text-3xl font-bold">{metrics?.conversionRate}%</p>
      </Card>
    </div>
  );
}
```

---

## 🔗 INTEGRACIONES RECOMENDADAS

### Google Analytics 4 (Gratis)
- **Setup:** Ir a Google Analytics → Crear propiedad
- **Tracking ID:** Agregar a `client/index.html`
- **Eventos:** Ya están implementados en `analytics.ts`
- **Dashboard:** analytics.google.com

### Facebook Pixel (Gratis)
- **Setup:** Ir a Facebook Business → Pixel
- **ID:** Agregar a `client/index.html`
- **Eventos:** Ya están implementados (Purchase, ViewContent, etc.)
- **Dashboard:** facebook.com/ads/manager

### Stripe Dashboard (Nativo)
- **Setup:** Ya conectado en checkout
- **Métricas:** Pagos, ingresos, disputas
- **Dashboard:** dashboard.stripe.com

### Google Ads (De pago)
- **Setup:** Crear campaña en Google Ads
- **Conversion tracking:** Conectar a Google Analytics
- **ROAS:** Automático desde Google Analytics

### Hotjar (Gratis hasta 35k sesiones/mes)
- **Setup:** Ir a hotjar.com → Crear sitio
- **Heatmaps:** Ver dónde hacen clic los usuarios
- **Recordings:** Ver sesiones de usuarios reales

---

## 📊 CHECKLIST DE CONFIGURACIÓN

### Antes de lanzar:

- [ ] Google Analytics 4 ID real (reemplazar placeholder)
- [ ] Facebook Pixel ID real (reemplazar placeholder)
- [ ] Google Ads conversion ID (si usas ads)
- [ ] Stripe webhook configurado (confirmación de pagos)
- [ ] Email de confirmación de compra (Brevo)
- [ ] Dashboard de admin para ver métricas

### Después de lanzar:

- [ ] Revisar métricas diariamente (primeras 2 semanas)
- [ ] Ajustar CTAs si conversión < 5%
- [ ] Mejorar contenido si bounce rate > 50%
- [ ] Aumentar presupuesto en ads si ROI > 200%
- [ ] Crear reportes semanales

---

## 🎯 METAS RECOMENDADAS

| Métrica | Meta | Realista |
|---------|------|----------|
| Tasa conversión (Assessment) | >5% | 3-7% |
| Tasa conversión (Checkout) | >10% | 5-15% |
| CPA | <€50 | €30-70 |
| ROI | >200% | 150-300% |
| Tiempo en página | >2 min | 1.5-3 min |
| Bounce rate | <40% | 30-50% |

---

## 📞 SOPORTE

Si necesitas ayuda con:
- **Google Analytics:** support.google.com/analytics
- **Stripe:** stripe.com/support
- **Facebook Pixel:** facebook.com/business/help
- **Hotjar:** hotjar.com/support

---

*Guía actualizada: 31/03/2026*
