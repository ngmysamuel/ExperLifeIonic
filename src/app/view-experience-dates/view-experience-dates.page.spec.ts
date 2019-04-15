import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExperienceDatesPage } from './view-experience-dates.page';

describe('ViewExperienceDatesPage', () => {
  let component: ViewExperienceDatesPage;
  let fixture: ComponentFixture<ViewExperienceDatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExperienceDatesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExperienceDatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
