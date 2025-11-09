// src/app/vehiculo.model.ts
export class Vehiculo {
  tipo: string;
  marca: string;
  modelo: string;
  color: string;
  precio: number;

  constructor(tipo = '', marca = '', modelo = '', color = '', precio = 0) {
    this.tipo = tipo;
    this.marca = marca;
    this.modelo = modelo;
    this.color = color;
    this.precio = precio;
  }
}
