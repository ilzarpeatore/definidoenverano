import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mx-4 shadow-lg border border-border bg-card">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100/20 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-red-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">404</h1>

          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            Página No Encontrada
          </h2>

          <p className="text-gray-400 mb-8 leading-relaxed">
            Lo sentimos, la página que buscas no existe.
            <br />
            Puede haber sido movida o eliminada.
          </p>

          <div
            id="not-found-button-group"
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="border-border hover:bg-accent/10 text-foreground px-6 py-2.5 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Atrás
            </Button>
            <Button
              onClick={handleGoHome}
              className="bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Ir a Inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
