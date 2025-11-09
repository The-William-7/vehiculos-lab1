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
      this.vehiculosService.setVehiculos(res);
      this.refrescarLista();
    }, err => {
      console.error('Error al cargar desde Firebase', err);
      this.vehiculosService.setVehiculos([]);
      this.refrescarLista();
    });
  }

  refrescarLista() {
    this.listaVehiculos = this.vehiculosService.obtenerVehiculos();
  }
}
