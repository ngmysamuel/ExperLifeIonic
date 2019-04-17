import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
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

  constructor(private userService: UserService, private sessionService: SessionService, private router: Router, private alertController:AlertController) { }

  ngOnInit() {
  }

  login() {
    if ((this.username == null) || (this.password == null)) {
      this.errorMessage = "Pass or Username cannot be empty";
      this.presentAlertLoginUnsuccessful();
      return;
    }
    console.log(this.password);
    // this.isLoggedIn = true;
    this.userService.login(this.username, this.password).subscribe (
      response => {console.log(response.user);this.sessionService.setIsLoggedIn(true); this.sessionService.setCurrentUser(response.user);this.presentAlertLogin();this.router.navigate(['']);},
      error=>{if (error=="401"){this.errorMessage = "Wrong username/password"}else{this.errorMessage="Unknown Error"}  this.presentAlertLoginUnsuccessful();}
    );
    this.username = null;
    this.password = null;
    this.errorMessage = null;

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
