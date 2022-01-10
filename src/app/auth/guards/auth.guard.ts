import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return !this.authService.isLoggedIn();
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   const url: string = state.url;
  //   return this.checkLogin(url);
  // }

  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   return this.canActivate(route, state);
  // }

  // checkLogin(url: string) {
  //   if (this.authService.isLoggedIn()) {
  //     return true;
  //   }

  //   this.authService.redirectUrl = url;

  //   this.router.navigate(['/login'], {queryParams: { returnUrl: url }} );
  // }
  
}
