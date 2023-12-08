import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { VentasComponent } from './ventas.component';
import { GastosRoutingModule } from './gastos-routing.module';
//primeng
import { ChartModule } from 'primeng/chart';
import { AddGastosComponent } from './anadirGasto/anadirGastos.component';
import { GastosComponent } from './gastos.component';
import { TableModule } from 'primeng/table';
//material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { TabViewModule } from 'primeng/tabview';
import { VerGastosComponent } from './ver-gastos/ver-gastos.component';
import { GraficasGastosComponent } from './graficas-gastos/graficas-gastos.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AddGastosComponent,
    GastosComponent,
    VerGastosComponent,
    GraficasGastosComponent
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    ChartModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TabViewModule,
    TableModule,
    NgChartsModule
    
  ]
})
export class GastosModule { }
