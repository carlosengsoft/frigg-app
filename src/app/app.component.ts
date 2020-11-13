import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  btnLogout: boolean = true;

  constructor(private router: Router) { }

  logout() {
    if (window.location.pathname != '/login') {
      localStorage.removeItem('access_token');
      this.router.navigate(['login']);
    }
  }
}
