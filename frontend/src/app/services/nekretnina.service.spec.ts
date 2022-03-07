import { TestBed } from '@angular/core/testing';

import { NekretninaService } from './nekretnina.service';

describe('NekretninaService', () => {
  let service: NekretninaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NekretninaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
