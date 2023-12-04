//import { VentasComponent } from './ventas.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GastosComponent } from './gastos.component';

const routes: Routes = [
  {
    path: "",
    component:GastosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GastosRoutingModule { }