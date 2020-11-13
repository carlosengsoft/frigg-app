import { FormControl, Validators } from '@angular/forms';
import { LoginService } from './../login/service/login.service';
import { ConfigSnackbar } from './../../utils/config-snackbar.service';
import { SignUpService } from './service/sign-up.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user = new User();
  load: boolean = false;

  emailFormControl: any;
  passwordFormControl: any;
  confirmPasswordFormControl: any;

  constructor(private signUpService: SignUpService,
    private login: LoginService, private router: Router,
    private configSnackbar: ConfigSnackbar) { 
      this.formBuilder();
    }

  ngOnInit() {
  }


  createUser() {
    if (this.user.password === this.user.confirmPassword) {
      this.login.loginClientSignUp().subscribe(data => {
        this.login.setToken(data);
        this.signUpService.create(this.user).subscribe(data => {
          this.configSnackbar.constructSnackbar('Sua conta foi criada com sucesso!', 'success', '', 'done');
          localStorage.removeItem('access_token');
          this.router.navigate(['login']);
        }, err => {
          this.configSnackbar.constructSnackbar('Ocorreu um erro ao cadastrar sua conta!', 'failed', '', 'warning');
        });
      }, err => {
        this.configSnackbar.constructSnackbar('Ocorreu um erro interno!', 'failed', '', 'warning');
      });
    } else {
      this.configSnackbar.constructSnackbar('As senhas não conferem!', 'info', '', 'info');
    }
  }
  
  navigateByLogin() {
    this.router.navigate(['login']);
  }

  formBuilder() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordFormControl  = new FormControl('', Validators.required);
    this.confirmPasswordFormControl = new FormControl('', Validators.required);
  }
}

