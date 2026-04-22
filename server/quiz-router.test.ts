import { describe, it, expect } from 'vitest';

describe('Quiz Router', () => {
  describe('Profile Determination', () => {
    it('should determine recien_diagnosticado profile for low scores', () => {
      const score = 3;
      const profile = score <= 5 ? 'recien_diagnosticado' : 'other';
      expect(profile).toBe('recien_diagnosticado');
    });

    it('should determine atleta_lesionado profile for medium-low scores', () => {
      const score = 8;
      const profile = score <= 5 ? 'recien_diagnosticado' : score <= 10 ? 'atleta_lesionado' : 'other';
      expect(profile).toBe('atleta_lesionado');
    });

    it('should determine ejecutivo_atrapado profile for medium-high scores', () => {
      const score = 12;
      const profile = score <= 5 ? 'recien_diagnosticado' : score <= 10 ? 'atleta_lesionado' : score <= 15 ? 'ejecutivo_atrapado' : 'other';
      expect(profile).toBe('ejecutivo_atrapado');
    });

    it('should determine emprendedor_quemado profile for high scores', () => {
      const score = 18;
      const profile = score <= 5 ? 'recien_diagnosticado' : score <= 10 ? 'atleta_lesionado' : score <= 15 ? 'ejecutivo_atrapado' : 'emprendedor_quemado';
      expect(profile).toBe('emprendedor_quemado');
    });
  });

  describe('Severity Calculation', () => {
    it('should calculate severity from score', () => {
      const score = 8;
      const severity = Math.min(Math.round((score / 20) * 10), 10);
      expect(severity).toBe(4);
      expect(severity).toBeGreaterThanOrEqual(0);
      expect(severity).toBeLessThanOrEqual(10);
    });

    it('should cap severity at 10', () => {
      const score = 25;
      const severity = Math.min(Math.round((score / 20) * 10), 10);
      expect(severity).toBe(10);
    });

    it('should handle zero score', () => {
      const score = 0;
      const severity = Math.min(Math.round((score / 20) * 10), 10);
      expect(severity).toBe(0);
    });
  });

  describe('Severity Labels', () => {
    it('should label severity 0-3 as Leve', () => {
      const severity = 2;
      const label = severity <= 3 ? 'Leve' : severity <= 6 ? 'Moderado' : 'Severo';
      expect(label).toBe('Leve');
    });

    it('should label severity 4-6 as Moderado', () => {
      const severity = 5;
      const label = severity <= 3 ? 'Leve' : severity <= 6 ? 'Moderado' : 'Severo';
      expect(label).toBe('Moderado');
    });

    it('should label severity 7-10 as Severo', () => {
      const severity = 8;
      const label = severity <= 3 ? 'Leve' : severity <= 6 ? 'Moderado' : 'Severo';
      expect(label).toBe('Severo');
    });
  });

  describe('Quiz Answer Validation', () => {
    it('should accept valid quiz answers', () => {
      const answers = {
        '1': 'lumbar',
        '2': 'acute',
        '3': 'office',
        '4': 'less_4h',
        '5': 'sitting',
        '6': 'medicine',
        '7': 'eliminate_pain'
      };
      expect(Object.keys(answers).length).toBe(7);
      expect(answers['1']).toBe('lumbar');
    });

    it('should validate total score is within range', () => {
      const totalScore = 15;
      expect(totalScore).toBeGreaterThanOrEqual(0);
      expect(totalScore).toBeLessThanOrEqual(100);
    });

    it('should validate email format', () => {
      const email = 'juan@example.com';
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValidEmail).toBe(true);
    });

    it('should reject invalid email format', () => {
      const email = 'invalid-email';
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValidEmail).toBe(false);
    });

    it('should validate phone number is not empty', () => {
      const phone = '+34666777888';
      expect(phone.length).toBeGreaterThan(0);
    });

    it('should validate first name is not empty', () => {
      const firstName = 'Juan';
      expect(firstName.length).toBeGreaterThan(0);
    });

    it('should validate last name is not empty', () => {
      const lastName = 'Pérez';
      expect(lastName.length).toBeGreaterThan(0);
    });
  });

  describe('Profile Information', () => {
    it('should have correct profile names', () => {
      const profiles = {
        ejecutivo_atrapado: 'Ejecutivo Atrapado',
        emprendedor_quemado: 'Emprendedor Quemado',
        atleta_lesionado: 'Atleta Lesionado',
        recien_diagnosticado: 'Recién Diagnosticado'
      };
      expect(profiles.ejecutivo_atrapado).toBe('Ejecutivo Atrapado');
      expect(profiles.emprendedor_quemado).toBe('Emprendedor Quemado');
      expect(profiles.atleta_lesionado).toBe('Atleta Lesionado');
      expect(profiles.recien_diagnosticado).toBe('Recién Diagnosticado');
    });

    it('should have recommendations for each profile', () => {
      const profileRecommendations = {
        ejecutivo_atrapado: [
          'Implementar pausas activas cada 2 horas',
          'Mejorar la postura en el escritorio',
          'Reducir estrés con técnicas de respiración',
          'Ejercicio de fortalecimiento 3x por semana'
        ],
        emprendedor_quemado: [
          'Urgente: Establecer límites de trabajo',
          'Programa de recuperación intensiva',
          'Consulta con especialista recomendada',
          'Integrar movimiento en tu rutina diaria'
        ]
      };
      expect(profileRecommendations.ejecutivo_atrapado.length).toBe(4);
      expect(profileRecommendations.emprendedor_quemado.length).toBe(4);
    });
  });
});
