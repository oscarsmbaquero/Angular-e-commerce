import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopVentasRoutingModule } from './top-ventas-routing.module';
import { TopVentasComponent } from './top-ventas.component';
//primeng
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [TopVentasComponent],
  imports: [
    CommonModule,
    TopVentasRoutingModule,
    NgChartsModule
  ]
})
export class TopVentasModule { }
