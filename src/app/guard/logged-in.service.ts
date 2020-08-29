import { Injectable } from '@angular/core';
import { TokenService } from '@services/token.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService implements CanActivate {

  constructor(private token: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.token.checkLogin()) {
      this.router.navigateByUrl("/")
      return false;
    }

    return true;
  }

}
