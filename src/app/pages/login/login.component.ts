import { ConfigSnackbar } from './../../utils/config-snackbar.service';
import { LoginService } from './service/login.service';
import { Login } from 'src/app/models/login/login.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin = new Login();
  load: boolean = false;

  //forms
  emailFormControl: any;
  passwordFormControl: any;

  constructor(private loginService: LoginService, private router: Router,
    private configSnackbar: ConfigSnackbar) {

    this.formBuilder();
  }

  ngOnInit() {
  }

  login() {
    this.load = true;
    this.loginService.login(this.userLogin).subscribe(data => {
      this.loginService.setToken(data);
      this.configSnackbar.constructSnackbar('Login efetuado com sucesso!', 'success', '', 'done');
      this.router.navigate(['product']);
    }, err => {
      if (err.status == '400') {
        this.configSnackbar.constructSnackbar('Usuário e/ou senha incorretos!', 'failed', '', 'warning');
        this.load = false;
      }
    });
  }

  navigateBySignup() {
    this.router.navigate(['/sign-up']);
  }

  formBuilder() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordFormControl = new FormControl('', Validators.required);
  }
}
