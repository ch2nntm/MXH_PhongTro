import { TestBed } from '@angular/core/testing';

import { AccountUserService } from './account-user.service';

describe('AccountUserService', () => {
  let service: AccountUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
