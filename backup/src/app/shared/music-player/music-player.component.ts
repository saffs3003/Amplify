// music-player.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioSyncService } from '../../core/services/audio-sync.service';

interface Song {
  title: string;
  artist: string;
  audioUrl: string;
  imageUrl: string;
}

@Component({
  selector: 'app-music-player',
  standalone: false,
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss',
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  constructor(private audioService: AudioSyncService) {}
  audio!: HTMLAudioElement;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 1;
  currentSongIndex = 0;
  isFavorite = false;

  playlist: Song[] = [
    {
      title: 'Sample Song',
      artist: 'Sample Artist',
      audioUrl: '../../../../assets/audio/consoleSound.mp3',
      imageUrl: '../../../../assets/images/bg1.jpg',
    },
    {
      title: 'Sample Song 2',
      artist: 'Sample Artist 2',
      audioUrl: '../../../../assets/audio/interstellar.mp3',
      imageUrl: '../../../../assets/images/bg2.jpg',
    },
  ];

  get currentSong(): Song {
    return this.playlist[this.currentSongIndex];
  }

  ngOnInit() {
    this.audio = new Audio();
    this.audioService.setAudioElement(this.audio);
    this.loadCurrentSong();
    this.setupAudioEventListeners();
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  private setupAudioEventListeners() {
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
    });

    this.audio.addEventListener('ended', () => {
      this.nextSong();
    });

    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
    });
  }

  private loadCurrentSong() {
    if (this.currentSong) {
      this.audio.src = this.currentSong.audioUrl;
      this.audio.load();
    }
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch((error) => {
        console.error('Error playing audio:', error);
      });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  previousSong() {
    this.currentSongIndex =
      this.currentSongIndex > 0 ? this.currentSongIndex - 1 : this.playlist.length - 1;
    this.loadCurrentSong();
    if (this.isPlaying) {
      this.play();
    }
  }

  nextSong() {
    this.currentSongIndex =
      this.currentSongIndex < this.playlist.length - 1 ? this.currentSongIndex + 1 : 0;
    this.loadCurrentSong();
    if (this.isPlaying) {
      this.play();
    }
  }

  setVolume(event: Event) {
    const target = event.target as HTMLInputElement;
    this.volume = parseFloat(target.value);
    this.audio.volume = this.volume;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  // seekTo(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   const seekTime = (parseFloat(target.value) / 100) * this.duration;
  //   this.audio.currentTime = seekTime;
  // }

  // getProgressPercentage(): number {
  //   return this.duration ? (this.currentTime / this.duration) * 100 : 0;
  // }

  // formatTime(time: number): string {
  //   if (isNaN(time)) return '0:00';

  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60);
  //   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  // }
}
