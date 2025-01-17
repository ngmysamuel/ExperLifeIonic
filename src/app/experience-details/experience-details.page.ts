import { Component, OnInit } from '@angular/core';
import {ExperienceService} from '../experience.service';
import {Experience} from '../experience';
import { ExperienceDate } from '../experience-date';
import { ExperienceDateService } from '../experience-date.service'
import { ActivatedRoute, Router } from '@angular/router';
import {SessionService} from '../session.service'
import { User } from '../user';
import { UserService } from '../user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.page.html',
  styleUrls: ['./experience-details.page.scss'],
})
export class ExperienceDetailsPage implements OnInit {

  id: number;
  exp: Experience;
  isLoaded: boolean;
  user: User;
  host: string;

  selectedDateId: number;
  experienceDatesAvail: Array<ExperienceDate> = [];

  price: number;

  errorMessage: string;

  constructor(private userService: UserService, private experienceService: ExperienceService, private activatedRoute: ActivatedRoute, private router: Router, private sessionService: SessionService, private alertController: AlertController, private experienceDateService:ExperienceDateService, public actionSheetController: ActionSheetController, private toastController:ToastController) {
    this.isLoaded = false;
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.experienceService.retrieveExperienceDetails(this.id).subscribe(
      response=>{this.exp = response.experienceEntity;console.log(this.exp);this.getHostName();},
      error=> {console.log("Error in getting details")}
    );
    this.experienceDateService.retrieveExperienceDates(this.id).subscribe(
      response=>{this.experienceDatesAvail = response.experienceDateEntities},
      error=>{}
    )
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Host Actions',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.presentAlertConfirm();
        }
      }, {
        text: 'Update',
        icon: 'create',
        handler: () => {
          console.log('Share clicked');
          this.navigateToUpdate();
        }
      }, {
        text: 'Create Experience Date',
        icon: 'add-circle',
        handler: () => {
          console.log('Create Ed clicked');
          this.createExperienceDate();
        }
      }, {
        text: 'View Experience Dates',
        icon: 'list',
        handler: () => {
          console.log('View ED clicked');
          this.router.navigate(['view-experience-dates/'+this.exp.experienceId]);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          actionSheet.dismiss();
        }
      }]
    });
    await actionSheet.present();
  }

  ngOnInit() {
  }

  getHostName(){
    this.userService.getUser(this.exp.host.userId).subscribe(
      response=>{this.host = response.username},
      error=>{}
    )
  }

  book() {
    if (this.price == undefined) {
      this.errorMessage = "Please select a date."
      return;
    }
    let e = {'price':this.price, 'experienceId':this.id};
    this.sessionService.setJsonObject(e);
    this.router.navigate(['/confirm-booking/'+this.selectedDateId]);
  }

  updatePrice(){
    for (let i = 0; i < this.experienceDatesAvail.length; i++) {
      let ed = this.experienceDatesAvail[i];
      if (ed.experienceDateId == this.selectedDateId) {
        this.price = ed.price;
        break;
      }
    }
  }

  follow(){
    this.experienceService.followExperience(this.id).subscribe(
      response=>{console.log("Follow success"); this.presentFollow();},
      error=>{console.log(error);}
    )
  }

  delete(){
    this.experienceService.deleteExperience(this.id).subscribe(
      response=>{this.router.navigate(['/view-host-experience']);},
      error=>{this.errorMessage = error;}
    )
  }

  navigateToUpdate(){
    this.router.navigate(['/update-experience/'+this.exp.experienceId]);
    console.log(this.exp.title);
  }

  createExperienceDate(){
    this.router.navigate(['/create-new-experience-date/'+this.exp.experienceId]);
  }

  isItYours(): boolean{
    // console.log(this.sessionService.getCurrentUser().userId);
    // console.log(this.exp.host.userId);
    // console.log(this.sessionService.getCurrentUser().userId == this.exp.host.userId);
    return this.sessionService.getCurrentUser().userId == this.exp.host.userId;
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm Delete?',
      message: 'Do you want to <strong>delete</strong> this?',
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
          handler: () => {
            this.delete();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm2() {
    const alert = await this.alertController.create({
      header: 'Confirm Book?',
      message: 'Do you want to <strong>book</strong> this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Book',
          handler: () => {
            this.book();
          }
        }
      ]
    });

    await alert.present();
  }


  async presentFollow() {
    const toast = await this.toastController.create({
      message: 'Experience Followed.',
      duration: 2000
    });
    toast.present();
  }

  followUser(){
    this.userService.follow(this.sessionService.getCurrentUser().userId, this.exp.host.userId).subscribe(
      response=>{this.presentUserFollow(); console.log("Follow success");},
      error=>{console.log("Follow failed");}
    )
  }

  async presentUserFollow() {
    const toast = await this.toastController.create({
      message: 'User Followed.',
      duration: 2000
    });
    toast.present();
  }
}
