import { describe, it, expect } from 'vitest'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '../../../tailwind.config.js'

const resolvedConfig = resolveConfig(tailwindConfig)

describe('theme tokens', () => {
  it('defines required color tokens', () => {
    const expectedColors = {
      'brand-red': '#B4232A',
      'ink-black': '#111214',
      'porcelain-white': '#F7F5F2',
      'jade-gray': '#A3A8AC',
      'gold-accent': '#C8A86B'
    }

    for (const [tokenName, tokenValue] of Object.entries(expectedColors)) {
      expect(resolvedConfig.theme.colors[tokenName]).toBe(tokenValue)
    }
  })

  it("defines spacing token 18 as 4.5rem", () => {
    expect(resolvedConfig.theme.spacing['18']).toBe('4.5rem')
  })

  it("keeps border radius token '2xl'", () => {
    expect(resolvedConfig.theme.borderRadius['2xl']).toBeDefined()
  })

  it("defines glass box shadow token with rgba", () => {
    expect(resolvedConfig.theme.boxShadow.glass).toContain('rgba')
  })
})
