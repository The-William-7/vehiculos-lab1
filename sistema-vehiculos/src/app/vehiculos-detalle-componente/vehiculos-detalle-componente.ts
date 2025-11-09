import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculosService } from '../services/vehiculos';
import { Vehiculo } from '../vehiculo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehiculos-detalle-componente',
  templateUrl: './vehiculos-detalle-componente.html',
  styleUrls: ['./vehiculos-detalle-componente.css'],
  imports: [CommonModule, FormsModule]
})
export class VehiculosDetalleComponenteComponent implements OnInit {
  vehiculo: Vehiculo | null = null;
  indice = -1;

  constructor(private route: ActivatedRoute, private vehiculosService: VehiculosService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const idx = parseInt(id, 10);
      this.indice = isNaN(idx) ? -1 : idx;
      this.vehiculo = this.vehiculosService.getVehiculoByIndex(this.indice);
    });
  }
}
