import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateExperiencePage } from './evaluate-experience.page';

describe('EvaluateExperiencePage', () => {
  let component: EvaluateExperiencePage;
  let fixture: ComponentFixture<EvaluateExperiencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateExperiencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
