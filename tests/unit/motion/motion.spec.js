import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { DURATION } from '../../../src/composables/anime.config.js'
import { prefersReducedMotion, resolveDuration } from '../../../src/composables/motion.js'

describe('motion system', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('ensures fast duration is at least 120ms', () => {
    expect(DURATION.fast).toBeGreaterThanOrEqual(120)
  })

  it('ensures pageEnter duration is no more than 1100ms', () => {
    expect(DURATION.pageEnter).toBeLessThanOrEqual(1100)
  })

  it('returns true when prefers-reduced-motion is enabled', () => {
    vi.stubGlobal('window', {
      matchMedia: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    })

    expect(prefersReducedMotion()).toBe(true)
  })

  it('resolves duration to 0 when reduced-motion is enabled', () => {
    vi.stubGlobal('window', {
      matchMedia: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    })

    expect(resolveDuration(320)).toBe(0)
  })
})
