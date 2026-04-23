import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface DownloadGuideButtonProps {
  quizId: number;
  resourceType: string;
  resourceName: string;
  className?: string;
}

export function DownloadGuideButton({
  quizId,
  resourceType,
  resourceName,
  className = ''
}: DownloadGuideButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const downloadMutation = trpc.quiz.downloadGuide.useMutation();

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const result = await downloadMutation.mutateAsync({
        quizId,
        resourceType
      });

      if (result.success && result.pdfBase64) {
        // Convert base64 to blob
        const binaryString = atob(result.pdfBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = result.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading guide:', error);
      alert('Error al descargar la guía. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      variant="default"
      className={`gap-2 ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Descargando...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Descargar {resourceName}
        </>
      )}
    </Button>
  );
}
