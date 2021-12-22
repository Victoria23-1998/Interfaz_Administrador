import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './auth/interface/localS';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {
  constructor(private router:Router,private authService:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     const isLogged=this.authService.isLoggedIn();
    if(!isLogged){
     this.router.navigate(['login'])
    }
    return this.authService.isLoggedIn();
  }
  
}
