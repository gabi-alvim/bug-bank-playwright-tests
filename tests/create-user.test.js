const { test, expect } = require('@playwright/test');

const { faker } = require('@faker-js/faker')


test.describe.parallel('Create user', () => {

  test.beforeEach(async ({ page }) => {
    
    await page.goto('/');
    await page.locator('button', {hasText: 'Registrar'}).click();

  })

  test('validate mandatory fields', async ({ page }) => {

  await page.locator('button', {hasText: 'Cadastrar'}).click();

  const locator = page.locator('[class="input__warging"]', {hasText: 'É campo obrigatório'})

  await expect (locator).toHaveCount(3);

  })

  test('registration without filling the name', async ({ page }) => {
  
      const password = faker.internet.password(6)
      const email = faker.internet.email()

    await page.type('.card__register >> [placeholder="Informe seu e-mail"]', email)
    await page.type('.card__register >> [placeholder="Informe sua senha"]', password)
    await page.type('.card__register >> [placeholder="Informe a confirmação da senha"]', password)

    await page.click('#toggleAddBalance')
    await page.locator('button', {hasText: 'Cadastrar'}).click();

      const locator = page.locator('#modalText')

    await expect(locator).toHaveText('Nome não pode ser vazio.')

  })
  test('created successfully', async ({ page }) => {
  
      const password = faker.internet.password(6)
      const email = faker.internet.email()
      const name = faker.internet.userName(email)

    
    await page.type('.card__register >> [placeholder="Informe seu e-mail"]', email)
    await page.type('.card__register >> [placeholder="Informe seu Nome"]', name)
    await page.type('.card__register >> [placeholder="Informe sua senha"]', password)
    await page.type('.card__register >> [placeholder="Informe a confirmação da senha"]', password)

    await page.click('#toggleAddBalance')
    await page.locator('button', {hasText: 'Cadastrar'}).click();

      const locator = page.locator('#modalText')

    await expect(locator).toContainText('foi criada com sucesso')

  })
})
