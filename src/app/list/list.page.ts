import { Component, OnInit } from '@angular/core';
import {ExperienceService} from '../experience.service';
import {Experience} from '../experience';
import {Router} from '@angular/router';

import {Category} from '../category';
import {CategoryService} from '../category.service';
import {Type} from '../type';
import {TypeService} from '../type.service';
import {Location} from '../location';
import {LocationService} from '../location.service';
import {Language} from '../language';
import {LanguageService} from '../language.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  selectedItem: any;
  undef: any = undefined;

  myInput: string; //search for title
  category: any;
  type: any;
  location: any;
  language: any;
  date: Date;

  dateFilteredItems: Array<Experience> = [];
  filteredItems: Array<Experience> = [];
  items: Array<Experience> = [];

  categoryLs: Category[];
  typeLs: Type[];
  locationLs: Location[];
  languageLs: Language[];

  constructor(private router: Router,private experienceService: ExperienceService,private categoryService: CategoryService,
              private typeService: TypeService, private locationService: LocationService, private languageService: LanguageService) {
  }

  ngOnInit() {
    this.experienceService.retrieveAllExperiences().subscribe(
      response=>{this.items = response.experienceEntities;this.filteredItems = this.items;this.dateFilteredItems=this.items},
      error=>{console.log("error in initialiseItems")}
    );
    this.categoryService.retrieveAllCategories().subscribe(
      response=>{this.categoryLs = response.categoryEntities},
      error=>{"Cat service error"}
    );
    this.typeService.retrieveAllTypes().subscribe(
      response=>{this.typeLs = response.typeEntities},
      error=>{}
    );
    this.locationService.retrieveAllLocations().subscribe(
      response=>{this.locationLs = response.locationEntities},
      error=>{}
    );
    this.languageService.retrieveAllLanguages().subscribe(
      response=>{this.languageLs = response.ls},
      error=>{}
    );
  }

  onInput(event: any) {
    this.clearSelection();
    this.filteredItems = this.items;
    var val = event.target.value;
    if (val && val.trim() != '') {
      this.filteredItems = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  updateFilteredItems() {
    this.filteredItems = this.items;
    console.log("Date selected is: "+this.date);
    if (this.date != undefined) {
      this.experienceService.filterExperienceByDate(this.filteredItems, this.date).subscribe(
        response=>{this.filteredItems = response.listToFilterFrom; this.dateFilteredItems = this.filteredItems; this.filterMore()},
        error=>{console.log(error);}
      )
    }
  }

  filterMore() {
    if (this.date == undefined) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.dateFilteredItems;
      console.log(this.filteredItems);
    }
    console.log("2nd");
    console.log(this.filteredItems);
    console.log("Category id selected is: "+this.category);
    if (this.category != undefined && this.category != "undef") {
      console.log(this.category);
      this.filteredItems = this.filteredItems.filter((item) => {
        return (item.category.categoryId == this.category)
      })
    }
    console.log("3rd");
    console.log(this.filteredItems);
    console.log("Type id selected is: "+this.type);
    if (this.type != undefined && this.type != "undef") {
      this.filteredItems = this.filteredItems.filter((item) => {
        return (item.type.typeId == this.type)
      })
    }
    console.log("Language id selected is: "+this.language);
    if (this.language != undefined && this.language != "undef") {
      this.filteredItems = this.filteredItems.filter((item) => {
        return (item.language.languageId == this.language)
      })
    }
    console.log("Location id selected is: "+this.location);
    if (this.location != undefined && this.location != "undef") {
      this.filteredItems = this.filteredItems.filter((item) => {
        return (item.location.locationId == this.location)
      })
    }
  }


  clearSelection(){
    this.myInput = undefined;
    this.category = undefined;
    this.type = undefined;
    this.language = undefined;
    this.location = undefined;
    this.date = undefined;
    this.updateFilteredItems();
  }

  selectExp(exp: Experience) {
    this.router.navigate(['/experience-details/'+exp.experienceId]);
    console.log(exp.title);
  }

  bookExp(exp: Experience) {
    console.log("BOOKI");
  }


}
