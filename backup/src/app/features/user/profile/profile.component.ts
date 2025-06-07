import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  public musicCards = [{ id: 1 }, { id: 1 }, { id: 1 }];
}
