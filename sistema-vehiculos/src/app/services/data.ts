import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../vehiculo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private urlBase = 'https://sistema-vehiculos-5f8ed-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  guardarVehiculos(vehiculos: Vehiculo[]): Observable<any> {
    return this.http.put(`${this.urlBase}/datos.json`, vehiculos);
  }

  cargarVehiculos(): Observable<Vehiculo[] | null> {
    return this.http.get<Vehiculo[] | null>(`${this.urlBase}/datos.json`);
  }

  actualizarVehiculo(indice: number, vehiculo: Vehiculo): Observable<any> {
    return this.http.put(`${this.urlBase}/datos/${indice}.json`, vehiculo);
  }

  borrarVehiculo(indice: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/datos/${indice}.json`);
  }
}
