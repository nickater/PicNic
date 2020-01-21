import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMeasurementsComponent } from './list-measurements.component';

describe('ListMeasurementsComponent', () => {
  let component: ListMeasurementsComponent;
  let fixture: ComponentFixture<ListMeasurementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMeasurementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
