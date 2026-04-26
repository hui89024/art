import { describe, it, expect, vi } from 'vitest'
import CTACluster from '../../../src/components/CTACluster.vue'

describe('CTACluster', () => {
  it('emits primary and secondary events via click handlers', () => {
    const emit = vi.fn()

    CTACluster.methods.handlePrimary.call({ $emit: emit })
    CTACluster.methods.handleSecondary.call({ $emit: emit })

    expect(emit).toHaveBeenNthCalledWith(1, 'primary')
    expect(emit).toHaveBeenNthCalledWith(2, 'secondary')
    expect(emit).toHaveBeenCalledTimes(2)
  })
})
