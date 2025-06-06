import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-song-card',
  standalone: false,
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
})
export class SongCardComponent {
  @Input() songTitle: string = '';
  @Input() songImg: string = '';
  @Input() songArtist: string = '';
}
