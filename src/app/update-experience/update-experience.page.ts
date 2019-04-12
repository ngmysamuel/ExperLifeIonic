import { Component, OnInit } from '@angular/core';
import {ExperienceService} from '../experience.service';
import {Experience} from '../experience';
import { ActivatedRoute, Router } from '@angular/router';
import {Category} from '../category';
import {CategoryService} from '../category.service';
import {Type} from '../type';
import {TypeService} from '../type.service';
import {Location} from '../location';
import {LocationService} from '../location.service';
import {Language} from '../language';
import {LanguageService} from '../language.service';

@Component({
  selector: 'app-update-experience',
  templateUrl: './update-experience.page.html',
  styleUrls: ['./update-experience.page.scss'],
})
export class UpdateExperiencePage implements OnInit {

  id: number;
  exp: Experience;

  title: string;
  category: number;
  address: string;
  type: number;
  location: number;
  language: number;

  categoryLs: Category[];
  typeLs: Type[];
  locationLs: Location[];
  languageLs: Language[];

  constructor(private experienceService: ExperienceService, private categoryService: CategoryService,
              private typeService: TypeService, private locationService: LocationService, private languageService: LanguageService,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.experienceService.retrieveExperienceDetails(this.id).subscribe(
      response=>{this.exp = response.experienceEntity;this.title = this.exp.title;this.address = this.exp.address;},
      error=> {console.log("Error in getting details")}
    );
    this.categoryService.retrieveAllCategories().subscribe(
      response=>{this.categoryLs = response.categoryEntities},
      error=>{"Cat service error"}
    )
    this.typeService.retrieveAllTypes().subscribe(
      response=>{this.typeLs = response.typeEntities},
      error=>{}
    )
    this.locationService.retrieveAllLocations().subscribe(
      response=>{this.locationLs = response.locationEntities},
      error=>{}
    )
    this.languageService.retrieveAllLanguages().subscribe(
      response=>{this.languageLs = response.ls},
      error=>{}
    )
   }

  ngOnInit() {
  }

  updateExp() {
    this.exp.title = this.title;
    this.exp.address = this.address;
    this.categoryLs.forEach((c) => {if (c.categoryId==this.category){this.exp.category = c;}});
    this.typeLs.forEach((c)=>{if (c.typeId==this.type){this.exp.type = c;}});
    this.locationLs.forEach((c)=>{if (c.locationId==this.location){this.exp.location = c;}});
    this.languageLs.forEach((c)=>{if (c.languageId==this.language){this.exp.language = c;}});
    this.experienceService.updateExperience(this.exp).subscribe(
      response=>{console.log("returned from updating"); this.router.navigate(['/view-host-experience']);},
      error=>{console.log("error in creating")}
    );
  }

}
