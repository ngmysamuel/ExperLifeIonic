import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Experience } from '../experience';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceService } from '../experience.service';
import { Evaluation } from '../evaluation';
import { UserService } from '../user.service';
import { EvaluationService } from '../evaluation.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.page.html',
  styleUrls: ['./other-profile.page.scss'],
})
export class OtherProfilePage implements OnInit {

  user: User;

  experiences: Array<Experience> = [];
  evaluations: Array<Evaluation> = [];

  constructor(private activatedRoute: ActivatedRoute, private experienceService: ExperienceService, private userService: UserService, private evaluationService:EvaluationService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    let userId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.userService.getUser(userId).subscribe(
      response=>{this.user = response; console.log("User retrieve success");},
      error=>{console.log("User retrieval failed");}
    );
    this.experienceService.retrieveHostExperience(userId).subscribe(
      response=>{this.experiences = response.experienceEntities; console.log("retrieve experiences successful")},
      error=>{console.log("Experience retrieval failed");}
    );
    this.evaluationService.retrieveEvaluationByGuest(userId).subscribe(
      response=>{this.evaluations = response.ls; console.log("guest evaluation retrieval success");},
      error=>{console.log("guest eval retreival failed");}
    );
    this.evaluationService.retrieveEvaluationByHost(userId).subscribe(
      response=>
      {
        for(let res of response.ls){
          this.evaluations.push(res);
        } 
        console.log("host evaluation retrieval success");
      },
      error=>{console.log("host eval retreival failed");}
    );
  }

  viewExperience(expId: number){
    this.router.navigate(['/experience-details/'+expId]);
  }

}
