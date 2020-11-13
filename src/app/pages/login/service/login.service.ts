import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './../../../auth-service/auth.service';
import { Login } from './../../../models/login/login.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService extends AuthService {

  constructor(public http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
    super(http, jwtHelper, router);
  }

  login(login: Login): Observable<any> {

    const headers = this.getAuthorizationClientHeaders();

    const body = new HttpParams()
      .set('client', 'angular')
      .set('username', login.username)
      .set('password', login.password)
      .set('grant_type', 'password');

    return this.http.post(this.url + 'oauth/token', body, { headers });
  }

  loginClientSignUp() {
    const headers = this.getAuthorizationClientHeaders();

    const body = new HttpParams()
      .set('client', 'angular')
      .set('username', 'contato.frigg7@gmail.com')
      .set('password', 'oPey2AfDKqLVb4gJemHr')
      .set('grant_type', 'password');

    return this.http.post(this.url + 'oauth/token', body, { headers });
  }
}
