import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup/vitest.setup.js'],
    include: ['tests/unit/**/*.spec.{js,ts}'],
    clearMocks: true,
    restoreMocks: true,
    passWithNoTests: true
  }
})
