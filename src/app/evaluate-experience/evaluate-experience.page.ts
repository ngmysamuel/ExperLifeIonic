import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { EvaluationService } from '../evaluation.service';

@Component({
  selector: 'app-evaluate-experience',
  templateUrl: './evaluate-experience.page.html',
  styleUrls: ['./evaluate-experience.page.scss'],
})
export class EvaluateExperiencePage implements OnInit {

  bookingId: number;
  score: number;
  remark: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private evaluationService:EvaluationService) { }

  ngOnInit() {
    this.bookingId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }


  submit() {
    console.log("ts: "+this.bookingId);
    this.evaluationService.createEvaluateExperience(this.score, this.remark, this.bookingId).subscribe(
      response=>{this.router.navigate(['view-booking'])},
      error=>{console.log(error)}
    )
  }
}
