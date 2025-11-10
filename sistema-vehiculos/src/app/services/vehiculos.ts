import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehiculo } from '../vehiculo.model';
import { DataService } from './data';
import { ServicioMensajeService } from './servicio-mensaje';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private vehiculos: Vehiculo[] = [];
  private vehiculosSubject = new BehaviorSubject<Vehiculo[]>([]);

  private editingIndex$ = new BehaviorSubject<number>(-1);

  constructor(private dataService: DataService, private mensaje: ServicioMensajeService) {}

  getVehiculos(): Observable<Vehiculo[]> {
    return this.vehiculosSubject.asObservable();
  }

  getEditar(): Observable<number> {
    return this.editingIndex$.asObservable();
  }

  setEditarIndex(i: number) {
    this.editingIndex$.next(i);
  }

  setVehiculos(v: Vehiculo[] | null) {
    this.vehiculos = v ? v : [];
    this.vehiculosSubject.next(this.vehiculos.slice());
  }

  obtenerVehiculos(): Vehiculo[] {
    return this.vehiculos.slice();
  }

  getVehiculosIndex(i: number): Vehiculo | null {
    if (i >= 0 && i < this.vehiculos.length) {
      const v = this.vehiculos[i];
      return new Vehiculo(v.tipo, v.marca, v.modelo, v.color, v.precio);
    }
    return null;
  }

  cargarFirebase() { return this.dataService.cargarVehiculos(); }

  guardarFirebase() { return this.dataService.guardarVehiculos(this.vehiculos); }

  agregarVehiculo(vehiculo: Vehiculo) {
    this.vehiculos.push(vehiculo);
    this.vehiculosSubject.next(this.vehiculos.slice());
    this.guardarFirebase().subscribe(
      _ => this.mensaje.exito('Vehículo agregado correctamente'),
      err => {
        console.error(err);
        this.mensaje.error('Error al guardar vehículo');
      }
    );
  }

  actualizarVehiculo(indice: number, vehiculo: Vehiculo) {
    if (indice >= 0 && indice < this.vehiculos.length) {
      this.vehiculos[indice] = vehiculo;
      this.vehiculosSubject.next(this.vehiculos.slice());
      this.guardarFirebase().subscribe(
        _ => this.mensaje.exito('Vehículo actualizado'),
        err => {
          console.error(err);
          this.mensaje.error('Error al actualizar');
        }
      );
    } else {
      this.mensaje.error('Índice inválido para actualizar');
    }
  }

  eliminarVehiculo(indice: number) {
    if (indice >= 0 && indice < this.vehiculos.length) {
      this.vehiculos.splice(indice, 1);
      this.vehiculosSubject.next(this.vehiculos.slice());
      this.guardarFirebase().subscribe(
        _ => this.mensaje.exito('Vehículo eliminado'),
        err => {
          console.error(err);
          this.mensaje.error('Error al eliminar');
        }
      );
    } else {
      this.mensaje.error('Índice inválido para eliminar');
    }
  }
}
