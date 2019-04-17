import { Component, OnInit } from '@angular/core';
import {ExperienceService} from '../experience.service';
import {Experience} from '../experience';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-favorite-experience',
  templateUrl: 'view-favorite-experience.page.html',
  styleUrls: ['view-favorite-experience.page.scss']
})
export class ViewFavoriteExperiencePage implements OnInit {
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
    
  }

  private initialiseItems(){
    this.experienceService.retrieveAllFavoriteExperiences().subscribe(
      response=>{this.items = response.experienceEntities;this.filteredItems = this.items;},
      error=>{console.log("error in initialiseItems")}
    )
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.initialiseItems();
  }

  unfollow(experienceId:number){
    this.experienceService.unfollowExperience(experienceId).subscribe(
      response=>{console.log("UnFollow success");},
      error=>{console.log(error);}
    )
  }

  selectExp(exp: Experience) {
    this.router.navigate(['/experience-details/'+exp.experienceId]);
    console.log(exp.title);
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
}