import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../../../src/views/HomeView.vue'

vi.mock('../../../src/components/Carousel.vue', () => ({
  default: { template: '<section data-testid="new-hero">hero</section>' }
}))

vi.mock('../../../src/components/LaptopAnimation.vue', () => ({
  default: { template: '<div data-testid="laptop">laptop</div>' }
}))

vi.mock('../../../src/components/PhoneAnimation.vue', () => ({
  default: { template: '<div data-testid="phone">phone</div>' }
}))

describe('Home redesign structure', () => {
  it('keeps hero and key navigation entry points', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.find('[data-testid="new-hero"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('核心作品')
    expect(wrapper.findComponent({ name: 'SectionHero' }).exists()).toBe(true)
  })

  it('has product section with rice-paper background class', () => {
    const wrapper = mount(HomeView)
    const productSection = wrapper.find('.product-section')
    expect(productSection.exists()).toBe(true)
  })

  it('has manifesto section with paper-carving background class', () => {
    const wrapper = mount(HomeView)
    const manifestoSection = wrapper.find('.manifesto-section')
    expect(manifestoSection.exists()).toBe(true)
  })

  it('has ecosystem section with brocade background class', () => {
    const wrapper = mount(HomeView)
    const ecosystemSection = wrapper.find('.ecosystem-section')
    expect(ecosystemSection.exists()).toBe(true)
  })

  it('does not render ParallaxBackground component', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent({ name: 'ParallaxBackground' }).exists()).toBe(false)
  })

  it('has manifesto content with dark text for light background', () => {
    const wrapper = mount(HomeView)
    const manifestoHeading = wrapper.find('.manifesto-section h2')
    expect(manifestoHeading.classes()).toContain('text-ink-base')
  })

  it('has floating particles in ecosystem section', () => {
    const wrapper = mount(HomeView)
    const particles = wrapper.findAll('.ecosystem-particle')
    expect(particles.length).toBe(8)
  })
})
