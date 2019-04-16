import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvaluateGuestPage } from './evaluate-guest.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluateGuestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvaluateGuestPage]
})
export class EvaluateGuestPageModule {}
