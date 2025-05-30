import { Page,Locator, expect} from '@playwright/test';


export class searchProduct {
    page: Page;
    productLink: Locator;
    searchBox: Locator;
    searchButton: Locator;
    searchHeading: Locator;
    tshirtItems: Locator;
    

    constructor(page: Page){
        this.page = page;
        this.productLink = page.locator('a', { hasText: 'Products' });
        this.searchBox= page.getByRole('textbox', { name: 'Search Product' });
        this.searchButton = page.getByRole('heading', { name: 'Searched Products' });
        this.searchHeading = page.getByRole('heading', { name: 'Searched Products' });
        this.tshirtItems = page.locator('span.google-anno-t', { hasText: 'T-Shirt' });
    }
    
    async searchProduct(product: string){
        await this.searchBox.click();
        await this.searchBox.fill(product);
        await this.searchButton.click();
    }
}