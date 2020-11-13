import { FinalPriceService } from './../services/final-price-service/final-price.service';
import { ProductService } from './../product/service/product.service';
import { StockService } from './../services/stock-service/stock.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject,  } from '@angular/core';
import { ConfigSnackbar } from 'src/app/utils/config-snackbar.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductSteps } from 'src/app/models/product/product-steps.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})

export class ProductEditComponent implements OnInit {

  productStep: ProductSteps = new ProductSteps();

  form: FormGroup;

  totalPrice: number;
  productNameFormControl: any;
  productPriceFormControl: any;
  stockQuantityFormControl: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private configSnackbar: ConfigSnackbar,
  private stockService: StockService, private productService: ProductService,
   private finalPriceService: FinalPriceService) {
    this.formBuilder();
    this.buildProductSteps(data);
  }

  ngOnInit() {
  }

  updateProduct() {
    this.productService.update(this.productStep.product, this.productStep.product.id).subscribe(data => {
      this.configSnackbar.constructSnackbar('Produto atualizado!', 'success', '', 'done');
    }, err => {
      this.configSnackbar.constructSnackbar('Erro ao atualizar produto!', 'failed', '', 'warning');
    });
  }
  
  updateStock() {
    this.stockService.update(this.productStep.stock, this.productStep.stock.id).subscribe(data => {
      this.configSnackbar.constructSnackbar('Estoque atualizado!', 'success', '', 'done');
    }, err => {
      this.configSnackbar.constructSnackbar('Erro ao atualizar estoque!', 'failed', '', 'warning');
    });
  }

  updateFinalPrice() {
    this.finalPriceService.update(this.productStep.finalPrice, this.productStep.finalPrice.id)
    .subscribe(data => {
      this.configSnackbar.constructSnackbar('Preço final atualizado!', 'success', '', 'done');
    }, err => {
      this.configSnackbar.constructSnackbar('Erro ao atualizar preço final!', 'failed', '', 'warning');
    });
  }
  

  calcTotalPrice() {
    if(!this.productStep.stock.quantity) {
      this.totalPrice = this.productStep.product.price;
    } else {
      this.totalPrice = this.productStep.product.price * this.productStep.stock.quantity;
    }
  }

  calcFinalPrice() {
    let rate = 0;
    let laborRate = 0;
    this.productStep.finalPrice.price = 0;

    if(this.productStep.finalPrice.rate) {
      rate = this.productStep.product.price * (this.productStep.finalPrice.rate / 100);
    }
    if(this.productStep.finalPrice.laborRate) {
      laborRate = this.productStep.product.price * (this.productStep.finalPrice.laborRate / 100);
    }
    this.productStep.finalPrice.price = Number(this.productStep.product.price) + Number(rate) + Number(laborRate);
  }

  calcTotalAndFinalPrice() {
    this.calcTotalPrice();
    this.calcFinalPrice();
  }


  formBuilder() {
    //step: product
    this.productNameFormControl = new FormControl(null, Validators.required);
    this.productPriceFormControl = new FormControl('', Validators.required);

    //step: stock
    this.stockQuantityFormControl = new FormControl('', Validators.required);

    //step: final price
  }

  buildProductSteps(data: any) {
    this.productStep.product.price = data.price;
    this.productStep.product.name = data.name;
    this.productStep.product.active = data.active;
    this.productStep.product.notes = data.notes;
    this.productStep.stock = data.stock;
    this.productStep.finalPrice = data.finalPrice;
    this.calcTotalPrice();
  }

}
