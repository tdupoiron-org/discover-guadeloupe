import { test, expect } from '@playwright/test'

test.describe('Site Discovery - Read', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays the app title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Discover Guadeloupe' })).toBeVisible()
  })

  test('shows all sites in grid view by default', async ({ page }) => {
    const siteCards = page.locator('.grid > *')
    await expect(siteCards).toHaveCount(12)
  })

  test('displays site metadata on each card', async ({ page }) => {
    // Check the first site card has key metadata
    const firstCard = page.locator('.grid > *').first()
    await expect(firstCard).toBeVisible()
    // Duration text should be visible
    await expect(firstCard.getByText(/hours/i)).toBeVisible()
  })

  test('shows the All Sites filter button with correct count', async ({ page }) => {
    await expect(page.getByRole('button', { name: /All Sites \(12\)/i })).toBeVisible()
  })

  test('shows the To Visit filter button with correct count', async ({ page }) => {
    await expect(page.getByRole('button', { name: /To Visit \(12\)/i })).toBeVisible()
  })

  test('shows the Visited filter button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Visited \(0\)/i })).toBeVisible()
  })

  test('shows grid and map view toggle buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Grid/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Map/i })).toBeVisible()
  })
})

test.describe('Visit Tracking - Create', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('marks a site as visited when checkbox is clicked', async ({ page }) => {
    const firstCard = page.locator('.grid > *').first()
    const visitButton = firstCard.getByRole('button', { name: /Mark as visited/i })
    await visitButton.click()

    const checkbox = firstCard.getByRole('checkbox')
    await expect(checkbox).toBeChecked()
  })

  test('shows progress bar after marking first site as visited', async ({ page }) => {
    // Progress bar should not be visible initially
    await expect(page.getByText('Your Progress')).not.toBeVisible()

    const firstCard = page.locator('.grid > *').first()
    await firstCard.getByRole('button', { name: /Mark as visited/i }).click()

    await expect(page.getByText('Your Progress')).toBeVisible()
  })

  test('updates visited count after marking site as visited', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Visited \(0\)/i })).toBeVisible()

    const firstCard = page.locator('.grid > *').first()
    await firstCard.getByRole('button', { name: /Mark as visited/i }).click()

    await expect(page.getByRole('button', { name: /Visited \(1\)/i })).toBeVisible()
  })

  test('updates To Visit count after marking a site as visited', async ({ page }) => {
    await expect(page.getByRole('button', { name: /To Visit \(12\)/i })).toBeVisible()

    const firstCard = page.locator('.grid > *').first()
    await firstCard.getByRole('button', { name: /Mark as visited/i }).click()

    await expect(page.getByRole('button', { name: /To Visit \(11\)/i })).toBeVisible()
  })

  test('shows visited overlay on marked site card', async ({ page }) => {
    const firstCard = page.locator('.grid > *').first()
    await firstCard.getByRole('button', { name: /Mark as visited/i }).click()

    // The visited card should have reduced opacity
    await expect(firstCard).toHaveClass(/opacity-60/)
  })
})

test.describe('Visit Tracking - Read with Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Mark first two sites as visited
    const cards = page.locator('.grid > *')
    await cards.nth(0).getByRole('button', { name: /Mark as visited/i }).click()
    await cards.nth(1).getByRole('button', { name: /Mark as visited/i }).click()
  })

  test('filters to show only visited sites', async ({ page }) => {
    await page.getByRole('button', { name: /Visited \(2\)/i }).click()

    const siteCards = page.locator('.grid > *')
    await expect(siteCards).toHaveCount(2)
  })

  test('filters to show only unvisited sites', async ({ page }) => {
    await page.getByRole('button', { name: /To Visit \(10\)/i }).click()

    const siteCards = page.locator('.grid > *')
    await expect(siteCards).toHaveCount(10)
  })

  test('shows all sites when All Sites filter is active', async ({ page }) => {
    // First switch to visited filter
    await page.getByRole('button', { name: /Visited \(2\)/i }).click()
    await expect(page.locator('.grid > *')).toHaveCount(2)

    // Then switch back to all
    await page.getByRole('button', { name: /All Sites \(12\)/i }).click()
    await expect(page.locator('.grid > *')).toHaveCount(12)
  })

  test('shows correct unvisited count in filtered view', async ({ page }) => {
    await page.getByRole('button', { name: /To Visit \(10\)/i }).click()
    await expect(page.locator('.grid > *')).toHaveCount(10)
  })
})

test.describe('Visit Tracking - Delete (Unmark)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Mark first site as visited
    const firstCard = page.locator('.grid > *').first()
    await firstCard.getByRole('button', { name: /Mark as visited/i }).click()
  })

  test('unmarks a visited site when checkbox is clicked again', async ({ page }) => {
    const firstCard = page.locator('.grid > *').first()
    const visitButton = firstCard.getByRole('button', { name: /Mark as not visited/i })
    await visitButton.click()

    const checkbox = firstCard.getByRole('checkbox')
    await expect(checkbox).not.toBeChecked()
  })

  test('decrements visited count after unmarking a site', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Visited \(1\)/i })).toBeVisible()

    const firstCard = page.locator('.grid > *').first()
    await firstCard.getByRole('button', { name: /Mark as not visited/i }).click()

    await expect(page.getByRole('button', { name: /Visited \(0\)/i })).toBeVisible()
  })

  test('hides progress bar when all sites are unmarked', async ({ page }) => {
    await expect(page.getByText('Your Progress')).toBeVisible()

    const firstCard = page.locator('.grid > *').first()
    await firstCard.getByRole('button', { name: /Mark as not visited/i }).click()

    await expect(page.getByText('Your Progress')).not.toBeVisible()
  })

  test('increments To Visit count after unmarking a site', async ({ page }) => {
    await expect(page.getByRole('button', { name: /To Visit \(11\)/i })).toBeVisible()

    const firstCard = page.locator('.grid > *').first()
    await firstCard.getByRole('button', { name: /Mark as not visited/i }).click()

    await expect(page.getByRole('button', { name: /To Visit \(12\)/i })).toBeVisible()
  })
})

test.describe('Map View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('switches to map view when Map button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /Map/i }).click()

    // The map container should be visible
    await expect(page.locator('.leaflet-container')).toBeVisible()
  })

  test('switches back to grid view when Grid button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /Map/i }).click()
    await page.getByRole('button', { name: /Grid/i }).click()

    // Grid should be visible again
    const siteCards = page.locator('.grid > *')
    await expect(siteCards).toHaveCount(12)
  })
})

test.describe('Empty States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows empty state message when visited filter is active with no visits', async ({ page }) => {
    await page.getByRole('button', { name: /Visited \(0\)/i }).click()

    await expect(page.getByText(/Start exploring Guadeloupe/i)).toBeVisible()
  })
})
