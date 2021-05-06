import { TestBed } from '@angular/core/testing';

import { CasoSimilaridadeService } from './casoSimilaridade.service';

describe('CategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CasoSimilaridadeService = TestBed.get(CasoSimilaridadeService);
    expect(service).toBeTruthy();
  });
});
