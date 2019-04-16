import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateGuestPage } from './evaluate-guest.page';

describe('EvaluateGuestPage', () => {
  let component: EvaluateGuestPage;
  let fixture: ComponentFixture<EvaluateGuestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateGuestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateGuestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
