import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorSummaryComponent } from './sensor-summary.component';

describe('SensorSummaryComponent', () => {
  let component: SensorSummaryComponent;
  let fixture: ComponentFixture<SensorSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SensorSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
