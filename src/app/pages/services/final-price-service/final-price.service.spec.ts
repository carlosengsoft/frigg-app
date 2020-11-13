import { FinalPriceService } from './final-price.service';
import { TestBed } from '@angular/core/testing';


describe('FinalPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinalPriceService = TestBed.get(FinalPriceService);
    expect(service).toBeTruthy();
  });
});
