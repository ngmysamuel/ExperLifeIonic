import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Notification} from '../notification';
import { NotificationService } from '../notification.service';
import {SessionService} from '../session.service';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  errorMessage: string;

  constructor(private userService: UserService, private sessionService: SessionService, private router: Router, private alertController:AlertController, private notificationService:NotificationService) { }

  ngOnInit() {
  }

  login() {
    if ((this.username == null) || (this.password == null)) {
      this.errorMessage = "Pass or Username cannot be empty";
      this.presentAlertLoginUnsuccessful();
      return;
    }
    console.log(this.password);
    //In the response below: get the list of notifications. Then either: run through the list counting the number of false is seen. Then
    //set the number to the sessionService
    this.userService.login(this.username, this.password).subscribe (
      response => {console.log(response.user);this.sessionService.setIsLoggedIn(true); this.sessionService.setCurrentUser(response.user);this.presentAlertLogin();this.setUnread();this.router.navigate(['']);},
      error=>{if (error=="401"){this.errorMessage = "Wrong username/password"}else{this.errorMessage="Unknown Error"}  this.presentAlertLoginUnsuccessful();}
    );
    this.username = null;
    this.password = null;
    this.errorMessage = null;

  }

  setUnread() {
    this.notificationService.getNotificationFromUserId(this.sessionService.getCurrentUser().userId).subscribe(
      response=>{this.countUnread(response.ls)},
      error=>{console.log(error)}
    );
  }

  countUnread(ls: Array<Notification>) {
    let count = 0;
    for (let i = 0; i < ls.length; i++) {
      if (!ls[i].isSeen) {
        ++count;
      }
    }
    this.sessionService.setUnreadNotifications(count)
  }

  async presentAlertLogin() {
    const alert = await this.alertController.create({
      header: 'Welcome, ' + this.sessionService.getCurrentUser().username +"!",
      message: 'You are logged in!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertLoginUnsuccessful() {
    const alert = await this.alertController.create({
      header: "Login Unsuccessful!",
      message: this.errorMessage,
      buttons: ['OK']
    });

    await alert.present();
  }


}
