import { Component } from '@angular/core';
import { UserService } from '../user.service';
import {SessionService} from '../session.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	isLoggedIn: boolean;
  username: string;
  password: string;
  errorMessage: string;

	constructor(private userService: UserService, private sessionService: SessionService, private router: Router,private activatedRoute: ActivatedRoute) {
	}

	ngOnInit(){
    this.isLoggedIn = false;
    this.username =  this.activatedRoute.snapshot.paramMap.get('username');
	}

  ionViewWillEnter(){
    this.username = this.sessionService.getCurrentUser().username;
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(['register-new-user']);
  }

  logout() {
    this.sessionService.setIsLoggedIn(false);
    this.sessionService.setCurrentUser(null);
  }

  checkLoginStatus(): boolean{
    return this.sessionService.isLoggedIn();
  }

}
