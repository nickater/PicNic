import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFoodFromEventComponent } from './delete-food-from-event.component';

describe('DeleteFoodFromEventComponent', () => {
  let component: DeleteFoodFromEventComponent;
  let fixture: ComponentFixture<DeleteFoodFromEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFoodFromEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFoodFromEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
