// src/app/vehiculos-lista-componente/vehiculos-lista-componente.ts
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
    // Suscribir a los cambios de la lista en el servicio
    this.sub = this.vehiculosService.getVehiculosObservable().subscribe((arr: Vehiculo[]) => {
      this.lista = arr;
      console.log('Lista actualizada (lista comp):', this.lista);
    });

    // Asegurar valor inicial (por si ya estaba cargado)
    this.lista = this.vehiculosService.obtenerVehiculos();
  }

  editar(indice: number) {
    this.vehiculosService.setEditingIndex(indice);
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
