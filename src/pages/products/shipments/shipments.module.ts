import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentsComponent } from './shipments.component';
import { ShipmentRoutingModule } from './shipments-routing.module';
import { FormsModule } from '@angular/forms';
//primeng
//primeng
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';




@NgModule({
  declarations: [
    ShipmentsComponent
  ],
  imports: [
    CommonModule,
    ShipmentRoutingModule,
    TableModule,
    TagModule,
    ButtonModule,
    TreeSelectModule,
    FormsModule,
    CheckboxModule
  ]
})
export class ShipmentsModule { }
