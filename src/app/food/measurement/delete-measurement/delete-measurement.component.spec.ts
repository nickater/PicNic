import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMeasurementComponent } from './delete-measurement.component';

describe('DeleteMeasurementComponent', () => {
  let component: DeleteMeasurementComponent;
  let fixture: ComponentFixture<DeleteMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
