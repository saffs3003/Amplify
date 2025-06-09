import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MusicLibraryComponent } from './music-library/music-library.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { SidebarModule } from '../../shared/sidebar/sidebar.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    MusicLibraryComponent,
    PlaylistComponent,
    BookingsComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, SidebarModule, MatIconModule],
})
export class UserModule {}
