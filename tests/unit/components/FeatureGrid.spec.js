import { describe, it, expect } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import FeatureGrid from '../../../src/components/FeatureGrid.vue'

describe('FeatureGrid', () => {
  it('renders feature items with title and description', async () => {
    const items = [
      { id: 1, title: 'AR 预览', description: '增强现实预览功能' },
      { id: 2, title: '智能临摹', description: '智能辅助临摹' }
    ]

    const app = createSSRApp({
      render: () => h(FeatureGrid, { items })
    })

    const html = await renderToString(app)

    expect(html).toContain('AR 预览')
    expect(html).toContain('增强现实预览功能')
    expect(html).toContain('智能临摹')
    expect(html).toContain('智能辅助临摹')
  })

  it('applies grid layout classes so cards do not stack as plain text', async () => {
    const items = [
      { id: 1, title: '功能1', description: '描述1' }
    ]

    const app = createSSRApp({
      render: () => h(FeatureGrid, { items })
    })

    const html = await renderToString(app)

    expect(html).toContain('grid')
    expect(html).toContain('gap-')
    expect(html).toContain('feature-grid__card')
    expect(html).toContain('feature-grid__title')
  })
})
