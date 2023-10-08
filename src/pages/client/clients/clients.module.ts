import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
//primeng
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import {MatBadgeModule} from '@angular/material/badge';




@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    PanelModule,
    TableModule,
    MatBadgeModule
  ]
})
export class ClientsModule { }
