import { TokenModel } from '../models/token/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public url = 'http://friggapi-env.eba-fv9cqnii.sa-east-1.elasticbeanstalk.com/';

  constructor(public http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) { }

  public getAuthorizationHeaders(): HttpHeaders {
    let token = localStorage.getItem('access_token');
    let headers = new HttpHeaders()
      .set('Authorization', ' Bearer ' + token)
      .set('Content-Type', 'application/json')
      .set('token', token)

    return headers;
  }

  public getAuthorizationClientHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa('angular:@ngul@r0'))
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return headers;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public expiredTokenRedirectToLogin() {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  setToken(data: Object) {
    let token = new TokenModel();
    token = <TokenModel>data;
    localStorage.setItem('access_token', token.access_token);
  }
}
