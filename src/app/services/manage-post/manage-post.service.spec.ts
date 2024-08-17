import { TestBed } from '@angular/core/testing';

import { ManagePostService } from './manage-post.service';

describe('ManagePostService', () => {
  let service: ManagePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
