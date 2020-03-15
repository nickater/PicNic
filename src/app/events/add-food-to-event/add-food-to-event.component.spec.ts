import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodToEventComponent } from './add-food-to-event.component';

describe('AddFoodToEventComponent', () => {
  let component: AddFoodToEventComponent;
  let fixture: ComponentFixture<AddFoodToEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFoodToEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodToEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
