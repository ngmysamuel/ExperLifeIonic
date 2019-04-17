import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewFavoriteExperiencePage } from './view-favorite-experience.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFavoriteExperiencePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewFavoriteExperiencePage]
})
export class ViewFavoriteExperiencePageModule {}
