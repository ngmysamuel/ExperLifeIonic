import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import { UserService } from '../user.service';
import {SessionService} from '../session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.page.html',
  styleUrls: ['./register-new-user.page.scss'],
})
export class RegisterNewUserPage implements OnInit {

  // u: User;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  userId: number;

  constructor(private userService: UserService, private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
  }
// constructor(username:string,password: string,firstName: string,lastName: string,email: string,userId:number)
  register(){
    let u = new User(this.username, this.password, this.firstName, this.lastName, this.email);
    this.userService.register(u).subscribe(
      response=>{this.sessionService.setCurrentUser(response.user);this.sessionService.setIsLoggedIn(true);console.log(this.sessionService.getCurrentUser().username);this.router.navigate(['home/'+this.sessionService.getCurrentUser().username]);},
      error=>{console.log("ERROR IN REGISTERING User")}
    );
  }

}
