import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface song {
  title: string;

  genre: string;
  cover_art: string;
  audio_path: string;
  artist_id: string;
  is_approved: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  public addSongs(song: song) {
    return this.http.post('api/add-song', song);
  }
}
