import { Component, OnInit } from '@angular/core';
import {Experience} from '../experience';
import {ExperienceService} from '../experience.service';
import { ExperienceDate } from '../experience-date';
import { ExperienceDateService } from '../experience-date.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-new-experience-date',
  templateUrl: './create-new-experience-date.page.html',
  styleUrls: ['./create-new-experience-date.page.scss'],
})
export class CreateNewExperienceDatePage implements OnInit {

  startDate: Date;
  price: number;
  experience: Experience;
  spotsAvailable: number;
  capacity: number;
  active: boolean;
  experienceDate: ExperienceDate;

  constructor(private experienceDateService:ExperienceDateService,private router: Router,private activatedRoute: ActivatedRoute, private experienceService: ExperienceService) { }

  ngOnInit() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.experienceService.retrieveExperienceDetails(id).subscribe(
      response=>{this.experience = response.experienceEntity;console.log(this.experience);},
      error=> {console.log("Error in getting details")}
    );
    this.startDate = new Date().toISOString();
  }

  create(){
    this.experienceDate = new ExperienceDate();
    console.log(this.startDate);
    this.experienceDate.setStartDate(this.startDate);
    this.experienceDate.setPrice(this.price);
    this.experienceDate.setExperience(this.experience);
    this.experienceDate.setSpotsAvailable(this.spotsAvailable);
    this.experienceDate.setCapacity(this.capacity);
    this.experienceDate.setActive(true);
    this.experienceDateService.createExperienceDate(this.experienceDate).subscribe(
      response=>{this.router.navigate(['view-host-experience']);},
      error=>{}
    )
  }

}
