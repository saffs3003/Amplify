import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public ArtistInfo = [
    {
      imgUrl: '../../../../assets/images/billie-eilish-tout.jpg',
      name: 'Billie Eillish',
      noOfSongs: '20',
    },
  ];

  public imageUrl = '../../../../assets/images/billie-eilish-tout.jpg';
}
