import { TestBed } from '@angular/core/testing';

import { ReportGenerationService } from './report-generation.service';

describe('ReportGenerationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportGenerationService = TestBed.get(ReportGenerationService);
    expect(service).toBeTruthy();
  });
});
