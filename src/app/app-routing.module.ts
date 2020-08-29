import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoggedInService } from './guard/logged-in.service';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent, canActivate: [LoggedInService] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
