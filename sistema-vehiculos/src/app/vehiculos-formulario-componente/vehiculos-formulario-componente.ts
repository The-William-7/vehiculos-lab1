import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Vehiculo } from '../vehiculo.model';
import { VehiculosService } from '../services/vehiculos';
import { ServicioMensajeService } from '../services/servicio-mensaje';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehiculos-formulario-componente',
  templateUrl: './vehiculos-formulario-componente.html',
  styleUrls: ['./vehiculos-formulario-componente.css'],
  imports: [CommonModule, FormsModule]
})
export class VehiculosFormularioComponenteComponent implements OnInit, OnDestroy {
  @ViewChild('vehForm') vehForm!: NgForm;

  modeloVehiculo: Vehiculo = new Vehiculo();
  modoEdicion = false;
  indiceEdicion = -1;

  private sub?: Subscription;

  constructor(private vehiculosService: VehiculosService, private mensaje: ServicioMensajeService) {}

  ngOnInit(): void {
    this.sub = this.vehiculosService.getEditingIndexObservable().subscribe(i => {
      if (i >= 0) {
        const v = this.vehiculosService.getVehiculoByIndex(i);
        if (v) {
          this.modeloVehiculo = v;
          this.modoEdicion = true;
          this.indiceEdicion = i;
        }
      } else {
        this.limpiarFormulario();
      }
    });
  }

  guardarVehiculo() {
    if (!this.modeloVehiculo.tipo || !this.modeloVehiculo.marca || !this.modeloVehiculo.modelo) {
      this.mensaje.mostrar('Complete Tipo, Marca y Modelo (mínimo).');
      return;
    }

    if (this.modoEdicion) {
      this.vehiculosService.actualizarVehiculo(this.indiceEdicion, this.modeloVehiculo);
    } else {
      this.vehiculosService.agregarVehiculo(this.modeloVehiculo);
    }

    this.limpiarFormulario();
    this.vehiculosService.setEditingIndex(-1);
  }

  limpiarFormulario() {
    if (this.vehForm) this.vehForm.resetForm();
    this.modeloVehiculo = new Vehiculo();
    this.modoEdicion = false;
    this.indiceEdicion = -1;
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
