import { Component, OnInit } from '@angular/core';
import {Category} from '../category';
import {CategoryService} from '../category.service';
import {ExperienceService} from '../experience.service';
import {Experience} from '../experience';
import {Type} from '../type';
import {TypeService} from '../type.service';
import {Location} from '../location';
import {LocationService} from '../location.service';
import {Language} from '../language';
import {LanguageService} from '../language.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-experience',
  templateUrl: './create-experience.page.html',
  styleUrls: ['./create-experience.page.scss'],
})
export class CreateExperiencePage implements OnInit {

  title: string;
  category: number;
  address: string;
  type: number;
  location: number;
  language: number;

  exp: Experience;
  errorMessage: string;

  categoryLs: Category[];
  typeLs: Type[];
  locationLs: Location[];
  languageLs: Language[];

  constructor(private experienceService: ExperienceService, private categoryService: CategoryService,private router: Router,
              private typeService: TypeService, private locationService: LocationService, private languageService: LanguageService) { }

  ngOnInit() {
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

  createExperience() {
    console.log("1st");
    // this.exp = new Experience(this.title,this.category,this.address,this.type,this.location,this.language);
    // exp.title = this.title;
    // exp.category = this.category;
    // exp.address = this.address;
    // exp.type = this.type;
    // exp.location = this.location;
    // exp.language = this.language;
    this.exp = new Experience();
    this.exp.setTitle(this.title);
    this.exp.setAddress(this.address);
    this.categoryLs.forEach((c) => {if (c.categoryId==this.category){this.exp.setCategory(c);}});
    this.typeLs.forEach((c)=>{if (c.typeId==this.type){this.exp.setType(c);}});
    this.locationLs.forEach((c)=>{if (c.locationId==this.location){this.exp.setLocation(c);}});
    this.languageLs.forEach((c)=>{if (c.languageId==this.language){this.exp.setLanguage(c);}});
    console.log("2nd");
    // console.log(this.exp.category.name);
    this.experienceService.createExperience(this.exp).subscribe(
      response=>{console.log("returned from creating");this.errorMessage="Experience Created!";this.router.navigate(['/lista'])},
      error=>{this.errorMessage = error; console.log(error+"DDDDDDD");}
    );
  }

}
