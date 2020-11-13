import { FinalPrice } from './../../../models/final-price/final-price.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../auth-service/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class FinalPriceService extends AuthService {

  constructor(http: HttpClient, jwtHelper: JwtHelperService, public router: Router) {
    super(http, jwtHelper, router);
  }

  update(finalPrice: FinalPrice, finalPriceId: any): Observable<any> {
    this.expiredTokenRedirectToLogin();
    let headers = this.getAuthorizationHeaders();

    return this.http.put(this.url + `v1/final-price/${finalPriceId}`, finalPrice, 
      { headers: headers });
  }
}
