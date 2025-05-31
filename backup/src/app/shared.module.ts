import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SongCardComponent } from './shared/song-card/song-card.component';
import { EqualizerCanvasComponent } from './shared/equalizer-canvas/equalizer-canvas.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SongCardComponent,
    EqualizerCanvasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
