import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtToken } from '@models/token';
import { Router } from '@angular/router';

const AUTH_TOKEN = "token"

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  private decodeToken(): JwtToken {
    let jwtHelper: JwtHelperService = new JwtHelperService()
    let token: JwtToken = jwtHelper.decodeToken(localStorage.getItem(AUTH_TOKEN))

    return token
  }

  public setToken(token: string) {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  public logout() {
    localStorage.removeItem(AUTH_TOKEN)
    this.router.navigateByUrl('/')
  }

  public getToken(): string {
    return localStorage.getItem(AUTH_TOKEN)
  }

  public isLoggedIn(): boolean {    
    if(localStorage.getItem(AUTH_TOKEN)){
      return true;
    }
    return false;
  }

}
