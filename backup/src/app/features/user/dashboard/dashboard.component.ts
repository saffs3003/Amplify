import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public songs = [
    {
      id: 1,
      name: 'Thousand years',

      img: 'assets/images/bg1.jpg',
      artist: 'Christina Perri',
    },
    {
      id: 1,
      name: 'Thousand years',

      img: 'assets/images/bg1.jpg',
      artist: 'Christina Perri',
    },
    {
      id: 1,
      name: 'Thousand years',

      img: 'assets/images/bg1.jpg',
      artist: 'Christina Perri',
    },
  ];

  public artists = [
    {
      name: 'Beebadobap',
      img: 'assets/images/1.jpg',
    },
    {
      name: 'Beebadobap',
      img: 'assets/images/1.jpg',
    },
    {
      name: 'Beebadobap',
      img: 'assets/images/1.jpg',
    },
  ];
}
