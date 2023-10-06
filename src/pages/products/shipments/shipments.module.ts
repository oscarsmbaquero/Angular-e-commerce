import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentsComponent } from './shipments.component';
import { ShipmentRoutingModule } from './shipments-routing.module';
//primeng
//primeng
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    ShipmentsComponent
  ],
  imports: [
    CommonModule,
    ShipmentRoutingModule,
    TableModule,
    TagModule,
    ButtonModule
  ]
})
export class ShipmentsModule { }
