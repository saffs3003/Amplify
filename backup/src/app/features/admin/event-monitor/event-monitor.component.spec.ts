import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMonitorComponent } from './event-monitor.component';

describe('EventMonitorComponent', () => {
  let component: EventMonitorComponent;
  let fixture: ComponentFixture<EventMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventMonitorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
