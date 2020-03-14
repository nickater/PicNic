import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIngredientsComponent } from './update-ingredients.component';

describe('UpdateIngredientsComponent', () => {
  let component: UpdateIngredientsComponent;
  let fixture: ComponentFixture<UpdateIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
