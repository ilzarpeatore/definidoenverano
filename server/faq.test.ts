import { describe, it, expect } from 'vitest';
import { findMatchingFAQ, faqDatabase } from './faq';

describe('FAQ Matching', () => {
  it('should find FAQ for "¿En qué consiste el programa?"', () => {
    const result = findMatchingFAQ('¿En qué consiste el programa?');
    expect(result).toBeDefined();
    expect(result?.id).toBe('what-is-program');
  });

  it('should find FAQ for "qué es el método reset"', () => {
    const result = findMatchingFAQ('qué es el método reset');
    expect(result).toBeDefined();
    expect(result?.id).toBe('what-is-program');
  });

  it('should find FAQ for "cuánto cuesta"', () => {
    const result = findMatchingFAQ('cuánto cuesta');
    expect(result).toBeDefined();
    expect(result?.id).toBe('price');
  });

  it('should find FAQ for "hay garantía"', () => {
    const result = findMatchingFAQ('hay garantía');
    expect(result).toBeDefined();
    expect(result?.id).toBe('guarantee');
  });

  it('should find FAQ for "cuándo tengo acceso"', () => {
    const result = findMatchingFAQ('cuándo tengo acceso');
    expect(result).toBeDefined();
    expect(result?.id).toBe('access');
  });

  it('should find FAQ for "cuánto dura el programa"', () => {
    const result = findMatchingFAQ('cuánto dura el programa');
    expect(result).toBeDefined();
    expect(result?.id).toBe('how-long');
  });

  it('should find FAQ for "para quién es"', () => {
    const result = findMatchingFAQ('para quién es');
    expect(result).toBeDefined();
    expect(result?.id).toBe('who-is-for');
  });

  it('should find FAQ for "cuándo veo resultados"', () => {
    const result = findMatchingFAQ('cuándo veo resultados');
    expect(result).toBeDefined();
    expect(result?.id).toBe('results-timeline');
  });

  it('should find FAQ for "cómo descargar la app"', () => {
    const result = findMatchingFAQ('cómo descargar la app');
    expect(result).toBeDefined();
    expect(result?.id).toBe('app-access');
  });

  it('should find FAQ for "hay soporte"', () => {
    const result = findMatchingFAQ('hay soporte');
    expect(result).toBeDefined();
    expect(result?.id).toBe('support');
  });

  it('should find FAQ for "métodos de pago"', () => {
    const result = findMatchingFAQ('métodos de pago');
    expect(result).toBeDefined();
    expect(result?.id).toBe('payment-methods');
  });

  it('should find FAQ for "devolución"', () => {
    const result = findMatchingFAQ('devolución');
    expect(result).toBeDefined();
    expect(result?.id).toBe('refund-process');
  });

  it('should find best match for pain-related questions', () => {
    const result = findMatchingFAQ('tengo dolor de espalda hace 5 anos, que puedo hacer');
    expect(result).toBeDefined();
    expect(result?.id).toBeDefined();
  });

  it('should be case insensitive', () => {
    const result1 = findMatchingFAQ('CUÁNTO CUESTA');
    const result2 = findMatchingFAQ('cuánto cuesta');
    expect(result1?.id).toBe(result2?.id);
  });

  it('should handle partial matches', () => {
    const result = findMatchingFAQ('precio actual');
    expect(result).toBeDefined();
    expect(result?.id).toBe('price');
  });

  it('should have all FAQs with required fields', () => {
    for (const faq of faqDatabase) {
      expect(faq.id).toBeDefined();
      expect(faq.keywords).toBeDefined();
      expect(Array.isArray(faq.keywords)).toBe(true);
      expect(faq.question).toBeDefined();
      expect(faq.answer).toBeDefined();
      expect(faq.keywords.length).toBeGreaterThan(0);
    }
  });
});
