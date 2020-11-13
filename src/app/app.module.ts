//Components
import { LoginComponent } from './pages/login/login.component';
import { SnackbarComponent } from './material-components/snackbar/snackbar.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { ProductComponent } from './pages/product/product.component';

//Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxCurrencyModule } from "ngx-currency";


//utils
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule, LOCALE_ID } from '@angular/core';

//services
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from './auth-service/auth-guard.service';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SnackbarComponent,
    LoginComponent,
    SignUpComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    HttpClientModule,
    MatButtonModule,
    MatStepperModule,
    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule, 
    MatProgressSpinnerModule,
    MatMenuModule,
    NgxCurrencyModule
  ],
  entryComponents: [
    SnackbarComponent,
    ProductEditComponent
  ],
  providers: [ {provide: LOCALE_ID, 
    useValue: "pt-BR"},  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService , AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
