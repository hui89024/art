import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PatternLibraryView from '@/views/PatternLibraryView.vue'

vi.mock('@/api/patterns.js', () => ({
  searchOpenPatterns: vi.fn().mockResolvedValue({ content: [], totalPages: 0, totalElements: 0, number: 0, size: 12 }),
  getOpenPatternDetailByCode: vi.fn(),
  getOpenPatternTableUrl: vi.fn().mockReturnValue('')
}))

describe('Pattern library redesign', () => {
  it('keeps search controls and result container', async () => {
    const wrapper = mount(PatternLibraryView)
    await Promise.resolve()
    expect(wrapper.text()).toContain('在线纹样库')
    expect(wrapper.find('input[placeholder="关键词 / 编码"]').exists()).toBe(true)
  })
})
