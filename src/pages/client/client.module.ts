import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './orders/order.component';
import { ClientRoutingModule } from './client-routing.module';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
//material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//primeng
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';


import { ReactiveFormsModule } from '@angular/forms';


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
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MessagesModule




  ], providers:[
    DatePipe
  ]
})
export class ClientModule { }
