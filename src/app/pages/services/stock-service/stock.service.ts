import { Stock } from './../../../models/stock/stock.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../../../auth-service/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StockService extends AuthService {

  constructor(http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
    super(http, jwtHelper, router);
  }

  update(stock: Stock, stockId: any):Observable<any> {
    this.expiredTokenRedirectToLogin();
    let headers = this.getAuthorizationHeaders();
    return this.http.put(this.url + `v1/stock/${stockId}`, stock, { headers: headers });
  }
}
