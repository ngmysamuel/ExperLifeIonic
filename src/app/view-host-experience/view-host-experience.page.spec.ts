import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHostExperiencePage } from './view-host-experience.page';

describe('ViewHostExperiencePage', () => {
  let component: ViewHostExperiencePage;
  let fixture: ComponentFixture<ViewHostExperiencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHostExperiencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHostExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
