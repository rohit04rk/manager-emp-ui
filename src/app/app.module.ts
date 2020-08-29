import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatIconModule, MatCardModule, MatDatepickerModule,
  MatSnackBarModule, MatDialogModule,
  MatInputModule, MatButtonModule, MatNativeDateModule, MatProgressSpinnerModule
} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from './http.interceptor';
import { AddUpdateEmployeeComponent } from './add-update-employee/add-update-employee.component';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';


export const MATERIAL_MODULES = [
  MatIconModule, 
  MatCardModule, 
  MatDatepickerModule,
  MatSnackBarModule, 
  MatDialogModule,
  MatInputModule, 
  MatButtonModule,
  MatNativeDateModule,
  MatProgressSpinnerModule
]

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AddUpdateEmployeeComponent,
    ConfirmPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({ config: { tokenGetter: tokenGetter } }),
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MATERIAL_MODULES
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true
    }
  ],
  entryComponents:[
    AddUpdateEmployeeComponent,
    ConfirmPopupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
