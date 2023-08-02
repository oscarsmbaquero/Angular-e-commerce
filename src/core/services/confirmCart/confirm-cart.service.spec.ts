import { TestBed } from '@angular/core/testing';

import { ConfirmCartService } from './confirm-cart.service';

describe('ConfirmCartService', () => {
  let service: ConfirmCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
