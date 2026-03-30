import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! 👋 Soy el asistente del Método RESET. ¿Cómo puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAgentAvailable] = useState(true);
  const [agentHours] = useState('Lunes-Viernes 9:00-18:00 (CET)');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Llamar a API para obtener respuesta del bot
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          conversationId: Date.now().toString(),
        }),
      });

      const data = await response.json();

      // Agregar respuesta del bot
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.response || 'Lo siento, no pude procesar tu pregunta. ¿Quieres hablar con un agente?',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Parece que hay un problema técnico. ¿Quieres que te conecte con un agente?',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestAgent = () => {
    const agentMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: '✓ Te conectaremos con un agente en breve. Mientras tanto, puedes dejar tu pregunta y nos pondremos en contacto lo antes posible.',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, agentMessage]);
  };



  return (
    <>
      {/* Botón flotante */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-accent hover:bg-accent/90 text-black rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] bg-background border border-border rounded-lg shadow-2xl flex flex-col"
            style={{ maxHeight: '600px' }}
          >
            {/* Header */}
            <div className="bg-accent text-black p-4 rounded-t-lg">
              <h3 className="font-bold text-lg">Asistente Método RESET</h3>
              <p className="text-sm opacity-90">
                {isAgentAvailable ? '✓ Agente disponible' : `Disponible: ${agentHours}`}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-accent text-black rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                    <Loader size={20} className="animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4 space-y-2">
              {!isAgentAvailable && (
                <button
                  onClick={handleRequestAgent}
                  className="w-full text-sm bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors"
                >
                  Hablar con un agente
                </button>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 bg-muted border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-accent hover:bg-accent/90 disabled:opacity-50 text-black p-2 rounded transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
