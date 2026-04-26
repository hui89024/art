import { describe, it, expect, vi } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
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

  it('applies layout classes so buttons do not collapse into plain text', async () => {
    const app = createSSRApp({
      render: () => h(CTACluster, {
        primaryText: '主要操作',
        secondaryText: '次要操作'
      })
    })

    const html = await renderToString(app)

    expect(html).toContain('flex')
    expect(html).toContain('gap-')
    expect(html).toContain('cta-cluster__primary')
    expect(html).toContain('cta-cluster__secondary')
  })
})
