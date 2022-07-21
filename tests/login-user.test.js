const { test, expect } = require('@playwright/test');

const { createUser , email , password } = require('../lib/helpers');


test.describe.parallel('Realizar Login', () => {

  test.beforeEach(async ({ page }) => {
    
    await page.goto('/')

  })

  test('validar campos obrigatórios', async ({ page }) => {

  await page.locator('button', {hasText: 'Acessar'}).click();

    const locator = page.locator('[class="input__warging"]', {hasText: 'É campo obrigatório'})
  
  await expect (locator).toHaveCount(2);

  })

  test('login com usuário inválido', async ({ page }) => {
  
    await page.type('.card__login >> [placeholder="Informe seu e-mail"]', "invalid@gmail.com.br")
    await page.type('.card__login >> [placeholder="Informe sua senha"]', "123", { log:false })
    await page.click('text=Acessar', {force:true})

      const locator = page.locator('#modalText')

    await expect(locator).toContainText('Usuário ou senha inválido.')

  })

  test('usuário logado realizado com sucesso', async ({ page }) => {

    await createUser( page )

    await page.type('.card__login >> [placeholder="Informe seu e-mail"]', email )
    await page.type('.card__login >> [placeholder="Informe sua senha"]', password)
    await page.click('text=Acessar')

    await page.waitForNavigation()
    await expect(page).toHaveURL('/home')

    await expect(page.locator("text=R$ 1.000,00")).toBeVisible()

  })
})
