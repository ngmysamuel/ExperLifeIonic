import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExperiencePage } from './create-experience.page';

describe('CreateExperiencePage', () => {
  let component: CreateExperiencePage;
  let fixture: ComponentFixture<CreateExperiencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExperiencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
