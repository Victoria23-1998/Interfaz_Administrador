import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HistoryTravelComponent } from './history-travel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('HistoryTravelComponent', () => {
  let component: HistoryTravelComponent;
  let fixture: ComponentFixture<HistoryTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule ],
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
