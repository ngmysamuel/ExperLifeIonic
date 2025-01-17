import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {SessionService} from './session.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private sessionService: SessionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		console.log('********** AuthGuard: ' + route.url[0].path);
		if(this.sessionService.isLoggedIn()) {
			return true;
		} else {
      console.log("is not logged in 1st");
      this.router.navigate(['/accessRightError']);
      console.log("is not logged in 2nd");
			return false;
		}
	}

}
