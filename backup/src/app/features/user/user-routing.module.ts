import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './bookings/bookings.component';
import { MusicLibraryComponent } from './music-library/music-library.component';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'profile', component: ProfileComponent },
      { path: 'mybookings', component: BookingsComponent },
      { path: 'songs', component: MusicLibraryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
