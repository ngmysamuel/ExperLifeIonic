import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { SessionService } from '../session.service';
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-follows',
  templateUrl: './view-follows.page.html',
  styleUrls: ['./view-follows.page.scss'],
})
export class ViewFollowsPage implements OnInit {

  follows: Array<User> = [];

  constructor(private userService:UserService, private sessionService:SessionService, private toastController: ToastController, public router:Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.userService.retrieveFollows(this.sessionService.getCurrentUser().userId).subscribe(
      response=>{this.follows = response.users; console.log("Retrieve Follows success");},
      error=>{console.log("Retrieve Follows unsuccesful");}
    );
  }

  viewUser(userId: number){
    console.log("View USER " + userId);
    this.router.navigate(['/other-profile/'+ userId]);
  }

  unfollow(unfollowId: number){
    this.userService.unfollow(this.sessionService.getCurrentUser().userId, unfollowId).subscribe(
      response=>{this.presentUserUnFollow(); console.log("Unfollow success"); this.ionViewWillEnter();},
      error=>{console.log("unfollow failde");}
    )
  }

  async presentUserUnFollow() {
    const toast = await this.toastController.create({
      message: 'User unfollowed.',
      duration: 2000
    });
    toast.present();
  }
}
