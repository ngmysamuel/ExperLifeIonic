import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRightErrorPage } from './access-right-error.page';

describe('AccessRightErrorPage', () => {
  let component: AccessRightErrorPage;
  let fixture: ComponentFixture<AccessRightErrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessRightErrorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessRightErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
