import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { VentasComponent } from './ventas.component';
import { GastosRoutingModule } from './gastos-routing.module';
//primeng
import { ChartModule } from 'primeng/chart';
import { GastosComponent } from './gastos.component';



@NgModule({
  declarations: [
    GastosComponent
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    ChartModule
  ]
})
export class VentasModule { }
