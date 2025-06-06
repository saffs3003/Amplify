import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SongCardComponent } from './song-card/song-card.component';
import { EqualizerCanvasComponent } from './equalizer-canvas/equalizer-canvas.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { HorizontalMusicCardComponent } from './horizontal-music-card/horizontal-music-card.component';
import { MatIcon } from '@angular/material/icon';
import { MusicPlayerComponent } from './music-player/music-player.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SongCardComponent,
    EqualizerCanvasComponent,
    ArtistCardComponent,
    HorizontalMusicCardComponent,
    MusicPlayerComponent,
    MusicPlayerComponent,
  ],
  imports: [CommonModule, MatIcon],
  exports: [
    NavbarComponent,
    SongCardComponent,
    EqualizerCanvasComponent,
    HorizontalMusicCardComponent,
    ArtistCardComponent,
    MusicPlayerComponent,
  ],
})
export class SharedModule {}
