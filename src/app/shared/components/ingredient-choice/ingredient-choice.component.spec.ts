import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientChoiceComponent } from './ingredient-choice.component';

describe('IngredientChoiceComponent', () => {
  let component: IngredientChoiceComponent;
  let fixture: ComponentFixture<IngredientChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
