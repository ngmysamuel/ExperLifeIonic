import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
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
      title: 'View Favorite Experiences',
      url:'/view-favorite-experience',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
