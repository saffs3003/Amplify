import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EventMonitorComponent } from './event-monitor/event-monitor.component';
import { SongMonitorComponent } from './song-monitor/song-monitor.component';

import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [AdminComponent, EventMonitorComponent, SongMonitorComponent, DashboardComponent],
  imports: [AdminRoutingModule, CommonModule, MatIcon, RouterLink],
  exports: [AdminComponent, EventMonitorComponent, SongMonitorComponent, DashboardComponent],
})
export class AdminModule {}
