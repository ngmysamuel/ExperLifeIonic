import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewHostExperiencePage } from './view-host-experience.page';

const routes: Routes = [
  {
    path: '',
    component: ViewHostExperiencePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewHostExperiencePage]
})
export class ViewHostExperiencePageModule {}
