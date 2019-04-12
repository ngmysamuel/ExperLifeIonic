import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {SessionService} from '../session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  errorMessage: string;

  constructor(private userService: UserService, private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if ((this.username == null) || (this.password == null)) {
      this.errorMessage = "Pass or Username cannot be empty";
      return;
    }
    console.log(this.password);
    // this.isLoggedIn = true;
    this.userService.login(this.username, this.password).subscribe (
      response => {console.log(response.user);this.sessionService.setIsLoggedIn(true); this.sessionService.setCurrentUser(response.user);this.router.navigate(['home/'+this.sessionService.getCurrentUser().username]);},
      error=>{if (error=="401"){this.errorMessage = "Wrong username/password"}else{this.errorMessage="Unknown Error"}}
    );
    this.username = null;
    this.password = null;
    this.errorMessage = null;

  }


}
