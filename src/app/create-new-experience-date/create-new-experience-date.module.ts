import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateNewExperienceDatePage } from './create-new-experience-date.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewExperienceDatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateNewExperienceDatePage]
})
export class CreateNewExperienceDatePageModule {}
