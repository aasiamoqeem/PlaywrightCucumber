import { Page,Locator, expect} from '@playwright/test';


export class Cart {
    page: Page;
    viewCart: Locator;
    cartLink: Locator;
    cartRows: Locator;
    product1Row: Locator;
    product1Price: Locator;
    product1Quantity: Locator;
    product1Total: Locator;
    product1Delete : Locator;
    product2Row: Locator;
    product2Price: Locator;
    product2Quantity: Locator;
    product2Total: Locator;
    product2Delete: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.viewCart = page.locator('u', { hasText: 'View Cart' });
        this.cartLink = page.locator('a', { hasText: 'Cart' });
        this.cartRows = page.locator('tbody > tr'); 
        this.product1Row = page.locator('tr#product-1');
        this.product1Price = this.product1Row.locator('.cart_price');
        this.product1Quantity = this.product1Row.locator('.cart_quantity button');
        this.product1Total = this.product1Row.locator('.cart_total_price');
        this.product1Delete = this.product1Row.locator('a.cart_quantity_delete');
        this.product2Row = page.locator('tr#product-2');
        this.product2Price = this.product2Row.locator('.cart_price');
        this.product2Quantity = this.product2Row.locator('.cart_quantity button');
        this.product2Total = this.product2Row.locator('.cart_total_price');
        this.product2Delete = this.product2Row.locator('a.cart_quantity_delete');

                

    }

}