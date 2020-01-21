import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMeasurementComponent } from './update-measurement.component';

describe('UpdateMeasurementComponent', () => {
  let component: UpdateMeasurementComponent;
  let fixture: ComponentFixture<UpdateMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
