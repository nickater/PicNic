import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeasurementComponent } from './create-measurement.component';

describe('CreateMeasurementComponent', () => {
  let component: CreateMeasurementComponent;
  let fixture: ComponentFixture<CreateMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
