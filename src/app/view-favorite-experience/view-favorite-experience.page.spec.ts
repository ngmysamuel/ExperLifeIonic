import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFavoriteExperiencePage } from './view-favorite-experience.page';

describe('ViewFavoriteExperiencePage', () => {
  let component: ViewFavoriteExperiencePage;
  let fixture: ComponentFixture<ViewFavoriteExperiencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFavoriteExperiencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFavoriteExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
