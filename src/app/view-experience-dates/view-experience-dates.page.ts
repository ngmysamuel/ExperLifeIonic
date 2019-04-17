import { Component, OnInit } from '@angular/core';
import { ExperienceDate } from '../experience-date';
import { ExperienceDateService } from '../experience-date.service'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Experience } from '../experience';
import { ExperienceService } from '../experience.service';

@Component({
  selector: 'app-view-experience-dates',
  templateUrl: './view-experience-dates.page.html',
  styleUrls: ['./view-experience-dates.page.scss'],
})
export class ViewExperienceDatesPage implements OnInit {

  experienceId: number;
  exp: Experience;
  experienceDates: Array<ExperienceDate> = [];

  constructor(private experienceDateService:ExperienceDateService, private activatedRoute: ActivatedRoute, private experienceService: ExperienceService, private router: Router, private alertController: AlertController) {
    this.experienceId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.experienceService.retrieveExperienceDetails(this.experienceId).subscribe(
      response=>{this.exp = response.experienceEntity;console.log(this.exp);},
      error=> {console.log("Error in getting details")}
    );
    this.experienceDateService.retrieveExperienceDates(this.experienceId).subscribe(
      response=>{this.experienceDates = response.experienceDateEntities;console.log("experience dates retrieved")},
      error=>{}
    )
   }

  ngOnInit() {
  }

  createExperienceDate(){
    this.router.navigate(['create-new-experience-date/'+ this.experienceId]);
  }

  async presentDeleteExpDate(experienceDateId: number){
    const alert = await this.alertController.create({
      header: 'Delete Experience Date',
      message: 'Do you want to delete this experience date? Any related bookings will be cancelled. Please enter your cancellation reason below!',
      inputs: [
        {
          name:'Reason',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: data => {
            this.deleteExpDate(experienceDateId, data.Reason);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteExpDate(experienceDateId: number, reason: String){
    this.experienceDateService.deleteExperienceDate(experienceDateId, reason).subscribe(
      response=>{console.log("Experience Date " + experienceDateId + " deleted!");},
      error=>{console.log("Fail deleting exp date");}
    );
  }

  viewGuest(experienceDateId: number){
    this.router.navigate(['guest-list/'+experienceDateId]);
  }

}
