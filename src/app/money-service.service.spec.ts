import { TestBed } from '@angular/core/testing';

import { MoneyServiceService } from './money-service.service';

describe('MoneyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoneyServiceService = TestBed.get(MoneyServiceService);
    expect(service).toBeTruthy();
  });
});
