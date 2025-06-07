import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioSyncService {
  private _audio!: HTMLAudioElement;
  public songDuration: number = 7;
  private songDurationSubject = new BehaviorSubject<number>(0);
  songDuration$ = this.songDurationSubject.asObservable();

  private currentTimeSubject = new BehaviorSubject<number>(0);
  currentTimeSubject$ = this.currentTimeSubject.asObservable();

  setAudioElement(audio: HTMLAudioElement) {
    this._audio = audio;
    // this.songDuration = audio.duration;
    // console.log(`song duratiuon ${this.songDuration}`);
    audio.addEventListener('loadedmetadata', () => {
      this.songDurationSubject.next(audio.duration);
    });

    audio.addEventListener('timeupdate', (currentTime) => {
      this.currentTimeSubject.next(audio.currentTime);
    });
  }

  songTime(): number {
    return this.songDuration;
  }
  get audio(): HTMLAudioElement {
    return this._audio;
  }
}
