const { test, expect } = require('@playwright/test', 'expect-playwright');

test('basic test', async ({ page }) => {
  await page.goto('https://alura-fotos.herokuapp.com/#/home');
  await page.click('[href="#/home/signup"]');
  await page.type('[formcontrolname="email"]', 'Gabi@qa.com.br');
  await page.type('[formcontrolname="fullName"]', 'Gabriella')
  await page.type('[formcontrolname="userName"]', 'Gabiii')
  await page.type('[formcontrolname="password"]', '7895');
 

  


  
});
