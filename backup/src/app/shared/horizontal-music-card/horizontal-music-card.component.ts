import { Component } from '@angular/core';

@Component({
  selector: 'app-horizontal-music-card',
  standalone: false,
  templateUrl: './horizontal-music-card.component.html',
  styleUrl: './horizontal-music-card.component.scss',
})
export class HorizontalMusicCardComponent {
  public isFavorite: boolean = false;
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
