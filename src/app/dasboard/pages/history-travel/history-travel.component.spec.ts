import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTravelComponent } from './history-travel.component';

describe('HistoryTravelComponent', () => {
  let component: HistoryTravelComponent;
  let fixture: ComponentFixture<HistoryTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
