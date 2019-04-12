import { Component, OnInit } from '@angular/core';
import {Experience} from '../experience'
import {Router} from '@angular/router';
import {ExperienceService} from '../experience.service';
import {SessionService} from '../session.service';

@Component({
  selector: 'app-view-host-experience',
  templateUrl: './view-host-experience.page.html',
  styleUrls: ['./view-host-experience.page.scss'],
})
export class ViewHostExperiencePage implements OnInit {

  listOfExperiences: Array<Experience> = [];
  exp: Experience;

  constructor(private router: Router, private experienceService: ExperienceService, private sessionService:SessionService) { }

  ngOnInit() {
    
  }


  selectExp(exp: Experience) {
    this.router.navigate(['/experience-details/'+exp.experienceId]);
    console.log(exp.title);
  }

  ionViewWillEnter() {
    this.experienceService.retrieveHostExperience(this.sessionService.getCurrentUser().userId).subscribe(
      response=>{this.listOfExperiences = response.experienceEntities},
      error=>{console.log("Error in ViewHostExperience.ts")}
    );
  }

}
