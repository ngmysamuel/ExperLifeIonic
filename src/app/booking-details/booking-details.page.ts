import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BookingService} from '../booking.service';
import {Booking} from '../booking';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {

  booking: Booking;

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private bookingService: BookingService, private actionSheetController:ActionSheetController, private alertController: AlertController) { }

  ngOnInit() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bookingService.getBookingById(id).subscribe(
      response=>{this.booking = response},
      error=>{console.log(error)}
    )
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Action',
      buttons: [{
        text: 'Delete Booking',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.presentAlertConfirm2();
        }
      }, {
        text: 'Update Booking',
        icon: 'create',
        handler: () => {
          this.router.navigate(['/update-booking/'+this.booking.bookingId]);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentAlertConfirm2() {
    const alert = await this.alertController.create({
      header: 'Confirm Delete?',
      message: 'Do you want to <strong>delete</strong> this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete (backend is not implemented)',
          handler: () => {
            console.log("Backend is not implemented yet")
          }
        }
      ]
    });

    await alert.present();
  }

}
