import { Page,Locator, expect} from '@playwright/test';


export class login {
    page: Page;
    loginLink: Locator;
    email: Locator;
    password: Locator;
    loginButton: Locator;
    loggedInText: Locator;
    

    constructor(page: Page){
        this.page = page;
        this.loginLink = page.locator('a', { hasText: 'Signup / Login' });
        this.email = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loggedInText = page.getByText('Logged in as', { exact: false });
    }

    async clickLoginLink(){
        await this.page.goto(process.env.BASE_URL as string)
        await this.loginLink.click();
    }

    async clickLoginButton(email: string, password: string){
        await this.email.click();
        await this.email.fill(email);
        await this.password.click();
        await this.password.fill(password);
        await this.loginButton.click();
    }


}