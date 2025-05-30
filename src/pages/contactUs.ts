import { Page,Locator, expect} from '@playwright/test';


export class contactUs {
    page: Page;
    contactUsLink: Locator;
    name: Locator;
    email: Locator;
    subject: Locator;
    message: Locator;
    chooseFile: Locator;
    submitButton: Locator;
    getInTouchHeader: Locator;
    successMessage: Locator;
    homeButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.contactUsLink = page.locator('a', { hasText: 'Contact us' });
        this.name = page.getByRole('textbox', { name: 'Name' });
        this.email = page.getByRole('textbox', { name: 'Email', exact: true });
        this.subject = page.getByRole('textbox', { name: 'Subject' });
        this.message = page.getByRole('textbox', { name: 'Your Message Here' });
        this.chooseFile = page.getByRole('button', { name: 'Choose File' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.getInTouchHeader = page.getByRole('heading', { name: 'Get In Touch' });
        this.successMessage = page.locator('div.status.alert.alert-success', { hasText: 'Success! Your details have been submitted successfully.' });
        this.homeButton = page.locator('a.btn.btn-success', { hasText: 'Home' });
    }

    async clickContactUsLink(){
        await this.contactUsLink.click();
    }

    async fillDetails(details: { name: string; email: string; subject: string; message: string }){
        await this.name.click();
        await this.name.fill(details.name);
        await this.email.click();
        await this.email.fill(details.email);
        await this.subject.click();
        await this.subject.fill(details.subject);
        await this.message.click();
        await this.message.fill(details.message);
    }

    async uploadFile(filepath: string) {
        const fileInput = this.page.locator('input[type="file"]');
        await fileInput.setInputFiles(filepath);
    }

    async clickSubmitButton(){
        await this.submitButton.click();
    }

}