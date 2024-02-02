import test, { expect } from '@playwright/test'

const loginPage = 'http://localhost:4200/auth/login'
test('should display google button', async ({ page }) => {
    await page.goto(loginPage)
    await expect(page.locator('text=Se connecter avec Google')).toBeVisible()
})

test('should display github button', async ({ page }) => {
    await page.goto(loginPage)
    await expect(page.locator('text=Se connecter avec Github')).toBeVisible()
})

test('should display a desabled login button', async ({ page }) => {
    await page.goto(loginPage)

    await expect(
        page
            .getByRole('main')
            .locator('form div')
            .filter({ hasText: 'Se connecter' })
    ).toBeVisible()
})

test('should display a enabled login button', async ({ page }) => {
    await page.goto(loginPage)
    await page.getByLabel('Adresse Email').fill('moha@lasqual.com')
    await page.getByLabel('Mot de passe').fill('kOmpLikaYTidPass1234?')
    await expect(
        page
            .getByRole('main')
            .locator('form div')
            .filter({ hasText: 'Se connecter' })
    ).toBeEnabled()
})
