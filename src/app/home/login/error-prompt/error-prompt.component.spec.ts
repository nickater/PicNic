import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPromptComponent } from './error-prompt.component';

describe('ErrorPromptComponent', () => {
  let component: ErrorPromptComponent;
  let fixture: ComponentFixture<ErrorPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
