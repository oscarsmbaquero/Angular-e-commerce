//import { VentasComponent } from './ventas.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGastosComponent } from './anadirGasto/anadirGastos.component';
import { GastosComponent } from './gastos.component';
import { VerGastosComponent } from './ver-gastos/ver-gastos.component';

const routes: Routes = [
  {
    path: "",
    component: GastosComponent
  },
  // {
  //   path: "addIssue",
  //   component: AddGastosComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GastosRoutingModule { }