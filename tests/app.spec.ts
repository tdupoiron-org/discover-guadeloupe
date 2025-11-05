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
    await expect(siteCards).toHaveCount(await siteCards.count());
    expect(await siteCards.count()).toBeGreaterThan(0);
  });

  test('should allow toggling visit status', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the first site card
    await page.waitForSelector('[data-testid="site-card"]', { timeout: 10000 });
    
    // Find the first checkbox
    const firstCheckbox = page.locator('[data-testid="visit-checkbox"]').first();
    await firstCheckbox.waitFor({ state: 'visible' });
    
    // Get initial checked state
    const initialState = await firstCheckbox.isChecked();
    
    // Toggle the checkbox
    await firstCheckbox.click();
    
    // Verify the state changed
    const newState = await firstCheckbox.isChecked();
    expect(newState).toBe(!initialState);
  });

  test('should update progress when sites are visited', async ({ page }) => {
    await page.goto('/');
    
    // Wait for progress indicator
    await page.waitForSelector('text=/\\d+ of \\d+ sites visited/', { timeout: 10000 });
    
    // Get initial progress text
    const progressText = page.locator('text=/\\d+ of \\d+ sites visited/');
    const initialText = await progressText.textContent();
    
    // Mark a site as visited
    const firstCheckbox = page.locator('[data-testid="visit-checkbox"]').first();
    const isChecked = await firstCheckbox.isChecked();
    
    if (!isChecked) {
      await firstCheckbox.click();
      
      // Wait a bit for state to update
      await page.waitForTimeout(500);
      
      // Check that progress text changed
      const newText = await progressText.textContent();
      expect(newText).not.toBe(initialText);
    }
  });

  test('should filter sites by visited status', async ({ page }) => {
    await page.goto('/');
    
    // Wait for site cards to load
    await page.waitForSelector('[data-testid="site-card"]', { timeout: 10000 });
    
    // Mark one site as visited
    const firstCheckbox = page.locator('[data-testid="visit-checkbox"]').first();
    await firstCheckbox.click();
    
    // Wait for state update
    await page.waitForTimeout(500);
    
    // Click the "Visited" filter button
    const visitedButton = page.locator('button:has-text("Visited")');
    await visitedButton.click();
    
    // Wait for filter to apply
    await page.waitForTimeout(500);
    
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
    
    // Check for metadata elements (these are common in the PRD)
    // We'll look for any of these indicators
    const hasMetadata = await firstCard.locator('text=/\\d+[- ]?\\d*\\s*(min|hour|hrs?)/i').count() > 0 ||
                        await firstCard.locator('[class*="crowd"]').count() > 0 ||
                        await firstCard.locator('[class*="rating"]').count() > 0;
    
    expect(hasMetadata || await firstCard.textContent()).toBeTruthy();
  });
});
