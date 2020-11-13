import { ProductEditComponent } from './../product-edit/product-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfigSnackbar } from './../../utils/config-snackbar.service';
import { ProductSteps } from './../../models/product/product-steps.model';
import { Product } from './../../models/product/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

  product: Product = new Product();
  productStep: ProductSteps = new ProductSteps();
  form: FormGroup;

  totalPrice: number;
  prePrice: number = 0;

  products = new Array();
  columnsToDisplay = ['name', 'price', 'notes', 'stock', 'finalPrice', 'active', 'actions'];
  dataSource;

  productNameFormControl: any;
  productPriceFormControl: any;
  stockQuantityFormControl: any;

  constructor(private productService: ProductService,
    private configSnackbar: ConfigSnackbar, private dialog: MatDialog) {
    this.formBuilder();
    this.findAll();
  }

  ngOnInit() {
    this.productStep.product.active = true;
  }


  edit(data: any) {
    this.dialog.open(ProductEditComponent, {
      data: data,
      height: '380px',
      width: '700px'
    }).afterClosed().subscribe(() => {
      this.findAll();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  findAll() {
    this.productService.findAll().subscribe(data => {
      const list: ProductFilter[] = data;
      console.log(data);
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.filterPredicate = (data, filter) => {
        const dataStr = data.name.toLowerCase();
        return dataStr.indexOf(filter) != -1;
      }
    }, err => {
      this.configSnackbar.constructSnackbar('Ocorreu um erro!', 'failed', '', 'warning');
    });
  }

  create() {
    this.productService.create(this.productStep).subscribe(data => {
      this.configSnackbar.constructSnackbar('Produto cadastrado!', 'success', '', 'done');
      this.findAll();
    }, err => {
      this.configSnackbar.constructSnackbar('Ocorreu um erro!', 'failed', '', 'warning');
    });
  }

  calcTotalPrice() {
    if (!this.productStep.stock.quantity) {
      this.totalPrice = this.productStep.product.price;
    } else {
      this.totalPrice = this.productStep.product.price * this.productStep.stock.quantity;
    }
  }

  calcFinalPrice() {
    let rate = 0;
    let laborRate = 0;
    this.productStep.finalPrice.price = 0;

    if (this.productStep.finalPrice.rate) {
      rate = this.productStep.product.price * (this.productStep.finalPrice.rate / 100);
    }
    if (this.productStep.finalPrice.laborRate) {
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
}


export interface ProductFilter {
  name: string;
}

