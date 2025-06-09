import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  public routes = [
    { link: 'dashboard', icon: 'home', text: 'home' },
    { link: 'events', icon: 'confirmation_number', text: 'Event Approval' },
    { link: 'songs', icon: 'library_music', text: 'Artist Approval' },
  ];
}
