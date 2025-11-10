import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VehiculosService } from '../services/vehiculos';
import { ServicioMensajeService } from '../services/servicio-mensaje';
import { Vehiculo } from '../vehiculo.model';

@Component({
  selector: 'app-vehiculos-lista-componente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehiculos-lista-componente.html',
  styleUrls: ['./vehiculos-lista-componente.css']
})
export class VehiculosListaComponenteComponent implements OnInit, OnDestroy {
  lista: Vehiculo[] = [];
  private sub?: Subscription;

  constructor(private vehiculosService: VehiculosService, private mensaje: ServicioMensajeService) {}

  ngOnInit(): void {
    this.sub = this.vehiculosService.getVehiculos().subscribe((arr: Vehiculo[]) => {
      this.lista = arr;
    });
    this.lista = this.vehiculosService.obtenerVehiculos();
  }

  editar(indice: number) {
    this.vehiculosService.setEditarIndex(indice);
  }

  eliminar(indice: number) {
    this.mensaje.confirmar('Eliminar vehículo', '¿Seguro que desea eliminar este vehículo?')
      .then(res => {
        if ((res as any).isConfirmed) {
          this.vehiculosService.eliminarVehiculo(indice);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
