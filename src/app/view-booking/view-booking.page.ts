import { Component, OnInit } from '@angular/core';
import {SessionService} from '../session.service';
import {BookingService} from '../booking.service';
import {Booking} from '../booking';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.page.html',
  styleUrls: ['./view-booking.page.scss'],
})
export class ViewBookingPage implements OnInit {

  listOfBookings: Array<Booking> = [];

  constructor(private sessionService: SessionService, private bookingService: BookingService, private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let id = this.sessionService.getCurrentUser().userId;
    this.bookingService.getAllBookingsByGuestId(id).subscribe(
      response=>{this.listOfBookings = response.ls;this.sort();},
      error=>{console.log(error);}
    )
  }

  viewDetails(book: Booking){
    this.router.navigate(['/booking-details/'+book.bookingId]);
  }

  sort(){
    this.listOfBookings.sort(
      function(a,b) {
        if (a.experienceDate < b.experienceDate) { return 1;}
        if (a.experienceDate > b.experienceDate) { return -1;}
        return 0;
      });
  }
}
