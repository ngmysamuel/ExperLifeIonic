import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccessRightErrorPage } from './access-right-error.page';

const routes: Routes = [
  {
    path: '',
    component: AccessRightErrorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccessRightErrorPage]
})
export class AccessRightErrorPageModule {}
