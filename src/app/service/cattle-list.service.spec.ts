import { TestBed } from '@angular/core/testing';

import { CattleListService } from './cattle-list.service';

describe('CattleListService', () => {
  let service: CattleListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattleListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
