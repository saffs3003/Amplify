import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  public songs = [
    {
      id: 1,
      name: 'Thousand years',

      img: 'assets/images/bg1.jpg',
      artist: 'Christina Perri',
    },
  ];

  public artists = [
    {
      name: 'Beebadobap',
      img: 'assets/images/1.jpg',
    },
  ];

  @ViewChild('userCard') userCard!: ElementRef;
  onMouseMove(event: MouseEvent) {
    const card = this.userCard.nativeElement;
    const cardBorder = card.getBoundingClientRect();

    const x = event.clientX - cardBorder.left;
    const y = event.clientY - cardBorder.top;
    const centerX = cardBorder.width / 2;
    const centerY = cardBorder.height / 2;

    const rotateX = ((y - centerY) / centerY) * 2;
    const rotateY = ((x - centerX) / centerX) * 2;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    console.log('changing');
  }
  resetTilt() {
    this.userCard.nativeElement.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
  }
}
