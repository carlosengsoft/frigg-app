import { FinalPrice } from './../final-price/final-price.model';
import { Stock } from './../stock/stock.model';
import { Product } from './product.model';

export class ProductSteps {

    product: Product;
    stock: Stock;
    finalPrice: FinalPrice;

    constructor() {
        this.product = new Product();
        this.stock = new Stock();
        this.finalPrice = new FinalPrice();
    }
}