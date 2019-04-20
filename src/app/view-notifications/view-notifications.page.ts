import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Notification} from '../notification';
import { NotificationService } from '../notification.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-view-notifications',
  templateUrl: './view-notifications.page.html',
  styleUrls: ['./view-notifications.page.scss'],
})
export class ViewNotificationsPage implements OnInit {

  ls: Array<Notification> = [];

  constructor(private sessionService: SessionService, private notificationService:NotificationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.notificationService.getNotificationFromUserId(this.sessionService.getCurrentUser().userId).subscribe(
      response=>{this.ls = response.ls; this.sessionService.setUnreadNotifications(0);},
      error=>{console.log(error)}
    )
  }

  ionViewWillLeave() {
    console.log("leaving view-notification");
    this.setToSeen()
  }

  setToSeen() {
    console.log("setting notifications to seen");
    this.notificationService.setAllToSeen(this.sessionService.getCurrentUser().userId).subscribe(
      response=>{},
      error=>{}
    )
  }

}
