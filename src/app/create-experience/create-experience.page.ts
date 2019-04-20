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
import { Router } from '@angular/router';
import {GetLocationService} from '../get-location.service';
import {SessionService} from '../session.service';
import { LoadingController } from '@ionic/angular';

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

  loading: any;

  constructor(private experienceService: ExperienceService, private categoryService: CategoryService,private router: Router,
              private typeService: TypeService, private locationService: LocationService, private languageService: LanguageService,
              private getLocationService:GetLocationService, private sessionService:SessionService, private loadingController: LoadingController) { }

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

  async getAddress() {
    console.log("ADD pressed")
    this.presentLoading();
    await this.getLocationService.getPosition().
    then((resp)=>{console.log("in 1st resp");console.log(resp.coords.latitude); return this.getLocationService.reverse(resp.coords.latitude, resp.coords.longitude);}).
    then((result: any) => {console.log("in 2nd resp");this.getLocationService.marhshallString(result[0]);console.log("string marshalled");this.address = this.sessionService.getAddress();this.dismissLoading();}).
    catch((error)=>{console.log(error);});
    console.log("After await");
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
      response=>{console.log("returned from creating");this.errorMessage="Experience Created!"; this.router.navigate(['/view-host-experience'])},
      error=>{this.errorMessage = error; console.log(error+"DDDDDDD");}
    );
  }

  ionViewWillLeave() {
    console.log("ion leaving");
    this.title = "";
    this.category = undefined;
    this.address = "";
    this.type = undefined;
    this.location = undefined;
    this.language = undefined;

    this.exp = undefined;
    this.errorMessage = undefined;
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Finding where you are...',
      backdropDismiss: true
    });
    return await this.loading.present();
  }

  async dismissLoading() {
    console.log("dimissLoading() called")
    const { role, data } = await this.loading.dismiss();
    console.log("Loading dismissed")
    return;
  }

}
