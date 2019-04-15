import { Component, OnInit } from '@angular/core';
import { ExperienceDate } from '../experience-date';
import { ExperienceDateService } from '../experience-date.service'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Experience } from '../experience';
import { ExperienceService } from '../experience.service';

@Component({
  selector: 'app-view-experience-dates',
  templateUrl: './view-experience-dates.page.html',
  styleUrls: ['./view-experience-dates.page.scss'],
})
export class ViewExperienceDatesPage implements OnInit {

  experienceId: number;
  exp: Experience;
  experienceDates: Array<ExperienceDate> = [];

  constructor(private experienceDateService:ExperienceDateService, private activatedRoute: ActivatedRoute, private experienceService: ExperienceService, private router: Router) {
    this.experienceId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.experienceService.retrieveExperienceDetails(this.experienceId).subscribe(
      response=>{this.exp = response.experienceEntity;console.log(this.exp);},
      error=> {console.log("Error in getting details")}
    );
    this.experienceDateService.retrieveExperienceDates(this.experienceId).subscribe(
      response=>{this.experienceDates = response.experienceDateEntities;console.log("experience dates retrieved")},
      error=>{}
    )
   }

  ngOnInit() {
  }

  createExperienceDate(){
    this.router.navigate(['create-new-experience-date/'+ this.experienceId]);
  }

}
