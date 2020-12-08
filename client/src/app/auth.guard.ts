import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import {HttpLink} from 'apollo-angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthenticationService,private router: Router) { }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.CheckLogin(next, url);
  }

  CheckLogin(route:ActivatedRouteSnapshot,url:any):boolean{
    if(this.authService.logStatus()){
      const role = this.authService.getRole();
      if(route.data.role && route.data.role.indexOf(role)===-1){
        this.router.navigate(['home'])
    
        return false;
        
      }
      else{
 
        return true;
      }
    }
    this.router.navigate(['loginpage'])
    return false;
  }
}
