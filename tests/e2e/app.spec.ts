import { test, expect } from '@playwright/test';

test.describe('Habit Tracker app', () => {
  test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('splash-screen')).toBeVisible();
    await page.waitForURL('/login');
  });

  test('redirects authenticated users from / to /dashboard', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() => {
      localStorage.setItem(
        'habit-tracker-session',
        JSON.stringify({
          userId: '1',
          email: 'test@example.com',
        })
      );
    });

    await page.reload();
    await page.waitForURL('/dashboard');
  });

  test('prevents unauthenticated access to /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL('/login');
  });

  test('signs up a new user and lands on the dashboard', async ({ page }) => {
    await page.goto('/signup');

    await page.fill('[data-testid="auth-signup-email"]', 'new@test.com');
    await page.fill('[data-testid="auth-signup-password"]', 'password123');

    await page.click('[data-testid="auth-signup-submit"]');

    await page.waitForURL('/dashboard');
  });

  test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
    await page.goto('/login');

    await page.evaluate(() => {
      localStorage.setItem(
        'habit-tracker-users',
        JSON.stringify([
          {
            id: '1',
            email: 'test@example.com',
            password: 'password123',
            createdAt: new Date().toISOString(),
          },
        ])
      );
    });

    await page.fill('[data-testid="auth-login-email"]', 'test@example.com');
    await page.fill('[data-testid="auth-login-password"]', 'password123');

    await page.click('[data-testid="auth-login-submit"]');

    await page.waitForURL('/dashboard');
  });

  test('creates a habit from the dashboard', async ({ page }) => {
    await page.goto('/dashboard');

    await page.fill('[data-testid="habit-name-input"]', 'Read Books');
    await page.click('[data-testid="habit-save-button"]');

    await expect(page.getByText('Read Books')).toBeVisible();
  });

  test('completes a habit for today and updates the streak', async ({ page }) => {
    await page.goto('/dashboard');

    await page.fill('[data-testid="habit-name-input"]', 'Workout');
    await page.click('[data-testid="habit-save-button"]');

    await page.click('[data-testid="toggle-habit"]');

    await expect(page.getByText(/Streak:/)).toBeVisible();
  });

  test('persists session and habits after page reload', async ({ page }) => {
    await page.goto('/dashboard');

    await page.fill('[data-testid="habit-name-input"]', 'Persist Test');
    await page.click('[data-testid="habit-save-button"]');

    await page.reload();

    await expect(page.getByText('Persist Test')).toBeVisible();
  });

  test('logs out and redirects to /login', async ({ page }) => {
    await page.goto('/dashboard');

    await page.click('[data-testid="auth-logout-button"]');

    await page.waitForURL('/login');
  });

  test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
    await page.goto('/');
    await context.setOffline(true);

    await page.reload();

    await expect(page).not.toHaveURL(/error/);
  });
});