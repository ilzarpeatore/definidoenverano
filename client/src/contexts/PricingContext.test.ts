import { describe, it, expect, beforeEach } from 'vitest';
import { getCurrentPhaseInfo } from '@/lib/pricingPhases';

describe('PricingContext - Price Calculation', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should calculate Phase 1 price correctly (€197)', () => {
    // Phase 1: Days 0-30 (March 1 - March 31, 2026)
    const launchDate = new Date('2026-03-01');
    const phase1Date = new Date('2026-03-15'); // Day 15
    
    const daysElapsed = Math.floor((phase1Date.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    expect(daysElapsed).toBe(14); // 0-indexed
    
    // Phase 1 should be €197
    const phase = getCurrentPhaseInfo(daysElapsed);
    expect(phase.currentPrice).toBe(197);
    expect(phase.phase).toBe(1);
  });

  it('should calculate Phase 2 price correctly (€247)', () => {
    // Phase 2: Days 31-60 (April 1 - April 30, 2026)
    const launchDate = new Date('2026-03-01');
    const phase2Date = new Date('2026-04-15'); // Day 46
    
    const daysElapsed = Math.floor((phase2Date.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    expect(daysElapsed).toBe(45); // 0-indexed
    
    // Phase 2 should be €247
    const phase = getCurrentPhaseInfo(daysElapsed);
    expect(phase.currentPrice).toBe(247);
    expect(phase.phase).toBe(2);
  });

  it('should calculate Phase 3 price correctly (€297)', () => {
    // Phase 3: Days 61+ (May 1, 2026 onwards)
    const launchDate = new Date('2026-03-01');
    const phase3Date = new Date('2026-05-15'); // Day 76
    
    const daysElapsed = Math.floor((phase3Date.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    expect(daysElapsed).toBe(75); // 0-indexed
    
    // Phase 3 should be €297
    const phase = getCurrentPhaseInfo(daysElapsed);
    expect(phase.currentPrice).toBe(297);
    expect(phase.phase).toBe(3);
  });

  it('should calculate current date correctly (April 7, 2026 = Phase 3)', () => {
    // Today is April 7, 2026 (38 days since March 1)
    const launchDate = new Date('2026-03-01');
    const today = new Date('2026-04-07');
    
    const daysElapsed = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    expect(daysElapsed).toBe(37); // 0-indexed (38 days = 37 elapsed)
    
    // Should be Phase 3 (€297)
    const phase = getCurrentPhaseInfo(daysElapsed);
    expect(phase.currentPrice).toBe(297);
    expect(phase.phase).toBe(3);
  });

  it('should calculate days until next phase correctly', () => {
    // Today is April 7, 2026 (Phase 3 started on May 1)
    const launchDate = new Date('2026-03-01');
    const today = new Date('2026-04-07');
    
    const daysElapsed = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    const phase = getCurrentPhaseInfo(daysElapsed);
    
    // Phase 3 has no next phase (daysUntilNextPhase should be null or 0)
    expect(phase.daysUntilNextPhase).toBe(0);
  });

  it('should calculate discounted price correctly', () => {
    // Phase 3: €297 - €50 discount = €247
    const launchDate = new Date('2026-03-01');
    const today = new Date('2026-04-07');
    
    const daysElapsed = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    const phase = getCurrentPhaseInfo(daysElapsed);
    
    const discountedPrice = Math.max(0, phase.currentPrice - 50);
    expect(discountedPrice).toBe(247);
  });

  it('should handle boundary between Phase 1 and Phase 2', () => {
    const launchDate = new Date('2026-03-01');
    
    // Last day of Phase 1 (March 31, 2026)
    const lastPhase1 = new Date('2026-03-31');
    const daysPhase1 = Math.floor((lastPhase1.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    const phasePhase1 = getCurrentPhaseInfo(daysPhase1);
    expect(phasePhase1.currentPrice).toBe(197);
    
    // First day of Phase 2 (April 1, 2026)
    const firstPhase2 = new Date('2026-04-01');
    const daysPhase2 = Math.floor((firstPhase2.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    const phasePhase2 = getCurrentPhaseInfo(daysPhase2);
    expect(phasePhase2.currentPrice).toBe(247);
  });

  it('should handle boundary between Phase 2 and Phase 3', () => {
    const launchDate = new Date('2026-03-01');
    
    // Last day of Phase 2 (April 30, 2026)
    const lastPhase2 = new Date('2026-04-30');
    const daysPhase2 = Math.floor((lastPhase2.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    const phasePhase2 = getCurrentPhaseInfo(daysPhase2);
    expect(phasePhase2.currentPrice).toBe(247);
    
    // First day of Phase 3 (May 1, 2026)
    const firstPhase3 = new Date('2026-05-01');
    const daysPhase3 = Math.floor((firstPhase3.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    const phasePhase3 = getCurrentPhaseInfo(daysPhase3);
    expect(phasePhase3.currentPrice).toBe(297);
  });
});
