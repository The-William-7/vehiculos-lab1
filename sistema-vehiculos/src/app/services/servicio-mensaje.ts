import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServicioMensajeService {
  mostrar(msg: string) {
    Swal.fire('Información', msg, 'info');
  }

  exito(msg: string) {
    Swal.fire('Éxito', msg, 'success');
  }

  error(msg: string) {
    Swal.fire('Error', msg, 'error');
  }

  confirmar(titulo: string, texto: string) {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });
  }
}
