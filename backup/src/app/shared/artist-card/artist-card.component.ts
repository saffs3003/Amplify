import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-artist-card',
  standalone: false,
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.scss',
})
export class ArtistCardComponent {
  @Input() artistImg: string = '';
  @Input() artistName: string = '';
}
