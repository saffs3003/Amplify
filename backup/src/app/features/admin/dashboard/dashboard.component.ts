import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  unapprovedSongs: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUnapprovedSongs();
  }

  loadUnapprovedSongs() {
    this.apiService.getUnapprovedSongs().subscribe((songs) => {
      this.unapprovedSongs = songs;
    });
  }

  approve(songId: number) {
    this.apiService.approveSong(songId).subscribe(() => {
      console.log(`approval sent for songId ${songId}`);
      this.loadUnapprovedSongs();
    });
  }
}
