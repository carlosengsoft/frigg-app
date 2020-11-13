import { Product } from 'src/app/models/product/product.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../../auth-service/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSteps } from 'src/app/models/product/product-steps.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductService extends AuthService {
  

  constructor(http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
    super(http, jwtHelper, router);

  }

  create(product: ProductSteps): Observable<any> {
    this.expiredTokenRedirectToLogin();
    let headers = this.getAuthorizationHeaders();
    return this.http.post(this.url + 'v1/product', product, { headers: headers });
  }

  update(product: Product, productId: any): Observable<any> {
    this.expiredTokenRedirectToLogin();
    let headers = this.getAuthorizationHeaders();
    return this.http.put(this.url + `v1/product/${productId}`, product, { headers : headers });
  }

  findAll(): Observable<any> {
    this.expiredTokenRedirectToLogin();
    let headers = this.getAuthorizationHeaders();
    return this.http.get(this.url + 'v1/product/list', { headers: headers });
  }
}
