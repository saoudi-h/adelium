import { expect, test } from '@playwright/test'

// url
const homePage = 'http://localhost:4200'
test('has title', async ({ page }) => {
    await page.goto(homePage)

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Adelium/)
})

test('navigate to login page', async ({ page }) => {
    await page.goto(homePage)

    // await page.click('text=Se connecter')
    await page
        .locator(
            'body > app-root > app-default-layout > div.drawer.min-h-screen.bg-base-300 > div.drawer-content.flex.flex-col > div.sticky.top-0.z-30 > header > div > div.navbar-end > div:nth-child(4) > a'
        )
        .click()

    // Expects page to have a heading with the name of Installation.
    await expect(page.locator('text= Connection en un Clin')).toBeVisible()
})
