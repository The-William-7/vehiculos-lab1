// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { VehiculosComponenteComponent } from './vehiculos-componente/vehiculos-componente';
import { VehiculosListaComponenteComponent } from './vehiculos-lista-componente/vehiculos-lista-componente';
import { VehiculosFormularioComponenteComponent } from './vehiculos-formulario-componente/vehiculos-formulario-componente';
import { VehiculosDetalleComponenteComponent } from './vehiculos-detalle-componente/vehiculos-detalle-componente';

export const routes: Routes = [
  { path: '', component: VehiculosComponenteComponent },
  { path: 'vehiculos', component: VehiculosComponenteComponent },
  { path: 'vehiculos/lista', component: VehiculosListaComponenteComponent },
  { path: 'vehiculos/formulario', component: VehiculosFormularioComponenteComponent },
  { path: 'vehiculos/:id', component: VehiculosDetalleComponenteComponent },
];
