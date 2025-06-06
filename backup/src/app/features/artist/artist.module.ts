import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { EventsComponent } from './events/events.component';
import { SidebarModule } from '../../shared/sidebar/sidebar.module';

@NgModule({
  declarations: [ArtistComponent, DashboardComponent, EventsComponent],
  imports: [CommonModule, ArtistRoutingModule, SharedModule, SidebarModule],
})
export class ArtistModule {}
