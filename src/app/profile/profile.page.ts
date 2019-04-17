import { Component, OnInit } from '@angular/core';
import {SessionService} from '../session.service';
import {User} from '../user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  email: string;
  phoneNumber: string;
  selfDescription: string;
  premium: boolean;

  user: User;

  editUsername: boolean;
  editFirstName: boolean;
  editLastName: boolean;
  editEmail: boolean;
  editPhoneNumber: boolean;
  editSelfDescription: boolean;
  editGender: boolean;
  editBirthDate: boolean;

  constructor(private sessionService: SessionService, private userService:UserService, private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.user = this.sessionService.getCurrentUser();
    this.username = this.user.username;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
    this.phoneNumber = this.user.phoneNumber;
    this.selfDescription = this.user.selfIntro;
    this.birthDate = this.user.birthday;
    this.gender = this.user.gender;
    this.premium = this.user.premium;
    this.editUsername = false;
    this.editFirstName = false;
    this.editLastName = false;
    this.editEmail = false;
    this.editPhoneNumber = false;
    this.editSelfDescription = false;
    this.editGender = false;
    this.editBirthDate = false;
  }

  toggleEditUsername() {
    this.editUsername = !this.editUsername;
  }
  toggleEditFirstName() {
    this.editFirstName = !this.editFirstName;
  }
  toggleEditLastName() {
    this.editLastName = !this.editLastName;
  }
  toggleEditEmail() {
    this.editEmail = !this.editEmail;
  }
  toggleEditPhoneNumber() {
    this.editPhoneNumber = !this.editPhoneNumber;
  }
  toggleEditSelfDescription() {
    this.editSelfDescription = !this.editSelfDescription;
  }
  toggleEditGender() {
    this.editGender = !this.editGender;
  }
  toggleEditBirthDate() {
    this.editBirthDate = !this.editBirthDate;
  }

  upgrade(){
    this.presentAlertConfirm2();
  }
  downgrade(){
    this.presentAlertConfirm3();
  }


  update(){
    this.user.username = this.username;
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.email= this.email;
    this.user.phoneNumber = this.phoneNumber;
    this.user.selfIntro = this.selfDescription;
    this.user.gender = this.gender;
    this.user.birthday = this.birthDate;
    this.user.premium = this.premium;
    console.log(this.user.username);
    this.userService.updateUser(this.user).subscribe(
      response=>{console.log(response);this.sessionService.setCurrentUser(response);this.router.navigate(['/home']);},
      error=>{console.log(error)}
    )
  }


  async presentAlertConfirm2() {
    const alert = await this.alertController.create({
      header: 'Confirm Upgrade?',
      message: 'Do you want to <strong>upgrade</strong>?',
      buttons: [
        {
          text: 'Oops',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Upgrade!',
          handler: () => {
            this.premium = true;
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertConfirm3() {
    const alert = await this.alertController.create({
      header: 'Confirm downgrade?',
      message: 'Do you want to <strong>downgrade</strong>?',
      buttons: [
        {
          text: 'Oops',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Downgrade',
          handler: () => {
            this.premium = false;
          }
        }
      ]
    });
    await alert.present();
  }

}
