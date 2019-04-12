import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SessionService} from '../session.service'
import {ExperienceService} from '../experience.service';
import {Experience} from '../experience';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.page.html',
  styleUrls: ['./confirm-booking.page.scss'],
})
export class ConfirmBookingPage implements OnInit {

  price:number;
  experienceId:number;
  exp: Experience;
  title: string

  constructor(private sessionService: SessionService,private experienceService: ExperienceService, private router:Router) { }

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
    this.router.navigate(['home']);
  }

}
