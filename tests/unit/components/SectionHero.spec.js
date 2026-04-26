import { describe, it, expect } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import SectionHero from '../../../src/components/SectionHero.vue'

describe('SectionHero', () => {
  it('renders kicker/title/subtitle/description and default slot', async () => {
    const app = createSSRApp({
      render: () =>
        h(
          SectionHero,
          {
            kicker: '非遗传承',
            title: '剪艺数字平台',
            subtitle: '传统工艺与现代交互',
            description: '通过数字化展示剪纸文化与创新表达'
          },
          {
            default: () => h('button', { class: 'hero-action' }, '立即了解')
          }
        )
    })

    const html = await renderToString(app)

    expect(html).toContain('非遗传承')
    expect(html).toContain('剪艺数字平台')
    expect(html).toContain('传统工艺与现代交互')
    expect(html).toContain('通过数字化展示剪纸文化与创新表达')
    expect(html).toContain('hero-action')
  })
})
