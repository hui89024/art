import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../../../src/views/HomeView.vue'

vi.mock('../../../src/components/Carousel.vue', () => ({
  default: { template: '<section data-testid="new-hero">hero</section>' }
}))

describe('Home redesign structure', () => {
  it('keeps hero and key navigation entry points', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.find('[data-testid="new-hero"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('核心作品')
    expect(wrapper.text()).toContain('核心作品')
    expect(wrapper.findComponent({ name: 'SectionHero' }).exists()).toBe(true)
  })
})
