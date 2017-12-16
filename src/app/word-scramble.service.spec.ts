import { TestBed, inject } from '@angular/core/testing';

import { WordScrambleService } from './word-scramble.service';

describe('WordScrambleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordScrambleService]
    });
  });

  it('should be created', inject([WordScrambleService], (service: WordScrambleService) => {
    expect(service).toBeTruthy();
  }));
});
