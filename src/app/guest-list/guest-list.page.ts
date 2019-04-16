import { Component, OnInit } from '@angular/core';
import { ExperienceDateService } from "../experience-date.service";
import { User } from "../user";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.page.html',
  styleUrls: ['./guest-list.page.scss'],
})
export class GuestListPage implements OnInit {

  guests: Array<User> = [];
  experienceDateId: number;

  constructor(private experienceDateService: ExperienceDateService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.experienceDateId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.experienceDateService.retrieveExperienceDateGuests(this.experienceDateId).subscribe(
      response=>{this.guests = response.users; console.log("Retrieval success");},
      error=>{console.log("error in retrieving guests");}
    )
   }

  ngOnInit() {
    
  }

}
