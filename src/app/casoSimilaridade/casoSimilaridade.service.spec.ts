import { TestBed } from '@angular/core/testing';

import { CategoriaService } from './casoSimilaridade.service';

describe('CategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriaService = TestBed.get(CategoriaService);
    expect(service).toBeTruthy();
  });
});
