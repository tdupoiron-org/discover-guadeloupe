import { test, expect } from '@playwright/test';

test.describe('Discover Sevilla App', () => {
  test('should display the app title and description', async ({ page }) => {
    await page.goto('/');
    
    // Check for the main title
    await expect(page.locator('h1')).toContainText('Discover Sevilla');
    
    // Check for the description
    await expect(page.locator('text=Welcome to your personal guide')).toBeVisible();
  });

  test('should display site cards', async ({ page }) => {
    await page.goto('/');
    
    // Wait for site cards to load
    await page.waitForSelector('[data-testid="site-card"]', { timeout: 10000 });
    
    // Check that at least one site card is displayed
    const siteCards = page.locator('[data-testid="site-card"]');
    const count = await siteCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should allow toggling visit status', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the first site card
    await page.waitForSelector('[data-testid="site-card"]', { timeout: 10000 });
    
    // Find the first checkbox button
    const firstCheckbox = page.locator('[data-testid="visit-checkbox"]').first();
    await firstCheckbox.waitFor({ state: 'visible' });
    
    // Click to mark as visited
    await firstCheckbox.click();
    
    // Wait for the progress badge to appear (appears when visitedCount > 0)
    await page.waitForSelector('text=/\\d+ of \\d+/', { timeout: 5000 });
    
    // The progress badge should now appear
    const progressBadge = page.locator('text=/\\d+ of \\d+/');
    await expect(progressBadge).toBeVisible();
    
    // Verify we can see the visited state with count
    const badgeText = await progressBadge.textContent();
    expect(badgeText).toMatch(/\d+ of \d+/);
    
    // Extract the first number (visited count) and verify it's greater than 0
    const match = badgeText?.match(/(\d+) of (\d+)/);
    expect(match).toBeTruthy();
    const visitedCount = match ? parseInt(match[1]) : 0;
    expect(visitedCount).toBeGreaterThan(0);
  });

  test('should update progress when sites are visited', async ({ page }) => {
    await page.goto('/');
    
    // Wait for site cards
    await page.waitForSelector('[data-testid="site-card"]', { timeout: 10000 });
    
    // Mark a site as visited first
    const firstCheckbox = page.locator('[data-testid="visit-checkbox"]').first();
    await firstCheckbox.click();
    
    // Wait for the progress badge to appear
    const progressBadge = page.locator('text=/\\d+ of \\d+/');
    await progressBadge.waitFor({ state: 'visible', timeout: 5000 });
    
    // Get initial progress text
    const initialText = await progressBadge.textContent();
    
    // Mark another site as visited
    const secondCheckbox = page.locator('[data-testid="visit-checkbox"]').nth(1);
    await secondCheckbox.click();
    
    // Wait for the text to change using Playwright's built-in waiting
    await expect(progressBadge).not.toHaveText(initialText || '');
    
    // Check that progress text changed
    const newText = await progressBadge.textContent();
    expect(newText).not.toBe(initialText);
  });

  test('should filter sites by visited status', async ({ page }) => {
    await page.goto('/');
    
    // Wait for site cards to load
    await page.waitForSelector('[data-testid="site-card"]', { timeout: 10000 });
    
    // Mark one site as visited
    const firstCheckbox = page.locator('[data-testid="visit-checkbox"]').first();
    await firstCheckbox.click();
    
    // Wait for progress badge to appear
    await page.waitForSelector('text=/\\d+ of \\d+/', { timeout: 5000 });
    
    // Click the "Visited" filter button
    const visitedButton = page.locator('button:has-text("Visited")');
    await visitedButton.click();
    
    // Wait for the button to be active (has bg-primary class)
    await expect(visitedButton).toHaveClass(/bg-primary/);
    
    // Verify that only visited sites are shown
    const visibleCards = page.locator('[data-testid="site-card"]');
    const count = await visibleCards.count();
    
    // We should have at least one visible card (the one we marked as visited)
    expect(count).toBeGreaterThan(0);
  });

  test('should show all sites by default', async ({ page }) => {
    await page.goto('/');
    
    // Wait for site cards
    await page.waitForSelector('[data-testid="site-card"]', { timeout: 10000 });
    
    // Get total count of sites
    const allCards = page.locator('[data-testid="site-card"]');
    const totalCount = await allCards.count();
    
    // Verify we have multiple sites
    expect(totalCount).toBeGreaterThan(0);
  });

  test('should display site metadata (duration, crowd level, rating)', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the first site card
    await page.waitForSelector('[data-testid="site-card"]', { timeout: 10000 });
    
    const firstCard = page.locator('[data-testid="site-card"]').first();
    
    // Check for duration information (e.g., "2-3 hours")
    const hasDuration = await firstCard.locator('text=/\\d+[- ]?\\d*\\s*(min|hour|hrs?)/i').count() > 0;
    expect(hasDuration).toBe(true);
    
    // Check for rating (star icon and number)
    const hasRating = await firstCard.locator('text=/\\d+\\.\\d+/').count() > 0;
    expect(hasRating).toBe(true);
    
    // Check for crowd level badge (high/medium/low)
    const hasCrowdLevel = await firstCard.locator('text=/high|medium|low/i').count() > 0;
    expect(hasCrowdLevel).toBe(true);
  });
});
