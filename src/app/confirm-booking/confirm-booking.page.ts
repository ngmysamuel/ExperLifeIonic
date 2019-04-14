import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SessionService} from '../session.service'
import {ExperienceService} from '../experience.service';
import {BookingService} from '../booking.service';
import {ExperienceDateService} from '../experience-date.service';
import {Experience} from '../experience';
import {Booking} from '../booking';
import { ExperienceDate } from '../experience-date';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.page.html',
  styleUrls: ['./confirm-booking.page.scss'],
})
export class ConfirmBookingPage implements OnInit {

  price:number;
  totalPrice:number;
  numOfPeople:number;
  experienceDateId:number;
  experienceId:number;
  exp: Experience;
  title: string
  booking: Booking;

  constructor(private sessionService: SessionService,private alertController: AlertController, private experienceService: ExperienceService, private router:Router,private bookingService: BookingService, private activatedRoute: ActivatedRoute, private experienceDateService: ExperienceDateService) {
    this.experienceDateId = parseInt(this.activatedRoute.snapshot.paramMap.get('expDateId'));
  }

  ngOnInit() {
    let o = this.sessionService.getJsonObject();
    this.price = o.price;
    this.experienceId = o.experienceId;
    console.log(o.experienceId);
    this.experienceService.retrieveExperienceDetails(this.experienceId).subscribe(
      response=>{this.exp = response.experienceEntity;console.log(this.exp);this.title = this.exp.title},
      error=> {console.log("Error in getting details")}
    );
  }

  confirm(){
    let booking = new Booking();
    booking.setBookingDate(new Date(Date.now()));
    booking.setTotalPrice(this.totalPrice);
    booking.setNumberOfPeople(this.numOfPeople);
    this.bookingService.createBooking(booking, this.experienceDateId).subscribe(
      response=>{this.router.navigate(['home']);},
      error=>{console.log("Error in confirming booking!")}
    )
  }

  updateTotalPrice(){
    this.totalPrice = this.price*this.numOfPeople;
  }

  async presentAlertConfirm2() {
    const alert = await this.alertController.create({
      header: 'Confirm Booking?',
      message: 'Do you want to <strong>book</strong> this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Book',
          handler: () => {
            this.confirm();
          }
        }
      ]
    });
    await alert.present();
  }

}
