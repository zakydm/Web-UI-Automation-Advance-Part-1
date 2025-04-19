const { Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');

describe('Google Search Test', function () {
    let driver;

    beforeEach(async function () {
         driver = await new Builder().forBrowser('chrome').build();
    });

    it('Visit Saucedemo and sort test with Chrome', async function () {
        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();
        console.log("ini test case 1")
        
        assert.strictEqual(title, 'Swag Labs');

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLoggin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLoggin.click()

        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')),
            3000
        );

        let buttonSort = await driver.wait(
        until.elementLocated(By.css('[data-test="product-sort-container"]')),
        3000
        );

        // 3. Klik dropdown sort
        await buttonSort.click();

        // 4. Pilih opsi Z to A (misal option-nya ada value "za")
        let optionZA = await driver.wait(
        until.elementLocated(By.css('option[value="za"]')),
        2000
        );
        await optionZA.click();

        // Ambil semua elemen nama produk
        let productNames = await driver.findElements(By.css('.inventory_item_name'));

        // Ambil teks dari tiap elemen
        let names = [];
        for (let al of productNames) {
        names.push(await al.getText());
        }

        // Bandingkan dengan versi terurut Z ke A
        let expected = [...names].sort().reverse();

        console.log(
        JSON.stringify(names) === JSON.stringify(expected)
            ? "✅ Produk sudah terurut dari Z ke A. "
            : "❌ Urutan produk belum sesuai Z ke A."
        );

            await buttonCart.isDisplayed()
            await driver.sleep(3000);
        });


    it('Visit Saucedemo and add to cart', async function () {
        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();
        console.log("ini test case 2")

        assert.strictEqual(title, 'Swag Labs');

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLoggin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLoggin.click()
    
        // Add to cart button
        let buttonAddToCart = await driver.wait(
        until.elementLocated(By.css('[data-test^="add-to-cart"]')),
        5000
        );
        await buttonAddToCart.click();

        // Verifikasi tombol berubah jadi "Remove"
        let buttonRemove = await driver.findElement(By.css('[data-test^="remove"]'));
        assert.ok(await buttonRemove.isDisplayed(), "Produk berhasil ditambahkan ke cart");

        // Klik ikon keranjang
        let buttonCart = await driver.findElement(By.css('.shopping_cart_link'));
        await buttonCart.click();

            await buttonCart.isDisplayed()
            await driver.sleep(3000);
    });
    
    afterEach(async function () {
        await driver.quit();
    });
})