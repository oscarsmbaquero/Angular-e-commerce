import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './orders/order.component';
import { ClientRoutingModule } from './client-routing.module';
import { DatePipe } from '@angular/common';


//primeng
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import {MatBadgeModule} from '@angular/material/badge';
import { ClientProfileComponent } from './client-profile/client-profile.component';



@NgModule({
  declarations: [
    OrderComponent,
    OrdersTableComponent,
    ClientProfileComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    PanelModule,
    TableModule,
    MatBadgeModule
  ], providers:[
    DatePipe
  ]
})
export class ClientModule { }
