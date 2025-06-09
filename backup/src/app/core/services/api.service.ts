import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface song {
  title: string;

  genre: string;
  coverArt: string;
  audioPath: string;
  artistId: string;
  isApproved: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  public addSongs(song: any) {
    console.log('song added');
    return this.http.post(`${this.apiUrl}/add-songs`, song);
  }

  getUnapprovedSongs() {
    return this.http.get<any[]>(`${this.apiUrl}/unapproved-songs`);
  }

  approveSong(songId: number) {
    return this.http.post(`${this.apiUrl}/approve-song/${songId}`, {});
  }
}
