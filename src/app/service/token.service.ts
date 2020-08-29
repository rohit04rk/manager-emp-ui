import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtToken } from '@models/token';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_TOKEN = "token"

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private login: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    if (localStorage.getItem(AUTH_TOKEN)) {
      this.login = new BehaviorSubject<boolean>(true)
    } else {
      this.login = new BehaviorSubject<boolean>(false)
    }
  }

  private decodeToken(): JwtToken {
    let jwtHelper: JwtHelperService = new JwtHelperService()
    let token: JwtToken = jwtHelper.decodeToken(localStorage.getItem(AUTH_TOKEN))

    return token
  }

  public setToken(token: string) {
    localStorage.setItem(AUTH_TOKEN, token)
    this.login.next(true)
  }

  public logout() {
    localStorage.removeItem(AUTH_TOKEN)
    this.login.next(false)
    this.router.navigateByUrl('/')
  }

  public getToken(): string {
    return localStorage.getItem(AUTH_TOKEN)
  }

  public getName(): string {
    let token: JwtToken = this.decodeToken()
    return token.name
  }

  public isLoggedIn(): Observable<boolean> {
    return this.login.asObservable()
  }

  public checkLogin(): boolean {
    return this.login.value;
  }

}
