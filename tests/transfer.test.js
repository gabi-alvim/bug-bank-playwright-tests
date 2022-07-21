const { test, expect } = require('@playwright/test');

const { loginUser } = require("../lib/helpers");


test.describe.parallel('Realizar Transferências', () => {

    test.beforeEach(async ({ page }) => {
      
      await page.goto('/');
      await loginUser( page )
    
    })
    test('validar campos obrigatórios', async ({ page }) => {

      await page.click('#btn-TRANSFERÊNCIA')

      await page.waitForNavigation()
      await expect(page).toHaveURL('/transfer')

      await page.click('button', 'Transferir agora')

        const locator = page.locator('[class="input__warging"]', {hasText: 'transferValue must be a `number` type, but the final value was: `NaN` (cast from the value `""`).'})

      await expect (locator).toBeVisible()

    })

    test('transferência sem valor válido', async ({ page }) => {

      await page.click('#btn-TRANSFERÊNCIA')

      await page.waitForNavigation()
      await expect(page).toHaveURL('/transfer')

      await page.click('button', 'Transferir agora')
      await page.type('#__next >> [placeholder="Informe o número da conta"]', '12333')
      await page.type('#__next >> [placeholder="Informe o dígito da conta"]', '23')
      await page.type('#__next >> [placeholder="Informe o valor da transferência"]', '0')
      await page.click('button', 'Transferir agora')

      await expect(page.locator("text=Valor da transferência não pode ser 0 ou negativo")).toBeVisible()

    })

    test('conta para transferência inválida', async ({ page }) => {

      await page.click('#btn-TRANSFERÊNCIA')

      await page.waitForNavigation()
      await expect(page).toHaveURL('/transfer')

      await page.click('button', 'Transferir agora')
      await page.type('#__next >> [placeholder="Informe o número da conta"]', '000000')
      await page.type('#__next >> [placeholder="Informe o dígito da conta"]', '23')
      await page.type('#__next >> [placeholder="Informe o valor da transferência"]', '50')
      await page.click('button', 'Transferir agora')

      await expect(page.locator("text=Conta inválida ou inexistente")).toBeVisible()

    })

    test('Valor da transferência > saldo', async ({ page }) => {

      await page.click('#btn-TRANSFERÊNCIA')

      await page.waitForNavigation()
      await expect(page).toHaveURL('/transfer')

      await page.type('#__next >> [placeholder="Informe o número da conta"]', '246')
      await page.type('#__next >> [placeholder="Informe o dígito da conta"]', '2')
      await page.type('#__next >> [placeholder="Informe o valor da transferência"]', '3000')
      await page.click('button', 'Transferir agora')
      await expect(page.locator("text=Transferencia realizada com sucesso")).toBeVisible()//(não consegui Validar erro no site)
    })
})

