import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BookingService} from '../booking.service';
import {Booking} from '../booking';
import {Experience} from '../experience';
import {ExperienceDateService} from '../experience-date.service';
import {User} from '../user';
import {ExperienceDate} from '../experience-date';

@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.page.html',
  styleUrls: ['./update-booking.page.scss'],
})
export class UpdateBookingPage implements OnInit {

  id: number;
  booking: Booking;

  guest: User
  numberOfPeople: number;
  totalPrice: number;
  experienceDate: ExperienceDate;

  selectedDateId: number;
  experienceDatesAvail: Array<ExperienceDate> = [];
  unitPrice: number;

  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private bookingService: BookingService,
              private experienceDateService:ExperienceDateService) { }

  ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bookingService.getBookingById(this.id).subscribe(
      response=>{this.booking = response;this.numberOfPeople = this.booking.numberOfPeople;this.getExperienceDates();this.totalPrice=this.booking.totalPrice;this.unitPrice=this.booking.experienceDate.price; this.selectedDateId = this.booking.experienceDate.experienceDateId},
      error=>{console.log(error);}
    );
  }

  getExperienceDates(){
    this.experienceDateService.retrieveExperienceDatesByExperienceId(this.booking.experienceDate.experience.experienceId).subscribe(
      response=>{this.experienceDatesAvail = response.experienceDateEntities;},
      error=>{console.log(error)}
    );
  }

  update() {
    this.booking.numberOfPeople = this.numberOfPeople;
    this.booking.totalPrice = this.totalPrice;
    this.bookingService.updateBooking(this.booking, this.selectedDateId).subscribe(
      response=>{this.router.navigate(['/view-booking']);},
      error=>{console.log(error); this.errorMessage=error;}
    )
  }

  updateTotalPrice(ev:any) {
    let val = ev.target.value;
    this.totalPrice = this.unitPrice * val;
  }

  updateUnitPrice(ev:any){
    let iii = ev.target.value;
    this.selectedDateId = iii;
    for (let i = 0; i < this.experienceDatesAvail.length; i++) {
      let ed = this.experienceDatesAvail[i];
      if (ed.experienceDateId == iii) {
        this.unitPrice = ed.price;
        this.totalPrice = this.numberOfPeople * this.unitPrice;
        break;
      }
    }
  }


}
