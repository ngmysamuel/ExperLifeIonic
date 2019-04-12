import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExperiencePage } from './update-experience.page';

describe('UpdateExperiencePage', () => {
  let component: UpdateExperiencePage;
  let fixture: ComponentFixture<UpdateExperiencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateExperiencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
