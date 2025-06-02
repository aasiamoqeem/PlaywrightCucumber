import { Page,Locator, expect} from '@playwright/test';


export class Products {
    page: Page;
    productLink: Locator;
    searchBox: Locator;
    searchButton: Locator;
    searchHeading: Locator;
    totalProducts: Locator;
    product1: Locator;
    product2: Locator;
    addtoCart1: Locator;
    addtoCart2: Locator;
    continueShoppingButton: Locator;

     constructor(page: Page){
        this.page = page;
        this.productLink = page.locator('a', { hasText: 'Products' });
        this.searchBox = page.locator('input[name="search"]');
        this.searchButton = page.locator('#submit_search');
        this.searchHeading = page.getByRole('heading', { name: 'Searched Products' });
        this.totalProducts = page.locator('.single-products');
        this.product1= page.locator('.single-products').first();
        this.product2 = page.locator('.single-products').nth(1);
        this.addtoCart1 = this.product1.locator('.product-overlay a.add-to-cart');
        this.addtoCart2 = this.product2.locator('.product-overlay a.add-to-cart');
        this.continueShoppingButton = page.locator('button.btn.btn-success.close-modal.btn-block', { hasText: 'Continue Shopping' });

     }

     async clickProductLink(){        
        await this.productLink.click();
    }
    
    async searchProduct(product: string){
        await this.searchBox.click();
        await this.searchBox.fill(product);
        await this.searchButton.click();
    }

}