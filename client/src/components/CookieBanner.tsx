import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Cookie Banner Component - Mobile Optimized
 * AEPD 2023 Compliant
 * - Two-step flow: compact banner + settings modal
 * - Swipeable/collapsible on mobile
 * - Granular consent management
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
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    if (consentSettings.analytics) {
      console.log('Analytics cookies enabled');
    }
    if (consentSettings.marketing) {
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
    if (type === 'necessary') return;
    setConsent((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 pointer-events-auto"
            onClick={() => setShowBanner(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Settings Modal */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="absolute inset-0 bg-black/60"
                  onClick={() => setShowSettings(false)}
                />

                <motion.div
                  className="relative w-full md:w-full md:max-w-md bg-card border-t md:border md:rounded-lg border-accent/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                  <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg md:text-xl text-white">
                        Preferencias de Cookies
                      </h3>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                      >
                        <X className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                    </div>

                    {/* Cookie Types */}
                    <div className="space-y-3">
                      {/* Necessary */}
                      <div className="p-3 md:p-4 bg-accent/10 border border-accent/30 rounded-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm md:text-base">
                              Cookies Técnicas
                            </h4>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                              Necesarias para el funcionamiento.
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={consent.necessary}
                            disabled
                            className="w-5 h-5 accent-accent cursor-not-allowed flex-shrink-0 mt-1"
                          />
                        </div>
                      </div>

                      {/* Analytics */}
                      <div className="p-3 md:p-4 bg-background border border-accent/30 rounded-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm md:text-base">
                              Analíticas
                            </h4>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                              Google Analytics
                            </p>
                          </div>
                          <button
                            onClick={() => handleToggleCookie('analytics')}
                            className={`relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                              consent.analytics ? 'bg-accent' : 'bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${
                                consent.analytics ? 'translate-x-4 md:translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Marketing */}
                      <div className="p-3 md:p-4 bg-background border border-accent/30 rounded-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm md:text-base">
                              Marketing
                            </h4>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                              Meta Pixel, Google Ads
                            </p>
                          </div>
                          <button
                            onClick={() => handleToggleCookie('marketing')}
                            className={`relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                              consent.marketing ? 'bg-accent' : 'bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${
                                consent.marketing ? 'translate-x-4 md:translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        onClick={handleRejectAll}
                        className="w-full px-4 py-2 md:py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-sm transition-colors text-xs md:text-sm"
                      >
                        Rechazar no necesarias
                      </button>
                      <button
                        onClick={handleSaveSettings}
                        className="w-full px-4 py-2 md:py-3 bg-accent hover:bg-accent/90 text-black font-bold rounded-sm transition-colors text-xs md:text-sm"
                      >
                        Guardar preferencias
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compact Banner */}
          {!isCollapsed && (
            <motion.div
              className="relative w-full bg-card border-t border-accent/30 shadow-2xl pointer-events-auto"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="container max-w-6xl mx-auto px-3 md:px-4 py-3 md:py-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-sm md:text-base text-white font-bold">
                        Configuración de Cookies
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300 mt-1">
                        Utilizamos cookies para mejorar tu experiencia y mostrar publicidad personalizada.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowBanner(false)}
                      className="text-gray-400 hover:text-white transition-colors flex-shrink-0 mt-1"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={handleRejectAll}
                      className="px-3 md:px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-sm transition-colors text-xs md:text-sm"
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-3 md:px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent font-semibold rounded-sm transition-colors flex items-center justify-center gap-1 text-xs md:text-sm"
                    >
                      <Settings className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Personalizar</span>
                      <span className="sm:hidden">Más</span>
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-3 md:px-4 py-2 bg-accent hover:bg-accent/90 text-black font-bold rounded-sm transition-colors text-xs md:text-sm"
                    >
                      Aceptar
                    </button>
                  </div>

                  {/* Collapse Button - Mobile Only */}
                  <button
                    onClick={() => setIsCollapsed(true)}
                    className="w-full flex items-center justify-center gap-1 text-gray-400 hover:text-white transition-colors text-xs py-1 md:hidden"
                  >
                    <ChevronUp className="w-3 h-3 rotate-180" />
                    Minimizar
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Collapsed Banner - Mobile Only */}
          {isCollapsed && (
            <motion.button
              onClick={() => setIsCollapsed(false)}
              className="relative w-auto mx-3 mb-3 px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent font-semibold rounded-sm transition-colors flex items-center gap-2 text-xs pointer-events-auto"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <Settings className="w-3 h-3" />
              Cookies
              <ChevronUp className="w-3 h-3" />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
