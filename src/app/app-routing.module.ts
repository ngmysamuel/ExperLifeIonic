import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/lista',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'lista',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'create-experience', loadChildren: './create-experience/create-experience.module#CreateExperiencePageModule',canActivate: [AuthGuardService]},
  { path: 'view-host-experience', loadChildren: './view-host-experience/view-host-experience.module#ViewHostExperiencePageModule',canActivate: [AuthGuardService] },
  { path: 'experience-details/:id', loadChildren: './experience-details/experience-details.module#ExperienceDetailsPageModule',canActivate: [AuthGuardService] },
  { path: 'update-experience/:id', loadChildren: './update-experience/update-experience.module#UpdateExperiencePageModule',canActivate: [AuthGuardService]},
  { path: 'accessRightError', loadChildren: './access-right-error/access-right-error.module#AccessRightErrorPageModule'},
  { path: 'register-new-user', loadChildren: './register-new-user/register-new-user.module#RegisterNewUserPageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home/:username', loadChildren: './home/home.module#HomePageModule'},
  { path: 'create-new-experience-date/:id', loadChildren: './create-new-experience-date/create-new-experience-date.module#CreateNewExperienceDatePageModule',canActivate: [AuthGuardService]  },
  { path: 'confirm-booking/:expDateId', loadChildren: './confirm-booking/confirm-booking.module#ConfirmBookingPageModule',canActivate: [AuthGuardService]  },
  { path: 'view-booking', loadChildren: './view-booking/view-booking.module#ViewBookingPageModule',canActivate: [AuthGuardService]  },
  { path: 'view-experience-dates/:id', loadChildren: './view-experience-dates/view-experience-dates.module#ViewExperienceDatesPageModule',canActivate: [AuthGuardService]  },
  { path: 'booking-details/:id', loadChildren: './booking-details/booking-details.module#BookingDetailsPageModule',canActivate: [AuthGuardService]  },
  { path: 'update-booking/:id', loadChildren: './update-booking/update-booking.module#UpdateBookingPageModule',canActivate: [AuthGuardService]  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule',canActivate: [AuthGuardService]  },
  { path: 'guest-list/:id', loadChildren: './guest-list/guest-list.module#GuestListPageModule',canActivate: [AuthGuardService]  },
  { path: 'evaluate-guest/:bookingId/:guestId', loadChildren: './evaluate-guest/evaluate-guest.module#EvaluateGuestPageModule',canActivate: [AuthGuardService]  },
  { path: 'view-favorite-experience', loadChildren: './view-favorite-experience/view-favorite-experience.module#ViewFavoriteExperiencePageModule',canActivate: [AuthGuardService]  },
  { path: 'evaluate-experience/:id', loadChildren: './evaluate-experience/evaluate-experience.module#EvaluateExperiencePageModule' },
  { path: 'view-notifications', loadChildren: './view-notifications/view-notifications.module#ViewNotificationsPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
