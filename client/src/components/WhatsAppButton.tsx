import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = '34643991086'; // +34 643991086 without + and spaces
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Definido%20en%20Verano`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap mb-2 animate-in fade-in duration-200">
          ¿Preguntas? Escríbenos
          <div className="absolute bottom-0 right-4 w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1"></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* Mobile-friendly text */}
      <div className="absolute bottom-16 right-0 md:hidden bg-gray-900 text-white px-3 py-1 rounded text-xs whitespace-nowrap mb-2">
        WhatsApp
      </div>
    </div>
  );
}
