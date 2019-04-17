import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { EvaluationService } from '../evaluation.service';
import { Location } from '@angular/common';
import { SessionService } from '../session.service';



@Component({
  selector: 'app-evaluate-experience',
  templateUrl: './evaluate-experience.page.html',
  styleUrls: ['./evaluate-experience.page.scss'],
})
export class EvaluateExperiencePage implements OnInit {

  bookingId: number;
  userId: number;
  remark: String;
  score: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private evaluationService:EvaluationService, private location:Location, private sessionService: SessionService) {
    this.bookingId = parseInt(this.activatedRoute.snapshot.paramMap.get('bookingId'));
    this.userId = this.sessionService.getCurrentUser().userId;
   }

  ngOnInit() {
  }

  evaluate(){
    this.evaluationService.createEvaluationFromGuest(this.score,this.remark,this.bookingId,this.userId).subscribe(
      response=>{console.log("Creation success"); this.location.back();},
      error=>{console.log("error in evaluation");}
    )
  }
  
  submit() {
    console.log("ts: "+this.bookingId);
    this.evaluationService.createEvaluateExperience(this.score, this.remark, this.bookingId).subscribe(
      response=>{this.router.navigate(['view-booking'])},
      error=>{console.log(error)}

}
