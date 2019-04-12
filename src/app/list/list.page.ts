import { Component, OnInit } from '@angular/core';
import {ExperienceService} from '../experience.service';
import {Experience} from '../experience';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];

  private myInput: string

  public filteredItems: Array<Experience> = [];

  public items: Array<Experience> = [];

  constructor(private router: Router,private experienceService: ExperienceService) {
    this.initialiseItems();
  }

  private initialiseItems(){
    this.experienceService.retrieveAllExperiences().subscribe(
      response=>{this.items = response.experienceEntities;this.filteredItems = this.items;},
      error=>{console.log("error in initialiseItems")}
    )
  }

  ngOnInit() {
  }

  onInput(event: any) {
    this.filteredItems = this.items;
    var val = event.target.value;
    if (val && val.trim() != '') {
      this.filteredItems = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  selectExp(exp: Experience) {
    this.router.navigate(['/experience-details/'+exp.experienceId]);
    console.log(exp.title);
  }

  bookExp(exp: Experience) {
    console.log("BOOKI");
  }


}
