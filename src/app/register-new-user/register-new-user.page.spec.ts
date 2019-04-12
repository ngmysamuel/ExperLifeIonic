import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewUserPage } from './register-new-user.page';

describe('RegisterNewUserPage', () => {
  let component: RegisterNewUserPage;
  let fixture: ComponentFixture<RegisterNewUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNewUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
