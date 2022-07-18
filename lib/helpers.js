const { faker } = require('@faker-js/faker');


const password = faker.internet.password(3)
const email = faker.internet.email()
const name = faker.internet.userName(6)


    const createUser = async page  => {

        await page.locator('button', {hasText: 'Registrar'}).click();

        
        
        await page.type('.card__register >> [placeholder="Informe seu e-mail"]', email)
        await page.type('.card__register >> [placeholder="Informe seu Nome"]', name)
        await page.type('.card__register >> [placeholder="Informe sua senha"]', password)
        await page.type('.card__register >> [placeholder="Informe a confirmação da senha"]', password)
        await page.click('#toggleAddBalance')
        await page.locator('button', {hasText: 'Cadastrar'}).click();
        await page.click('#btnCloseModal')
    }
   
   const loginUser = async page => {

    await createUser(page)

    await page.type('.card__login >> [placeholder="Informe seu e-mail"]', email)
    await page.type('.card__login >> [placeholder="Informe sua senha"]', password)
    await page.click('text=Acessar')

    //await page.waitForNavigation()

    //wait expect(page).toHaveURL('/home')
    }
   

 module.exports = {
    createUser,
    email,
    password,
    loginUser
    
    
 }
