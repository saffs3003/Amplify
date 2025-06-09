import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongMonitorComponent } from './song-monitor.component';

describe('SongMonitorComponent', () => {
  let component: SongMonitorComponent;
  let fixture: ComponentFixture<SongMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongMonitorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SongMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
