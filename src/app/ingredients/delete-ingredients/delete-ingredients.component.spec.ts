import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIngredientsComponent } from './delete-ingredients.component';

describe('DeleteIngredientsComponent', () => {
  let component: DeleteIngredientsComponent;
  let fixture: ComponentFixture<DeleteIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
