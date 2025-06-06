import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings',
  standalone: false,
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
  public events = [
    {
      ' id': 1,
      artistName: 'Durgesh Thapa',
      location: 'KTM',
      time: '8:00 PM',
      date: '2025-9-10',
    },
    {
      ' id': 2,
      artistName: 'Durgesh Thapa',
      location: 'KTM',
      time: '8:00 PM',
      date: '2025-9-10',
    },
  ];
}
