import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator } from 'lucide-react';

interface CalculatorResult {
  tdee: number;
  definicion: number;
  ganancia: number;
  proteina: number;
  carbos: number;
  grasas: number;
}

const activityLevels = [
  { value: 1.2, label: 'Sedentario (poco o ningún ejercicio)' },
  { value: 1.375, label: 'Ligeramente activo (ejercicio 1-3 días/semana)' },
  { value: 1.55, label: 'Moderadamente activo (ejercicio 3-5 días/semana)' },
  { value: 1.725, label: 'Muy activo (ejercicio 6-7 días/semana)' },
  { value: 1.9, label: 'Extremadamente activo (ejercicio intenso diario)' },
];

export default function CalorieCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: '1.55',
    objective: 'definicion',
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateTDEE = (e: React.FormEvent) => {
    e.preventDefault();

    const { age, weight, height, activityLevel, objective } = formData;

    if (!age || !weight || !height) {
      alert('Por favor completa todos los campos');
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    const activity = parseFloat(activityLevel);

    // Harris-Benedict formula (hombres)
    const bmr = 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
    const tdee = Math.round(bmr * activity);

    // Calorías para definición y ganancia
    const definicion = Math.round(tdee * 0.85); // 15% déficit
    const ganancia = Math.round(tdee * 1.1); // 10% superávit

    // Macros (basado en objetivo)
    const caloriasTrabajo = objective === 'definicion' ? definicion : ganancia;
    const proteina = Math.round((w * 2.2) / 1); // 2.2g por kg
    const proteinaCalories = proteina * 4;
    const grasasCalories = Math.round(caloriasTrabajo * 0.25); // 25% del total
    const grasas = Math.round(grasasCalories / 9);
    const carbosCalories = caloriasTrabajo - proteinaCalories - grasasCalories;
    const carbos = Math.round(carbosCalories / 4);

    setResult({
      tdee,
      definicion,
      ganancia,
      proteina,
      carbos,
      grasas,
    });
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#b8860b] to-[#d4af37] py-16 px-4 text-center">
        <div className="flex justify-center mb-4">
          <Calculator className="w-12 h-12 text-black" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Calculadora de Calorías y Macros
        </h1>
        <p className="text-lg text-black/80 max-w-2xl mx-auto">
          Descubre exactamente cuántas calorías necesitas y la distribución perfecta de macros para tu objetivo
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tu Información</h2>
            <form onSubmit={calculateTDEE} className="space-y-5">
              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Edad (años)
                </label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-[#d4af37]"
                  placeholder="30"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  min="40"
                  max="200"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-[#d4af37]"
                  placeholder="80"
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  min="140"
                  max="220"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-[#d4af37]"
                  placeholder="175"
                />
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Nivel de Actividad
                </label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-[#d4af37]"
                >
                  {activityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Objective */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Objetivo
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="objective"
                      value="definicion"
                      checked={formData.objective === 'definicion'}
                      onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground">Definición (perder grasa)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="objective"
                      value="ganancia"
                      checked={formData.objective === 'ganancia'}
                      onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground">Ganancia (ganar músculo)</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#d4af37] text-black hover:bg-[#b8860b] font-bold mt-6"
              >
                Calcular <Calculator className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Results */}
          {showResult && result && (
            <div className="space-y-6">
              {/* TDEE Card */}
              <div className="bg-gradient-to-br from-[#d4af37]/20 to-[#b8860b]/20 border border-[#d4af37] rounded-lg p-8">
                <h3 className="text-sm font-semibold text-[#d4af37] mb-2 uppercase">Gasto Calórico Diario</h3>
                <div className="text-5xl font-bold text-[#d4af37] mb-2">{result.tdee}</div>
                <p className="text-foreground/80 text-sm">calorías/día (mantenimiento)</p>
              </div>

              {/* Objective Calories */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Definición</h4>
                  <div className="text-3xl font-bold text-[#d4af37]">{result.definicion}</div>
                  <p className="text-foreground/70 text-xs mt-1">-15% déficit calórico</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Ganancia</h4>
                  <div className="text-3xl font-bold text-[#d4af37]">{result.ganancia}</div>
                  <p className="text-foreground/70 text-xs mt-1">+10% superávit calórico</p>
                </div>
              </div>

              {/* Macros */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-lg font-bold text-foreground mb-6">Distribución de Macros</h3>
                <p className="text-foreground/70 text-xs mb-4">
                  Basado en tu objetivo de <strong>{formData.objective === 'definicion' ? 'definición' : 'ganancia'}</strong>
                </p>

                <div className="space-y-4">
                  {/* Proteína */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-foreground">Proteína</span>
                      <span className="text-[#d4af37] font-bold">{result.proteina}g</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div
                        className="bg-[#d4af37] h-2 rounded-full"
                        style={{ width: '30%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-foreground/60 mt-1">~{Math.round((result.proteina * 4) / (formData.objective === 'definicion' ? result.definicion : result.ganancia) * 100)}% del total</p>
                  </div>

                  {/* Carbos */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-foreground">Carbohidratos</span>
                      <span className="text-[#d4af37] font-bold">{result.carbos}g</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div
                        className="bg-[#d4af37] h-2 rounded-full"
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-foreground/60 mt-1">~{Math.round((result.carbos * 4) / (formData.objective === 'definicion' ? result.definicion : result.ganancia) * 100)}% del total</p>
                  </div>

                  {/* Grasas */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-foreground">Grasas</span>
                      <span className="text-[#d4af37] font-bold">{result.grasas}g</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div
                        className="bg-[#d4af37] h-2 rounded-full"
                        style={{ width: '25%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-foreground/60 mt-1">~{Math.round((result.grasas * 9) / (formData.objective === 'definicion' ? result.definicion : result.ganancia) * 100)}% del total</p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">💡 Tips Importantes</h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>• Estos números son una estimación. Ajusta según tus resultados reales.</li>
                  <li>• La consistencia es más importante que la precisión exacta.</li>
                  <li>• Aumenta o reduce 200 calorías si no ves cambios en 2-3 semanas.</li>
                  <li>• Bebe suficiente agua y duerme 7-9 horas diarias.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!showResult && (
            <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center min-h-96">
              <div className="text-center">
                <Calculator className="w-16 h-16 text-[#d4af37]/50 mx-auto mb-4" />
                <p className="text-foreground/60">Completa el formulario para ver tus resultados</p>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        {showResult && (
          <div className="mt-16 p-8 bg-gradient-to-r from-[#d4af37] to-[#b8860b] rounded-lg text-center">
            <h2 className="text-2xl font-bold text-black mb-4">
              Ahora obtén tu plan personalizado
            </h2>
            <p className="text-black/80 mb-6 max-w-xl mx-auto">
              Estos números son solo el inicio. En nuestro programa, te damos el plan de entrenamiento y nutrición completo, adaptado a tu estilo de vida ocupado.
            </p>
            <Button
              size="lg"
              className="bg-black text-[#d4af37] hover:bg-black/80 font-bold"
              onClick={() => window.location.href = '/checkout'}
            >
              Acceder al Programa <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <p className="text-black/70 text-sm mt-4">
              Garantía de 30 días. Si no ves resultados, devolvemos tu dinero.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
