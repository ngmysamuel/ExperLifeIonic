import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { UserService } from '../user.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-followers',
  templateUrl: './view-followers.page.html',
  styleUrls: ['./view-followers.page.scss'],
})
export class ViewFollowersPage implements OnInit {

  followers: Array<User> = [];

  constructor(private userService:UserService, private sessionService:SessionService, private router:Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.userService.retrieveFollowers(this.sessionService.getCurrentUser().userId).subscribe(
      response=>{this.followers = response.users; console.log("Retrieve Followers success");},
      error=>{console.log("Retrieve Followers unsuccesful");}
    );
  }

  viewUser(userId: number){
    console.log("View USER " + userId);
    this.router.navigate(['/other-profile/'+ userId]);
  }

}
