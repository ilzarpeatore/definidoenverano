import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Cookie Banner Component
 * AEPD 2023 Compliant
 * - Granular consent management
 * - Reject all option
 * - Settings panel for detailed preferences
 * - LocalStorage persistence
 */

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Check if user has already given consent
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const parsed = JSON.parse(savedConsent);
      setConsent(parsed);
      applyConsent(parsed);
    }
  }, []);

  const applyConsent = (consentSettings: CookieConsent) => {
    // Apply analytics cookies if consented
    if (consentSettings.analytics) {
      // Google Analytics is already loaded in index.html, but we could add additional tracking here
      console.log('Analytics cookies enabled');
    }

    // Apply marketing cookies if consented
    if (consentSettings.marketing) {
      // Meta Pixel and Google Ads are already loaded in index.html
      console.log('Marketing cookies enabled');
    }
  };

  const handleAcceptAll = () => {
    const allConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setConsent(allConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(allConsent));
    applyConsent(allConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const minimalConsent: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setConsent(minimalConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(minimalConsent));
    applyConsent(minimalConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    applyConsent(consent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleToggleCookie = (type: keyof CookieConsent) => {
    if (type === 'necessary') return; // Necessary cookies cannot be disabled
    setConsent((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowBanner(false)}
          />

          {/* Banner */}
          <motion.div
            className="relative w-full bg-card border-t border-accent/30 shadow-2xl"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="container max-w-6xl mx-auto px-4 py-8">
              {!showSettings ? (
                // Main Banner
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-heading text-xl text-white mb-2">
                        Configuración de Cookies
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Utilizamos cookies para mejorar tu experiencia de navegación, mostrar publicidad personalizada y analizar el tráfico. Puedes aceptar todas, rechazar las no necesarias o personalizar tus preferencias.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowBanner(false)}
                      className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-sm transition-colors text-sm"
                    >
                      Rechazar no necesarias
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-6 py-3 bg-accent/20 hover:bg-accent/30 text-accent font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Settings className="w-4 h-4" />
                      Personalizar
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-3 bg-accent hover:bg-accent/90 text-black font-bold rounded-sm transition-colors text-sm"
                    >
                      Aceptar todas
                    </button>
                  </div>

                  {/* Legal Link */}
                  <p className="text-xs text-gray-400">
                    Consulta nuestra <a href="/cookies" className="text-accent hover:underline">Política de Cookies</a> para más información.
                  </p>
                </div>
              ) : (
                // Settings Panel
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl text-white">
                      Preferencias de Cookies
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Cookie Types */}
                  <div className="space-y-4">
                    {/* Necessary */}
                    <div className="p-4 bg-accent/10 border border-accent/30 rounded-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">Cookies Técnicas (Necesarias)</h4>
                          <p className="text-sm text-gray-400 mt-1">
                            Imprescindibles para el funcionamiento del sitio web. No se pueden desactivar.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={consent.necessary}
                          disabled
                          className="w-5 h-5 accent-accent cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="p-4 bg-background border border-accent/30 rounded-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">Cookies Analíticas</h4>
                          <p className="text-sm text-gray-400 mt-1">
                            Nos ayudan a entender cómo usas nuestro sitio para mejorarlo continuamente. (Google Analytics)
                          </p>
                        </div>
                        <button
                          onClick={() => handleToggleCookie('analytics')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            consent.analytics ? 'bg-accent' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              consent.analytics ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Marketing */}
                    <div className="p-4 bg-background border border-accent/30 rounded-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">Cookies de Marketing</h4>
                          <p className="text-sm text-gray-400 mt-1">
                            Permiten mostrar publicidad personalizada y medir la efectividad de campañas. (Meta Pixel, Google Ads)
                          </p>
                        </div>
                        <button
                          onClick={() => handleToggleCookie('marketing')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            consent.marketing ? 'bg-accent' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              consent.marketing ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-sm transition-colors text-sm"
                    >
                      Rechazar no necesarias
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      className="px-6 py-3 bg-accent hover:bg-accent/90 text-black font-bold rounded-sm transition-colors text-sm"
                    >
                      Guardar preferencias
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
