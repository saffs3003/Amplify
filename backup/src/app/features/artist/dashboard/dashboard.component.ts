import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AddSongComponent } from '../add-song/add-song.component';
import { AddEventComponent } from '../add-event/add-event.component';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public ArtistInfo = [
    {
      imgUrl: '../../../../assets/images/billie-eilish-tout.jpg',
      name: 'Billie Eillish',
      noOfSongs: '20',
    },
  ];

  public imageUrl = '../../../../assets/images/billie-eilish-tout.jpg';

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(AddSongComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openEventDialog() {
    const dialogRef = this.dialog.open(AddEventComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
