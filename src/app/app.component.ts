import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    // {
    //   title: 'Home',
    //   url: '/home',
    //   icon: 'home'
    // },
    {
      title: 'Search Experiences',
      url: '/lista',
      icon: 'search'
    },
    {
      title: 'Create Your Experience!',
      url: '/create-experience',
      icon: 'create'
    },
    {
      title: 'View Host Experience',
      url:'/view-host-experience',
      icon: 'list'
    },
    {
      title: 'View Your Bookings',
      url:'/view-booking',
      icon: 'list'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'body',
    },
    {
      title: 'View Favorite Experiences',
      url:'/view-favorite-experience',
      icon: 'star'
    },
    {
      title: 'Followers',
      url:'/view-followers',
      icon:'contacts'
    },
    {
      title: 'Follows',
      url:'/view-follows',
      icon:'contacts'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sessionService: SessionService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  isLoggedIn(){
    return this.sessionService.isLoggedIn();
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
    this.presentAlertLogout();
    this.router.navigate(['']);
  }

  async presentAlertLogout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'You are logged Out!',
      buttons: ['OK']
    });

    await alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
