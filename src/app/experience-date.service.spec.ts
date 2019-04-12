import { TestBed } from '@angular/core/testing';

import { ExperienceDateService } from './experience-date.service';

describe('ExperienceDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExperienceDateService = TestBed.get(ExperienceDateService);
    expect(service).toBeTruthy();
  });
});
