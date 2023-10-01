import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './orders/order.component';
import { ClientRoutingModule } from './order-routing.module';

//primeng
import { PanelModule } from 'primeng/panel';



@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    PanelModule
  ]
})
export class ClientModule { }
