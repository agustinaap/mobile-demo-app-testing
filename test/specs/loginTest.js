describe('Mobile testing - LOGIN', async () => {
    before( async () => {
        //cek elemen homescreen muncul dengan menggunakan xpath
        const homescreen = await $('//android.widget.ScrollView[@content-desc="Home-screen"]');
        await expect(homescreen).toBeDisplayed();

        //klik menu login menggunakan accessibility id
        await $('~Login').click();

        //cek elemen untuk memastikan berada di halaman login
        const loginPage = await $('//android.view.ViewGroup[@content-desc="button-login-container"]').getText();
        await expect(loginPage == "LOGIN");

        await driver.pause(2000);
      });

    it('Login with valid data - POSITIVE', async () => {
        //mengakses field email dan memasukkan value ke dalamnya
        emailField = await $('~input-email');
        await emailField.setValue("lala@mail.co");

        //mengakses field password dan memasukkan value ke dalamnya
        passwordField = await $('~input-password');
        await passwordField.setValue("Lala.1234");

        //klik tombol login
        buttonLogin = await $('~button-LOGIN');
        await buttonLogin.click();

        //cek muncul popup berhasil login
        const successTitle = await $('//android.widget.TextView[@resource-id="android:id/alertTitle"]')
        const successMessage = await $('//android.widget.TextView[@resource-id="android:id/message"]')
        await expect(successTitle).toHaveText("Success");
        await expect(successMessage).toBeDisplayed();
        await expect(successMessage).toHaveText("You are logged in!");

        //klik "Ok" untuk menutup popup
        await $('//android.widget.Button[@resource-id="android:id/button1"]').click();
    })

    it('Fail to login with invalid email format - NEGATIVE', async () => {
        //mengakses field email dan memasukkan value ke dalamnya
        await emailField.setValue("lala");

        //mengakses field password dan memasukkan value ke dalamnya
        await passwordField.setValue("Lala.1234");

        //klik tombol login
        await buttonLogin.click();

        //cek muncul alert email tidak valid
        const invalidEmail = await $('//android.widget.TextView[@text="Please enter a valid email address"]');
        await expect(invalidEmail).toBeExisting();
        await expect(invalidEmail).toHaveText("Please enter a valid email address");

        await driver.pause(2000);
    })

    it('Fail to login with less than 8 chars password - NEGATIVE', async () => {
        //mengakses field email dan memasukkan value ke dalamnya
        await emailField.setValue("lala@mail.co");

        //mengakses field password dan memasukkan value ke dalamnya
        await passwordField.setValue("Lala");

        //klik tombol login
        await buttonLogin.click();

        //cek muncul alert password minimal 8 karakter
        const invalidPassword = await $('//android.widget.TextView[@text="Please enter at least 8 characters"]');
        await expect(invalidPassword).toBeExisting();
        await expect(invalidPassword).toHaveText("Please enter at least 8 characters");

        await driver.pause(2000);
    })
})