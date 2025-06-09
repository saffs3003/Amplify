import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AudioSyncService } from '../../../core/services/audio-sync.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-music-library',
  standalone: false,
  templateUrl: './music-library.component.html',
  styleUrl: './music-library.component.scss',
})
export class MusicLibraryComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;

  private ctx!: CanvasRenderingContext2D;
  private audioContext!: AudioContext;
  private analyser!: AnalyserNode;
  private dataArray!: Uint8Array;
  private bars: any[] = [];
  public currentTimeSub!: Subscription;
  private durationSub!: Subscription;
  constructor(
    private audioService: AudioSyncService,
    private cdr: ChangeDetectorRef
  ) {}
  public songTime: number = 0;
  public currentTime: number = 0;
  ngAfterViewInit(): void {
    this.durationSub = this.audioService.songDuration$.subscribe((duration) => {
      this.songTime = duration;

      this.cdr.detectChanges();
    });

    this.currentTimeSub = this.audioService.currentTimeSubject$.subscribe((currentTime) => {
      this.currentTime = currentTime;

      this.cdr.detectChanges();
    });

    const canvas = this.canvasRef.nativeElement;
    const container = this.containerRef.nativeElement;
    this.songTime = this.audioService.songTime();
    console.log(`this is ${this.songTime}`);
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    this.ctx = canvas.getContext('2d')!;
    const audio = this.audioService.audio;

    if (!audio) {
      console.error('No audio element found in AudioSyncService');
      return;
    }

    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioSource = this.audioContext.createMediaElementSource(audio);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 512;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    audioSource.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    audio.addEventListener('play', () => {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    });

    class Bar {
      constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string,
        public index: number
      ) {}

      update(musicNodeValue: number) {
        const sound = musicNodeValue * 400;
        this.height = sound > this.height ? sound : this.height * 0.97;
      }

      draw(context: CanvasRenderingContext2D) {
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.save();
        context.translate(this.index, 0);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y + 10, this.width, -this.height);
        context.stroke();
        context.restore();
      }
    }

    for (let i = 1; i < this.analyser.frequencyBinCount; i += 4) {
      this.bars.push(new Bar(0 + i, 0, 4, 50, 'white', i));
    }

    this.animate();
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.analyser.getByteTimeDomainData(this.dataArray);
    const normSamples = [...this.dataArray].map((e) => e / 128 - 1);

    this.ctx.save();
    this.ctx.translate(canvas.width / 5, canvas.height / 2);

    this.bars.forEach((bar, i) => {
      bar.update(normSamples[i] || 0);
      bar.draw(this.ctx);
    });

    this.ctx.restore();
    requestAnimationFrame(this.animate);
  };
}
