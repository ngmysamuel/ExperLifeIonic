import { Component, OnInit } from '@angular/core';
import { BookingService } from "../booking.service";
import { User } from "../user";
import {Router, ActivatedRoute} from '@angular/router';
import { Booking } from '../booking';
import { EvaluationService } from '../evaluation.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.page.html',
  styleUrls: ['./guest-list.page.scss'],
})
export class GuestListPage implements OnInit {

  bookings: Array<Booking> = [];
  experienceDateId: number;

  constructor(private bookingService:BookingService, private router: Router, private activatedRoute: ActivatedRoute, private evaluationService:EvaluationService, private alertController:AlertController) {
    
   }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.experienceDateId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bookingService.retrieveAllBookingsByExperienceDateId(this.experienceDateId).subscribe(
      response=>{this.bookings = response.ls; console.log("Retrieval success");},
      error=>{console.log("error in retrieving guests");}
    )
  }

  evaluateGuest(guestId: number,bookingId:number){
    this.router.navigate(['/evaluate-guest/'+bookingId+"/"+guestId]);
  }

}
