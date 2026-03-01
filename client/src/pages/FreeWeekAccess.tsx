import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Free Week Access - Token Validation Page
 * Validates access token and grants 7-day access to app
 */

export default function FreeWeekAccess() {
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Get token from URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (!token) {
          setStatus('error');
          setMessage('Token no válido. Por favor, revisa el enlace en tu email.');
          return;
        }

        // Validate token (in a real app, this would call a backend endpoint)
        // For now, we'll just set a session cookie with the token
        localStorage.setItem('freeWeekToken', token);
        localStorage.setItem('freeWeekExpires', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString());

        setStatus('success');
        setMessage('¡Acceso confirmado! Redirigiendo a tu semana gratuita...');

        // Redirect to app after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error('Error validating token:', error);
        setStatus('error');
        setMessage('Error al validar tu acceso. Por favor, intenta de nuevo.');
      }
    };

    validateToken();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card-glass border border-border p-8 rounded-sm max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Validando acceso...</h1>
            <p className="text-gray-400">Por favor espera mientras confirmamos tu acceso a la semana gratuita.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">¡Acceso Confirmado!</h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <Button onClick={() => navigate('/')} className="w-full">
              Ir a la App
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Error de Acceso</h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <Button onClick={() => navigate('/')} className="w-full">
              Volver a Inicio
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
