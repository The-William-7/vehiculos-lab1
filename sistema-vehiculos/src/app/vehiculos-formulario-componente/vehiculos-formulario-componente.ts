import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Vehiculo } from '../vehiculo.model';
import { VehiculosService } from '../services/vehiculos';
import { ServicioMensajeService } from '../services/servicio-mensaje';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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

  loading = false;

  private sub?: Subscription;

  constructor(
    private vehiculosService: VehiculosService,
    private mensaje: ServicioMensajeService
  ) {}

  ngOnInit(): void {
    // Escuchar índice de edición
    this.sub = this.vehiculosService.getEditingIndexObservable().subscribe((i: number) => {
      if (i >= 0) {
        const v = this.vehiculosService.getVehiculoByIndex(i);
        if (v) {
          this.modeloVehiculo = v;
          this.modoEdicion = true;
          this.indiceEdicion = i;
        } else {
          // índice inválido: limpiar
          this.limpiarFormulario();
        }
      } else {
        this.limpiarFormulario();
      }
    });
  }

  guardarVehiculo() {
    // Validación (SweetAlert en lugar de this.mensaje.mostrar)
    if (!this.modeloVehiculo.tipo || !this.modeloVehiculo.marca || !this.modeloVehiculo.modelo) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Complete Tipo, Marca y Modelo (mínimo).',
        confirmButtonText: 'Entendido',
        timer: 2000
      });
      return;
    }

    this.loading = true;

    if (this.modoEdicion) {
      // Llamada al service (manteniendo tu lógica actual)
      this.vehiculosService.actualizarVehiculo(this.indiceEdicion, this.modeloVehiculo);

      // Toast pequeño de éxito (no bloqueante)
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Vehículo actualizado',
        showConfirmButton: false,
        timer: 1200
      });

    } else {
      // Agregar con tu servicio actual
      this.vehiculosService.agregarVehiculo(this.modeloVehiculo);

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Vehículo agregado',
        showConfirmButton: false,
        timer: 1200
      });
    }

    // Esperar al toast (1.2s) y recargar desde Firebase; normalizar resultado
    setTimeout(() => {
      this.vehiculosService.cargarDesdeFirebase().subscribe({
        next: (res: any) => {
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
          arr = arr.filter((it: any) => it != null);

          this.vehiculosService.setVehiculos(arr);

          // limpiar estado visual
          this.limpiarFormulario();
          this.vehiculosService.setEditingIndex(-1);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error recargando desde Firebase:', err);
          this.mensaje.error('No se pudo actualizar la lista. Intente de nuevo.');
          this.limpiarFormulario();
          this.vehiculosService.setEditingIndex(-1);
          this.loading = false;
        }
      });
    }, 1200);
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