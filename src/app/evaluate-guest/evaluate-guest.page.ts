import { Component, OnInit } from '@angular/core';
import { BookingService } from "../booking.service";
import { UserService } from "../user.service";
import { User } from "../user";
import {Router, ActivatedRoute} from '@angular/router';
import { Booking } from '../booking';
import { EvaluationService } from '../evaluation.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evaluate-guest',
  templateUrl: './evaluate-guest.page.html',
  styleUrls: ['./evaluate-guest.page.scss'],
})
export class EvaluateGuestPage implements OnInit {

  bookingId: number;
  userId: number;
  remark: String;
  score: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private evaluationService:EvaluationService, private location:Location) {
    this.bookingId = parseInt(this.activatedRoute.snapshot.paramMap.get('bookingId'));
    this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('guestId'));
   }

  ngOnInit() {
  }

  evaluate(){
    this.evaluationService.createEvaluation(this.score,this.remark,this.bookingId,this.userId).subscribe(
      response=>{console.log("Creation success"); this.location.back();},
      error=>{console.log("error in evaluating");}
    )
  }

}
