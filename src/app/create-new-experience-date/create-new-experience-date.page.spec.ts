import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewExperienceDatePage } from './create-new-experience-date.page';

describe('CreateNewExperienceDatePage', () => {
  let component: CreateNewExperienceDatePage;
  let fixture: ComponentFixture<CreateNewExperienceDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewExperienceDatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewExperienceDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
