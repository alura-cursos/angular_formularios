import { TestBed } from '@angular/core/testing';

import { UsuarioExisteService } from './usuario-existe.service';

describe('UsuarioExisteService', () => {
  let service: UsuarioExisteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioExisteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
