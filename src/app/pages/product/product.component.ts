import { Product } from './../../models/product/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product = new Product();


  constructor(private productService: ProductService) { }

  ngOnInit() {
    console.log(this.productService.get());
  }

}
