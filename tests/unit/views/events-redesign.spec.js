import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import EventsView from '../../../src/views/EventsView.vue'

describe('Events redesign', () => {
  it('contains timeline narrative heading', () => {
    const wrapper = mount(EventsView)
    expect(wrapper.text()).toContain('特色活动')
  })
})
