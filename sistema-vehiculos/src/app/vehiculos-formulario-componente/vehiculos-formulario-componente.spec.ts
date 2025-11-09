import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosFormularioComponente } from './vehiculos-formulario-componente';

describe('VehiculosFormularioComponente', () => {
  let component: VehiculosFormularioComponente;
  let fixture: ComponentFixture<VehiculosFormularioComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosFormularioComponente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosFormularioComponente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
