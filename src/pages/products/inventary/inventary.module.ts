import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventaryComponent } from './inventary.component';
import { InventaryRoutingModule } from './inventary-routing.module';
//primeng
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    InventaryComponent
  ],
  imports: [
    CommonModule,
    InventaryRoutingModule,
    TableModule,
    TagModule,
    ButtonModule
  ]
})
export class InventaryModule { }
