import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewExperienceDatesPage } from './view-experience-dates.page';

const routes: Routes = [
  {
    path: '',
    component: ViewExperienceDatesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewExperienceDatesPage]
})
export class ViewExperienceDatesPageModule {}
