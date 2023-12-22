import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas.component';
import { VentasRoutingModule } from './ventas-routing.module';
//primeng
import { ChartModule } from 'primeng/chart';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    VentasComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    NgChartsModule
  ]
})
export class VentasModule { }
