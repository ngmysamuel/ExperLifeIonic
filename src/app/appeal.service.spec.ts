import { TestBed } from '@angular/core/testing';

import { AppealService } from './appeal.service';

describe('AppealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppealService = TestBed.get(AppealService);
    expect(service).toBeTruthy();
  });
});
