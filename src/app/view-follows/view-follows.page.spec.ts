import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFollowsPage } from './view-follows.page';

describe('ViewFollowsPage', () => {
  let component: ViewFollowsPage;
  let fixture: ComponentFixture<ViewFollowsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFollowsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFollowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
