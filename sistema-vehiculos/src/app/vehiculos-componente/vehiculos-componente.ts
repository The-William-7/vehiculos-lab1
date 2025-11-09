import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo.model';
import { VehiculosService } from '../services/vehiculos';
import { VehiculosListaComponenteComponent } from "../vehiculos-lista-componente/vehiculos-lista-componente";
import { VehiculosFormularioComponenteComponent } from "../vehiculos-formulario-componente/vehiculos-formulario-componente";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehiculos-componente',
  templateUrl: './vehiculos-componente.html',
  styleUrls: ['./vehiculos-componente.css'],
  imports: [VehiculosListaComponenteComponent, VehiculosFormularioComponenteComponent, CommonModule, FormsModule],
})
export class VehiculosComponenteComponent implements OnInit {
  listaVehiculos: Vehiculo[] = [];

  constructor(private vehiculosService: VehiculosService) {}

  ngOnInit(): void {
    this.vehiculosService.cargarDesdeFirebase().subscribe((res: any) => {
      console.log('Respuesta raw de Firebase:', res);

      let arr: any[] = [];
      if (res == null) {
        arr = [];
      } else if (Array.isArray(res)) {
        arr = res;
      } else if (typeof res === 'object') {
        arr = Object.values(res);
      } else {
        arr = [];
      }
      
      arr = arr.filter(item => item != null);

      this.vehiculosService.setVehiculos(arr);
      this.refrescarLista();
      console.log('Lista normalizada:', arr);
    }, err => {
      console.error('Error cargando vehiculos', err);
      this.vehiculosService.setVehiculos([]);
      this.refrescarLista();
    });
  }

  refrescarLista() {
    this.listaVehiculos = this.vehiculosService.obtenerVehiculos();
  }
}
