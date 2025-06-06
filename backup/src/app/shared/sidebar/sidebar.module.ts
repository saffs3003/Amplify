import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; // Import MatListModule for list items in the sidebar
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule for the toolbar
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule for icons
import { SidebarComponent } from './sidebar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    RouterLink,
    RouterOutlet,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
