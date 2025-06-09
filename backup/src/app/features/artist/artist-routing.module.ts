import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './artist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistComponent,
    data: { roles: ['Artist'] },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { roles: ['Artist'] },
      },
      {
        path: 'events',
        component: EventsComponent,
        data: { roles: ['Artist'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
