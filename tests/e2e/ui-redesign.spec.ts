import { test, expect } from '@playwright/test'

const routes = [
  '/',
  '/collectibles',
  '/events',
  '/app',
  '/contact',
  '/pattern-library'
]

test.describe('ui redesign smoke', () => {
  for (const route of routes) {
    test(`page ${route} renders hero without crash`, async ({ page }) => {
      await page.goto(route)
      await expect(page.locator('main')).toBeVisible()
      // await expect(page).toHaveScreenshot(`redesign-${route === '/' ? 'home' : route.slice(1)}.png`, {
      //   fullPage: false,
      //   maxDiffPixelRatio: 0.02
      // })
    })
  }
})
