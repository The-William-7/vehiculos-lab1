import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosListaComponente } from './vehiculos-lista-componente';

describe('VehiculosListaComponente', () => {
  let component: VehiculosListaComponente;
  let fixture: ComponentFixture<VehiculosListaComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosListaComponente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosListaComponente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
