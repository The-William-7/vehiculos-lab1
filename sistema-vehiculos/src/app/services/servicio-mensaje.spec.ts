import { TestBed } from '@angular/core/testing';

import { ServicioMensaje } from './servicio-mensaje';

describe('ServicioMensaje', () => {
  let service: ServicioMensaje;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioMensaje);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
