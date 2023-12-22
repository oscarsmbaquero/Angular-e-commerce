import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventaryComponent } from './inventary.component';
import { InventaryRoutingModule } from './inventary-routing.module';
//primeng
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
//pipe
import { DashIfNullPipe } from 'src/app/pipes/dash-if-null.pipe';




@NgModule({
  declarations: [
    InventaryComponent,
    DashIfNullPipe
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
