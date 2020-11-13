import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../auth-service/auth.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignUpService extends AuthService {

  constructor(public http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
    super(http, jwtHelper, router);
  }

  create(user: User): Observable<any> {
    this.expiredTokenRedirectToLogin();
    const headers = this.getAuthorizationHeaders();
    return this.http.post(this.url + 'v1/user', user, { headers: headers });
  }



}
