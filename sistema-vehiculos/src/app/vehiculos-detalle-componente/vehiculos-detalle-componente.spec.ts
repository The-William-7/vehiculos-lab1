import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosDetalleComponente } from './vehiculos-detalle-componente';

describe('VehiculosDetalleComponente', () => {
  let component: VehiculosDetalleComponente;
  let fixture: ComponentFixture<VehiculosDetalleComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosDetalleComponente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosDetalleComponente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
